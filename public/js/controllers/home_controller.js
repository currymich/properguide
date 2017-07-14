function HomeController($scope, $http, $state, AuthTokenFactory) {
  var self = this;

  $scope.$on('userLoggedIn', function(event, data) {
    self.currentUser = data;
    $scope.currentUser = data;
    $scope.$broadcast('newLogin', self.currentUser)
  });

  function logout() {
    AuthTokenFactory.setToken()
    self.currentUser = null;
    console.log('logged out')
    $state.go('home')
  }

  AuthTokenFactory.setToken();

  this.logout = logout;
}
