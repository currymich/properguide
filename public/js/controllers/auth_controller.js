function AuthController($http, $state, $scope, $rootScope, AuthTokenFactory) {
  var self    = this;
  var server  = 'https://properguide-api.herokuapp.com';

  // function signup(userPass) {
  //   $http.post(`${server}/users/signup`, { user: userPass })
  //     .then(function(response) {
  //       AuthTokenFactory.setToken(response.data.token)
  //
  //       console.log(repsonse)
  //
  //       $scope.$emit('userLoggedIn', response.data.user);
  //       $state.go('home');
  //     });
  // }

  function login(userPass) {
    $http.post(`${server}/users/login`, { user: userPass })
      .then(function(response) {
        AuthTokenFactory.setToken(response.data.token)

        console.log(response)

        $scope.$emit('userLoggedIn', response.data.user);
        $state.go('home');
      });
  }

  // function updateUser(userPass) {
  //   $http.put(`${server}/users/edit`, { user: userPass })
  //     .then(function(response) {
  //       AuthTokenFactory.setToken(response.data.token)
  //
  //       $scope.$emit('userUpdated', response.data.user);
  //       $state.go('user-show');
  //     });
  // }

  // this.updateUser = updateUser;
  // this.signup = signup;
  this.login = login;
}
