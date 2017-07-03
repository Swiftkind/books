(function () {
  'use strict';

  angular
    .module('core')
    .service('FeedService', FeedService)
  ;

  function FeedService ($http) {

    var s = {
      feed : feed,
      comment: comment,
      addComment: addComment,
      updateComment: updateComment,
      deleteComment: deleteComment,
    }

    return s;

    /* ENDPOINTS
     */

    // feed
    function feed () { return $http.get('/api/feeds/'); };

    // comment
    function comment() { 
        return $http.get('/api/feeds/comments/'); 
    };

    function addComment(feedId, form) { 
        return $http.post('/api/feeds/' + feedId + '/comments/', form); 
    };

    function updateComment(feedId, commentId, form) {
        return $http.put('/api/feeds/' + feedId + '/comments/' + commentId + '/', form);
    }

    function deleteComment(feedId, commentId) {
        return $http.delete('/api/feeds/' + feedId + '/comments/' + commentId + '/');
    }



  };

})();