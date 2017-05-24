function ProductController($http) {
  var self    = this;
  var server  = 'https://properguide-api.herokuapp.com';

  function get_products() {
    $http.get(`${server}/products`)
      .then(function(response) {
        self.all_products = response.data.products;
      });
  }

  get_products();

  this.get_products = get_products;
}
