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
      url: '/login',
      templateUrl: 'partials/auth/login.html'
    })
    .state('orders', {
      url: '/orders',
      templateUrl: 'partials/orders/index.html'
    })
    .state('order_items', {
      url: '/orders/:order_id',
      templateUrl: 'partials/orders/order_items.html'
    })
    .state('new_order', {
      url: '/orders/new',
      templateUrl: 'partials/orders/new.html'
    })
    .state('dentist', {
      url: '/dentist/:dentist_id',
      templateUrl: 'partials/dentist/show.html'
    })
    .state('new_dentist', {
      url: '/dentist/new',
      templateUrl: 'partials/dentist/new.html'
    })

    $locationProvider.html5Mode(true);
  }
