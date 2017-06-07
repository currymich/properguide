function AuthController($http, $state, $scope, $rootScope, AuthTokenFactory) {
  var self    = this;
  self.flash = ""
  var server  = 'https://properguide-api.herokuapp.com';

  function login() {
    $http.post(`${server}/users/login`, { user: {email:self.email, password:self.password} })
      .then(function(response) {

        if (response.data.status == 201) {
          self.flash = ""

          AuthTokenFactory.setToken(response.data.token)
          $scope.$emit('userLoggedIn', response.data.user)

          if (response.data.user.admin == true) {
            $state.go('orders');
          } else {
            $state.go('dentist', {dentist_id: response.data.user.dentist_id})
          }

        } else {

          self.email = ""
          self.password = ""
          self.flash = "Login Failed"

        }

      });
  }

  function signup(dentist) {
    $http.post(`${server}/dentists`, {dentist})
    .then(function(response) {
      if (response.data.status == 201) {
        self.flash = ""
        $state.go('orders');
      } else {
        self.flash = "Bad Params"
      }
    })
  }

  this.login = login;
  this.signup = signup;
}
