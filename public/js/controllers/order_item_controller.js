function OrderItemController($http, $state, $scope, $window, $filter) {
  var self = this;

  var store = $window.localStorage;

  self.active_order = store.getItem('active_order')

  self.editable = false;

  var server  = 'https://properguide-api.herokuapp.com';

  //on controller load, get the items for the order selected from the list of all orders (see orders partial)
  get_order_items();

  function get_order_items() {
    $http.get(`${server}/orders/${self.active_order}/order_items`)
    .then(function(response) {
      if (response.data.order.order_status_id <= 2 && response.data.admin) {
        self.editable = true;
      }
      self.items = response.data.order_items;
    })
    .then(function(){
      get_order_details();
    })
  }

  function get_order_details() {
    $http.get(`${server}/orders/${self.active_order}`)
    .then(function(response) {
      self.details = response.data.order;
      self.dentist = response.data.dentist;
      update_balance(response.data.payments)
    })
  }

  function add_order_item(params) {
    $http.post(`${server}/orders/${self.active_order}/order_items`, {
      order_item: {
        product_id: params.product.id,
        quantity: params.quantity
      }
    })
    .then(function(response) {
      self.items = response.data.order_items;
    })
    .then(function() {
      document.getElementById("new_item").reset();
    })
    .then(function(){
      get_order_details();
    })
    .then(function(){
      $state.go('order_items', {order_id: self.active_order})
    })
  }

  function update_quantity(order_item, quantity) {
    if(order_item.quantity + quantity > 0){
      $http.patch(`${server}/orders/${self.active_order}/order_items/${order_item.id}`, {order_item: {quantity: order_item.quantity + quantity}})
      .then(function(response) {
        self.items = response.data.order_items;
      })
      .then(function(){
        get_order_details();
      })
      .then(function(){
        $state.go('order_items', {order_id: self.active_order})
      })
    }
  }

  function delete_order_item(order_item) {
    $http.delete(`${server}/orders/${self.active_order}/order_items/${order_item.id}`)
    .then(function(response) {
      self.items = response.data.order_items;
    })
    .then(function(){
      get_order_details();
    })
    .then(function(){
      $state.go('order_items', {order_id: self.active_order})
    })
  }

  function get_statuses() {
    $http.get(`${server}/orders/statuses`)
    .then(function(response) {
      self.all_statuses = response.data.statuses;
    })
  }

  get_statuses()

  function update_order(id){
    //if new due date isnt chosen, used old one
    self.new_due_date = self.new_due_date ? self.new_due_date : new Date(self.details.due_date)

    self.new_status = self.new_status ? self.new_status.id : self.details.order_status_id
    $http.patch(`${server}/orders/${id}`, {
      order: {
        due_date: self.new_due_date,
        order_status_id: self.new_status
      }
    })
    .then(function(response){
      self.details = response.data.order;

      $state.go('order_items', {order_id: id})
    })
  }

  $http.post(`${server}/braintree/client_token`, {order_id: self.active_order})
  .then(function(response) {
    self.token = response.data.token
  })
  .then(function(){
    braintree.dropin.create({
      authorization: self.token,
      container: '#dropin-container'
      }, function (createErr, instance) {
          self.instance = instance
        });
  });

  function update_balance(payments) {
    self.pay_received = payments.reduce(function(sum, payment){
      return sum + payment.value;
    }, 0)
    self.amount_due = self.details.total - self.pay_received;
  }


  function checkout() {
    //generate nonce with payment info and selected card
    self.instance.requestPaymentMethod(function (err, payload) {
      //double check user wants to use the selected card (once button clicked, card is charged)
      var confirmation = confirm(`Confirm: Pay full balance for this order using card ${payload.description}`);
      if (confirmation == true) {
        //use nonce to charge card for given amount (full price of order)
        $http.post(`${server}/braintree/checkout`, {nonce: payload.nonce, order_id: self.active_order})
        .then(function(response){
          if(response.data.status == 202){
            //If charge successful, save payment info to server (payment amount and description of card used - last two digits, generated with nonce payload)
            $http.post(`${server}/payments`,{
              payment: {
                amount: response.data.payment,
                description: payload.description
              },
              order_id: self.active_order
            })
            .then(function(response){
              update_balance(response.data.payments)
              if(response.data.status == 201){
                document.getElementById("cc_payment").innerHTML = `<p>Payment of $${response.data.payment.amount} successful on card ${response.data.payment.description}</p>`;
              } else {
                document.getElementById("cc_payment").innerHTML = `<p>Payment succeeded but failed to save, account balance may not reflect true amount due</p>`;
              }
            })
          }
        })
      }
    })
  }



  this.update_balance = update_balance;
  this.checkout = checkout;
  this.get_order_items = get_order_items;
  this.get_order_details = get_order_details;
  this.add_order_item = add_order_item;
  this.update_quantity = update_quantity;
  this.get_statuses = get_statuses;
  this.update_order = update_order;
  this.delete_order_item = delete_order_item;
}
