function OrderController($http, $state, $scope, $rootScope, AuthTokenFactory) {
  var self    = this;
  // var server  = 'https://properguide-api.herokuapp.com';
  var server = 'http://localhost:3000'

  function index() {
    $http.get(`${server}/users/login`, { user: userPass })
      .then(function(response) {
        AuthTokenFactory.setToken(response.data.token)

        console.log(response)

        $scope.$emit('userLoggedIn', response.data.user);
        $state.go('home');
      });
  }

  this.login = login;
}
