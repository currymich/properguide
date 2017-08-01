function OrderController($http, $state, $scope, $window) {
  var self    = this;
  var store = $window.localStorage;
  var server  = 'https://properguide-api.herokuapp.com';

  if(!$scope.currentUser){
    window.location.href = 'https://www.properguideimplant.com/login'
  }

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

  $scope.display = '3';

  $scope.hideOrders = function(){
    return function(order){
      if($scope.display == 3){
        return order['order_status_id'] <= 3;
      } else if ($scope.display == 4) {
        return order['order_status_id'] == 4;
      } else {
        return order['order_status_id'] == 5;
      }
    }
  }

  function new_order(params) {
    $http.post(`${server}/orders`, {
      order: {
        order_status_id: 1,
        dentist_id: params.dentist.id,
        patient_name: params.patient_name,
        due_date: params.due_date,
        instructions: params.instructions
      }
    })
      .then(function(response) {
        $scope.all_orders = response.data.orders;

        $state.go('orders')
      })
  }

  function cancel_order(order) {
    var confirmation = confirm(`Are you sure you want to cancel the order for ${order.patient_name}?`);
    if (confirmation == true) {
      $http.patch(`${server}/orders/${order.id}`, {
        order: {
          order_status_id: 5,
        }
      })
      .then(function(response) {
        $scope.all_orders = response.data.orders;
      })
    }

  }

  this.get_order = get_order;
  this.get_orders = get_orders;
  this.new_order = new_order;
  this.cancel_order = cancel_order;
}
