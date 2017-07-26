(function () {
  'use strict';

  angular
    .module('core')
    .service('BookService', BookService)
  ;


  function BookService ($http, $httpParamSerializer, Upload) {

    var s = {
      list    : list,
      search  : search,
      reviews : reviews,
      favorite: favorite,
      related : related,
      create  : create,
      categories: {},
      featuredBooks: featuredBooks,
    };

    get_categories();
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

    // get related categories 
    function related () { return $http.get('/api/books/related/'); };

    // create book 
    function create(form) {
      return Upload.upload({
        url: '/api/books/',
        data: form, 
      });
    }


    // get list of book categories 
    function get_categories() {
      return $http.get('/api/books/categories/').then(function(response){
        angular.forEach(response.data, function(category){
          s.categories[category.id] = category;
        });
      });
    }

    function featuredBooks() {
      // TODO: Actually return a list of featured books
      /**
       * featuredBooks
       * @description - sends a GET request to the API to retrieve featured books
       * @return Array - a list of book data (could either be empty/filled)
       */
      return $http.get('/api/books/');
    }

  };

})();