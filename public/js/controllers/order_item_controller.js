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


  function checkout() {
    self.instance.requestPaymentMethod(function (err, payload) {
      $http.post(`${server}/braintree/checkout`, {nonce: payload.nonce, order_id: self.active_order})
      .then(function(response){
        if(response.data.status == 202){
          document.getElementById("cc_payment").innerHTML = "Payment Successful!";

          $http.post(`${server}/payments`,{payment:{order_id: self.active_order, amount: response.data.payment, description: payload.description}})
        }
      })
    })

  }

  this.checkout = checkout;
  this.get_order_items = get_order_items;
  this.get_order_details = get_order_details;
  this.add_order_item = add_order_item;
  this.update_quantity = update_quantity;
  this.get_statuses = get_statuses;
  this.update_order = update_order;
  this.delete_order_item = delete_order_item;
}
