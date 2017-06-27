(function () {
  'use strict';

  angular
    .module('core')
    .service('AuthService', AuthService)
    .service('MessageService', MessageService)
  ;


  function AuthService ($http, Upload) {

    var s = {
      login      : connect,
      logout     : disconnect,
      detail     : getprofiledata,
      follow     : follow,
      auth       : undefined,
      userloaded : false,
      reloadUser : getAuthUser,
      update     : update,
      updatePhoto: updatePhoto,
      resetPassword: resetPassword
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

    // update user profile
    function update (form) { return $http.put('/api/users/auth/user/', form)};

    // update user photo
    function updatePhoto (data) {
      return Upload.upload({
          url:'/api/users/auth/user/photo',
          data: data,
          method: 'PUT'
      });
    };

    // reset user password
    function resetPassword (form) { return $http.put('/api/users/auth/user/reset/', form)};

  };


  function MessageService($http) {
    var s = {
      sendMessage: sendMessage,
    };

    return s;

    // sendMessage
    // @description - sends a POST request to the chat API containing message data
    // @return - returns a promise
    function sendMessage(data) {
      return $http.post('/api/chats/', data);
    };
  };


})();