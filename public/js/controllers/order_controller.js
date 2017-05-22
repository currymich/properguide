function OrderController($http, $state, $scope) {
  var self    = this;
  // var server  = 'https://properguide-api.herokuapp.com';
  var server  = 'http://localhost:3000';


  function get_orders() {
    $http.get(`${server}/orders`)
      .then(function(response) {
        console.log(response.data.orders)
        self.all_orders = response.data.orders;
      });
  }

  get_orders();

  function get_order(order) {
    $http.get(`${server}/orders/${order.id}`)
      .then(function(response) {
        console.log(response.data.order)
        self.active_order = response.data.order;
      })
  }

  function new_order(order_params) {
    $http.post(`${server}/orders`)
      .then(function(response) {
        console.log(response)
      })
  }

  function delete_order(order) {
    $http.delete(`${server}/orders/${order.id}`)
      .then(function(response) {
        console.log(response.data)
      })
  }


  this.get_orders = get_orders;
  this.get_order = get_order;
  this.new_order = new_order;
  this.delete_order = delete_order;
}
