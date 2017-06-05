(function () {
  'use strict';

  angular
    .module('core')
    .service('AuthService', AuthService)
  ;


  function AuthService ($http) {

    var s = {
      login      : connect,
      logout     : disconnect,
      detail     : getprofiledata,
      follow     : follow,
      auth       : undefined,
      userloaded : false
    };

    // NOTE: this causes 500 error when user is not logged in.
    // TODO: fix this!
    getAuthUser();

    return s;


    /* ENDPOINTS
     */

    // sign-in
    function connect (d) { return $http.post('/api/users/auth/connect/', d); };

    // sign-out
    function disconnect () {
      return $http.get('/api/users/auth/disconnect/');
    };

    // get user profile data
    function getprofiledata (h) { return $http.get('/api/users/' + h + '/'); };

    // follow a specific user
    function follow (userid) { return $http.post('/api/users/' + userid + '/follow/'); };

    // get logged-in user data
    function getAuthUser () {
      return $http.get('/api/users/auth/user/').then(function (r) {
        s.auth = r.data; s.userloaded = true;
      });
    };

  };


})();