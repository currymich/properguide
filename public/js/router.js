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
    .state('cart', {
      url: '/cart',
      templateUrl: 'partials/cart.html'
    })
    .state('products', {
      url: '/products',
      templateUrl: 'partials/products.html'
    })

    $locationProvider.html5Mode(true);
  }
