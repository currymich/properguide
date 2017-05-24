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

  function add_order_item(order, order_item_params) {
    $http.post(`${server}/orders/${order.id}/order_items`, {order_item_params})
      .then(function(response) {
        self.all_items = response.data.order_items;

        $state.go('order', {order_id: order.id})
      })
  }

  function update_order_item(order, order_item, order_item_params) {
    $http.patch(`${server}/orders/${order.id}/ordeorder_items/${order_item.id}`)
      .then(function(response) {
        self.all_items = response.data.order_items;

        $state.go('order', {order_id: order.id})
      })
  }

  function delete_order_item(order_item) {
    $http.delete(`${server}/orders/${order.id}`)
      .then(function(response) {
        self.all_items = response.data.order_items;

        $state.go('order', {order_id: order.id})
      })
  }


  this.get_order_items = get_order_items;
  this.add_order_item = add_order_item;
  this.update_order_item = update_order_item;
  this.delete_order_item = delete_order_item;
}
