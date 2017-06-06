function AuthController($http, $state, $scope, $rootScope, AuthTokenFactory) {
  var self    = this;
  var server  = 'https://properguide-api.herokuapp.com';

  function login(userPass) {
    $http.post(`${server}/users/login`, { user: userPass })
      .then(function(response) {
        AuthTokenFactory.setToken(response.data.token)

        $scope.$emit('userLoggedIn', response.data.user);

        if (response.data.user.admin == true) {
          $state.go('orders');
        } else {
          $state.go('dentist', {dentist_id: response.data.user.dentist_id})
        }

      });
  }

  this.login = login;
}
