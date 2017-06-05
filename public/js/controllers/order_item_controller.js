function OrderItemController($http, $state, $scope, $window) {
  var self    = this;
  var store = $window.localStorage;
  self.active_order = store.getItem('order_id')
  var server  = 'https://properguide-api.herokuapp.com';

  function get_order_items() {
    $http.get(`${server}/orders/${self.active_order}/order_items`)
      .then(function(response) {
        self.all_items = response.data.order_items;
      });
  }

  get_order_items();

  function add_order_item(params) {
    $http.post(`${server}/orders/${self.active_order}/order_items`, {
      order_item: {
        product_id: params.product.id,
        quantity: params.quantity
      }
    })
      .then(function(response) {
        self.all_items = response.data.order_items;

        $state.go('order_items', {order_id: self.active_order})
      })
  }

  function update_quantity(order_item, quantity) {
    if(order_item.quantity + quantity > 0){
      $http.patch(`${server}/orders/${self.active_order}/order_items/${order_item.id}`, {order_item: {quantity: order_item.quantity + quantity}})
        .then(function(response) {
          self.all_items = response.data.order_items;

          $state.go('order_items', {order_id: self.active_order})
        })
      }
  }

  function delete_order_item(order_item) {
    $http.delete(`${server}/orders/${self.active_order}/order_items/${order_item.id}`)
      .then(function(response) {
        self.all_items = response.data.order_items;

        $state.go('order_items', {order_id: self.active_order})
      })
  }


  this.get_order_items = get_order_items;
  this.add_order_item = add_order_item;
  this.update_quantity = update_quantity;
  this.delete_order_item = delete_order_item;
}
