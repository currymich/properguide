angular.module('properGuide')
  .controller('AuthController', AuthController)
  .controller('HomeController', HomeController)
  .controller('QuestionController', QuestionController)
  .controller('OrderController', OrderController)
  .controller('OrderItemController', OrderItemController)
  .controller('ProductController', ProductController)
  .controller('DentistController', DentistController)
  .factory('AuthTokenFactory', AuthTokenFactory)
  .factory('AuthInterceptor', AuthInterceptor)
  .filter('DueDate', DueDate)
