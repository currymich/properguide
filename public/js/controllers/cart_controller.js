function CartController($http) {
  var self    = this;
  // var server  = 'https://properguide-api.herokuapp.com';
  var server  = 'https://localhost:3000';


  function get_cart() {
    $http.get(`${server}/cart`)
      .then(function(response) {
        console.log(repsonse)
      });
  }

  get_cart();

  this.get_cart = get_cart;
}
