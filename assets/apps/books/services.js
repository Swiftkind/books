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
      reviews : reviews,
      favorite: favorite
    };

    return s;


    /* ENDPOINTS
     */

    // get user's list of books
    function list (d) { 
      console.log($httpParamSerializer(d), d);
      return $http.get('/api/books/?' + $httpParamSerializer(d)); };

    // search
    function search (q) { return $http.get('/api/books/search/?' + $httpParamSerializer({q:q})); };

    // get reviews list
    function reviews (b) { return $http.get('/api/books/' + b + '/reviews/'); };

    // favorite a book
    function favorite (bookid) { return $http.post('/api/books/' + bookid + '/favorite/'); };

  };

})();