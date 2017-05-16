function HomeController($scope, $http, $state, AuthTokenFactory) {
  var self = this;

  $scope.$on('userLoggedIn', function(event, data) {
    self.currentUser = data;
    $scope.$broadcast('newLogin', self.currentUser)
    console.log(data.name, 'logged in')
  });

  function logout() {
    AuthTokenFactory.setToken()
    self.currentUser = null;
    console.log('logged out')
    $state.go('home')
  }

  self.x = "../img/case1.jpg"

  this.logout = logout;
}
