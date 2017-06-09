function OrderController($http, $state, $scope, $window) {
  var self    = this;
  var store = $window.localStorage;
  var server  = 'https://properguide-api.herokuapp.com';

  //Used by "view order" button on order index page - loads the id into local storage for use by order_item controler, then loads that controller by sending to a page with that controller attached
  function get_order(order) {
    store.setItem('active_order', order.id)
    $state.go('order_items', {order_id: order.id})
  }

  function get_orders() {
    $http.get(`${server}/orders`)
    .then(function(response) {
      $scope.all_orders = response.data.orders;
      self.active_dentist_id = response.data.dentist_id;
      if (response.data.admin) {
        $state.go('orders')
      } else {
        $state.go('dentist', {dentist_id: self.active_dentist_id})
      }
    })
  }

  get_orders();

  function get_statuses() {
    $http.get(`${server}/orders/statuses`)
    .then(function(response) {
      self.all_statuses = response.data.statuses;
    })
  }

  get_statuses()

  function new_order(params) {
    $http.post(`${server}/orders`, {
      order: {
        order_status_id: 1,
        dentist_id: params.dentist.id,
        patient_name: params.patient_name
      }
    })
      .then(function(response) {
        $scope.all_orders = response.data.orders;

        $state.go('orders')
      })
  }

  function delete_order(order) {
    $http.delete(`${server}/orders/${order.id}`)
      .then(function(response) {
        $scope.all_orders = response.data.orders;

        $state.go('orders')
      })
  }

  function update_status(order_id, order_status_id) {
    $http.patch(`${server}/orders/${order_id}`, {order:{order_status_id}})
    .then(function(response) {
      $scope.all_orders = response.data.orders;

      $state.go('orders')
    })
  }

  $scope.$watch('all_orders', function(newValue, oldValue, scope) {
    var newStatus = [], oldStatus = []
    if(newValue && oldValue){
      newValue.forEach(function(order,index){
        newStatus[index] = order.order_status
      })
      oldValue.forEach(function(order,index){
        if(newStatus[index].name != order.order_status.name) {
          update_status(order.id, newStatus[index].id)
        }
      })
    }
  }, true)

  this.get_statuses = get_statuses;
  this.update_status = update_status;
  this.get_order = get_order;
  this.get_orders = get_orders;
  this.new_order = new_order;
  this.delete_order = delete_order;
}
