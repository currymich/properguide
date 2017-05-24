function OrderController($http, $state, $scope, $window) {
  var self    = this;
  var store = $window.localStorage;
  // var server  = 'https://properguide-api.herokuapp.com';
  var server  = 'http://localhost:3000';


  function get_order(order) {
    store.setItem('order_id', order.id)
    $state.go('order_items', {order_id: order.id})
  }

  function get_orders() {
    $http.get(`${server}/orders`)
      .then(function(response) {
        self.all_orders = response.data.orders;

        $state.go('orders')
      });
  }

  get_orders();

  function new_order(order_params) {
    $http.post(`${server}/orders`)
      .then(function(response) {
        self.all_orders = response.data.orders;

        $state.go('orders')
      })
  }

  function delete_order(order) {
    $http.delete(`${server}/orders/${order.id}`)
      .then(function(response) {
        self.all_orders = response.data.orders;

        $state.go('orders')
      })
  }


  this.get_order = get_order;
  this.get_orders = get_orders;
  this.new_order = new_order;
  this.delete_order = delete_order;
}
