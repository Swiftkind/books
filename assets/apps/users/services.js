(function () {
  'use strict';

  angular
    .module('core')
    .constant('API_URL', '/api/users/')
    .service('AuthService', AuthService)
  ;


  function AuthService ($http, API_URL) {

    var s = {
      login      : connect,
      detail     : getprofiledata,
      auth       : undefined,
      userloaded : false
    };

    getAuthUser();

    return s;


    /* ENDPOINTS
     */

    // sign-in
    function connect (d) { return $http.post(API_URL + 'auth/connect/', d); };

    // get user profile data
    function getprofiledata (h) { return $http.get(API_URL + h + '/'); };

    // get logged-in user data
    function getAuthUser () {
      return $http.get(API_URL + 'auth/user/').then(function (r) {
        s.auth = r.data; s.userloaded = true;
      });
    };

  };


})();