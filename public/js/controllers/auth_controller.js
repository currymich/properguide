function AuthController($http, $state, $scope, $rootScope, AuthTokenFactory) {
  var self    = this;
  var server  = 'https://properguide-api.herokuapp.com';

  function login(userPass) {
    $http.post(`${server}/users/login`, { user: userPass })
      .then(function(response) {
        AuthTokenFactory.setToken(response.data.token)

        console.log(response)

        $scope.$emit('userLoggedIn', response.data.user);
        $state.go('orders');
      });
  }

  this.login = login;
}
