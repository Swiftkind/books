(function () {
  'use strict';

  angular
    .module('core')
    .service('BookService', BookService)
  ;


  function BookService ($http, $httpParamSerializer) {

    var s = {
      list    : list,
      search  : search,
      reviews : reviews
    };

    return s;


    /* ENDPOINTS
     */

    // get user's list of books
    function list (d) { return $http.get('/api/books/?' + $httpParamSerializer(d)); };

    // search
    function search (q) { return $http.get('/api/books/search/?' + $httpParamSerializer({q:q})); };

    // get reviews list
    function reviews (b) { return $http.get('/api/books/' + b + '/reviews/'); };

  };

})();