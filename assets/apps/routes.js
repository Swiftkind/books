(function () {
  'use strict';

  angular
    .module('core')
    .config(routes)

  /* UN AUTHENTICATED ROUTES
   */
  function routes ($urlMatcherFactoryProvider, $stateProvider,
    $locationProvider, $urlRouterProvider, TEMPLATE_URL) {

    $urlRouterProvider.otherwise('/');
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(true);

    $stateProvider
      .state('legacy', {
        abstract : true,
        url      : '',
        template : '<ui-view></ui-view>'
      })
      .state('index', {
        url          : '/',
        templateUrl  : TEMPLATE_URL + 'index.html',
        controller   : 'IndexController',
        controllerAs : 'ctrl'

      })
      .state('login', {
        url          : '/login/',
        templateUrl  : TEMPLATE_URL + 'users/login.html',
        controller   : 'LoginController',
        controllerAs : 'ctrl'
      })
    ;

  };

})();