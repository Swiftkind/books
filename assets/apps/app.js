(function () {
  'use strict';

  angular
    .module('core', [
      'ui.router',
      'ui.bootstrap',
      'ngFileUpload',
      'angular-owl-carousel-2',
      'ui-notification'
    ])
    .constant('TEMPLATE_URL', '/static/apps/templates/')
    .config(csrf)
    .config(notification)
  ;

  /* CSRF TOKEN
   */
  function csrf($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  };

  /* angular-ui-notification configuration
  */
  function notification(NotificationProvider) {
    NotificationProvider.setOptions({
        delay: 1000,
        startTop: 10,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'center',
        positionY: 'top'
    });
  };

})();