function CartController($http) {
  var self    = this;
  // var server  = 'https://properguide-api.herokuapp.com';
  var server  = 'http://localhost:3000';


  function get_cart() {
    $http.get(`${server}/cart`)
      .then(function(response) {
        console.log(response.data.order_items)
        self.cart_items = response.data.order_items;
      });
  }

  get_cart();

  this.get_cart = get_cart;
}
