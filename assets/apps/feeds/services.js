(function () {
  'use strict';

  angular
    .module('core')
    .service('FeedService', FeedService)
  ;

  function FeedService ($http) {

    var s = {
      feed : feed
    }

    return s;

    /* ENDPOINTS
     */

    // feed
    function feed () { return $http.get('/api/feeds/'); };

  };

})();