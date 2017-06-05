(function () {
  'use strict';

  angular
    .module('core')
    .config(routes)
  ;

  /* AUTHENTICATED ROUTES
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
      .state('logout', {
        url          : '/logout/',
        controller   : function ($scope, AuthService) {
          AuthService.logout()
            .then(function (r) { window.location.href="/login/"; });
        }
      })
      .state('dashboard', {
        url          : '/',
        templateUrl  : TEMPLATE_URL + 'users/dashboard.html',
        controller   : 'DashboardController',
        controllerAs : 'ctrl'
      })
      .state('profile', {
        url          : '/:handle/',
        templateUrl  : TEMPLATE_URL + 'users/profile.html',
        controller   : 'ProfileController',
        controllerAs : 'ctrl'
      })
    ;

  };

})();