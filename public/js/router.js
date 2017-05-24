angular.module('properGuide', ['ui.router'])
  .config(AppRouter)
  .config(authInterceptor)

  function authInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor')
  }

  function AppRouter($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html'
    })
    .state('training', {
      url: '/training',
      templateUrl: 'partials/training.html'
    })
    .state('lab', {
      url: '/lab',
      templateUrl: 'partials/lab.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'partials/contact.html'
    })
    .state('login', {
      url: '/auth/login',
      templateUrl: 'partials/auth/login.html'
    })
    .state('orders', {
      url: '/orders',
      templateUrl: 'partials/orders/orders.html'
    })
    .state('order_items', {
      url: '/orders/:order_id',
      templateUrl: 'partials/orders/order_items.html'
    })

    $locationProvider.html5Mode(true);
  }
