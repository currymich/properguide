function OrderController($http, $state, $scope, $window) {
  var self    = this;
  var store = $window.localStorage;
  var server  = 'https://properguide-api.herokuapp.com';

  function get_order(order) {
    store.setItem('active_order', order.id)
    $state.go('order_items', {order_id: order.id})
  }

  function get_orders() {
    $http.get(`${server}/orders`)
    .then(function(response) {
      self.all_orders = response.data.orders;
      self.active_dentist_id = response.data.dentist_id;
      if (response.data.admin) {
        $state.go('orders')
      } else {
        $state.go('dentist', {dentist_id: self.active_dentist_id})
      }
    })
  }

  get_orders()

  function new_order(params) {
    $http.post(`${server}/orders`, {
      order: {
        order_status_id: 1,
        dentist_id: params.dentist.id,
        patient_name: params.patient_name
      }
    })
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
