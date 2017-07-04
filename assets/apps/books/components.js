(function() {
	'use strict';

	angular
		.module('core')
		.controller('BookCreateController', BookCreateController)
		.component('bookCreate',  {
			templateUrl: '/static/apps/templates/books/create.html',
			controller: 'BookCreateController',
			controllerAs: 'ctrl'
		})
	;

	//////////////////////////////
	function BookCreateController($scope, BookService) {
		var self = this;
		self.createBook = createBook;
		self.categories = BookService.categories;
		///////////////////////
		function createBook(form){
			BookService.create(form).then(function(data){
				$scope.form = {}; // reset form; 
			});
		}
	}

})();
