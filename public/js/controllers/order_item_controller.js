function OrderItemController($http, $state, $scope, $window) {
  var self    = this;
  var store = $window.localStorage;
  self.active_order = store.getItem('active_order')
  self.editable = false;
  var server  = 'https://properguide-api.herokuapp.com';

  //on controller load, get the items for the order selected from the list of all orders (see orders partial)
  get_order_items();

  function get_order_items() {
    $http.get(`${server}/orders/${self.active_order}/order_items`)
    .then(function(response) {
      if (response.data.order.order_status_id === 1 && response.data.admin) {
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


  this.get_order_items = get_order_items;
  this.get_order_details = get_order_details;
  this.add_order_item = add_order_item;
  this.update_quantity = update_quantity;
  this.delete_order_item = delete_order_item;
}
