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
    .state('newsletter', {
      url: '/newsletter',
      templateUrl: 'partials/newsletter/2018/newsletter_jan.html'
    })
    .state('newsletter_month', {
      url: '/newsletter/{year}/{month}',
      templateUrl: function(stateParams){
        return `partials/newsletter/${stateParams.year}/newsletter_${stateParams.month}.html`;
       }
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
    .state('dentist', {
      url: '/dentist/:dentist_id',
      templateUrl: 'partials/dentist/show.html'
    })
    .state('terms', {
      url: '/terms',
      templateUrl: 'partials/legal/terms.html'
    })
    .state('privacy', {
      url: '/privacy',
      templateUrl: 'partials/legal/privacy.html'
    })
    .state('refund', {
      url: '/refund',
      templateUrl: 'partials/legal/refund.html'
    })

    $locationProvider.html5Mode(true);
  }
