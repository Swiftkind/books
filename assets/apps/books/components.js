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
	function BookCreateController($scope, $timeout, BookService, Upload) {
		var self = this;
		self.createBook = createBook;
		self.categories = BookService.categories;
		$scope.form = {};

		///////////////////////
		$scope.$watchCollection('ctrl.categories', function(data){
			if(data != undefined) {
				$scope.form.category = _.first(_.values(data), 1)[0];
			}
		});

		$scope.$watch('file', function () {
		    if ($scope.file != null) {
		    	$scope.file = $scope.file;
		    }
		});

		function createBook(form){
			form.cover = $scope.file;
			if(_.isObject(form.category)){form.category = form.category.id;}
			BookService.create(form).then(function(data){
				$scope.form = {}; // reset form; 
			});
		}
	}
})();