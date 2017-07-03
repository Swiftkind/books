(function() {
	'use strict';

	angular
		.module('core')
		.controller('BookCreateController', BookCreateController)
		.component('bookCreate',  {
			templateUrl: '/static/apps/templates/books/create.html',
			controller: 'BookCreateController'
		})
	;

	//////////////////////////////
	function BookCreateController($scope) {
		console.log('::BookCreateController');
	}

})();
