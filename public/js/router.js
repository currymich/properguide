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
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'partials/contact.html'
    })
    .state('login', {
      url: '/auth/login',
      templateUrl: 'partials/auth/login.html'
    })
    .state('signup', {
      url: '/auth/signup',
      templateUrl: 'partials/auth/signup.html'
    })
    .state('orders', {
      url: 'users/:userId/orders',
      templateUrl: 'partials/orders/index.html'
    })

    $locationProvider.html5Mode(true);
  }
