angular.module('properGuide')
  .controller('AuthController', AuthController)
  .controller('HomeController', HomeController)
  .controller('QuestionController', QuestionController)
  .factory('AuthTokenFactory', AuthTokenFactory)
  .factory('AuthInterceptor', AuthInterceptor)
