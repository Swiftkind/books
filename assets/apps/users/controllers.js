(function () {
  'use strict';

  angular
    .module('core')
    .controller('IndexController', IndexController)
    .controller('LoginController', LoginController)
    .controller('DashboardController', DashboardController)
    .controller('ProfileController', ProfileController)
  ;

  /* INDEX PAGE CONTROLLER
   */
  function IndexController ($scope) {
    var self = this;
  };

  function LoginController ($scope, AuthService) {
    var self = this;

    /* LOGIN FORM
     */
    self.signin = function (data) {
      AuthService.login(data).then(
        function (resp) {
          // successfully logged in
          window.location.reload();
        },
        function (resp) {
          // error
          console.log(resp);
        }
      );
    };

  }; // END OF LOGIN CONTROLLER

  function DashboardController ($scope, AuthService) {
    var self = this;

    self.AuthService = AuthService;

  }; // END OF DASHBOARD CONTROLLER

  function ProfileController ($scope, $stateParams, AuthService) {
    var self = this;

    self.user = undefined;

    AuthService.detail($stateParams.handle).then(
      function (resp) {
        // successfully retrieved the data
        self.user = resp.data;
      },
      function (resp) {
        console.log(resp);
        // error.
        // TODO: redirect to 404 page
      }
    );


  };

})();