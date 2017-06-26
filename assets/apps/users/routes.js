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
      .state('feed', {
        url          : '/feed/',
        templateUrl  : TEMPLATE_URL + 'users/feed.html',
        controller   : 'FeedController',
        controllerAs : 'ctrl'
      })
      .state('search', {
        url          : '/search/',
        templateUrl  : TEMPLATE_URL + 'users/search.html',
        controller   : 'SearchController',
        controllerAs : 'ctrl'
      })
      .state('profile', {
        url          : '/:handle/',
        templateUrl  : TEMPLATE_URL + 'users/profile/profile.html',
        controller   : 'ProfileController',
        controllerAs : 'ctrl'
      })
      .state('profile-edit', {
        url          : '/:handle/edit/',
        templateUrl  : TEMPLATE_URL + 'users/profile/edit.html',
        controller   : 'ProfileEditController',
        controllerAs : 'ctrl'
      })
      .state('favorites', {
        url          : '/:handle/favorites/',
        templateUrl  : TEMPLATE_URL + 'users/favorites.html',
        controller   : 'FavoritesController',
        controllerAs : 'ctrl'
      })
      .state('chat', {
        url          : '/chat/',
        templateUrl  : TEMPLATE_URL + 'chats/message.html',
        controller   : 'ChatsController',
        controllerAs : 'ctrl'
      })
    ;

  };

})();