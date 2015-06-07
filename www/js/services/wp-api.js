angular.module('ionPress').factory('wpApiResource', function ($q, $resource, wpApi) {
	var service = {
		Categories: $resource(wpApi.baseUrl + wpApi.namespace + wpApi.category.endpoint + '/:id')
	};

	/**
	 * Get all Categories
	 *
	 * @returns {*}
	 */
	service.getCategories = function () {
		var deferred = $q.defer();
		service.Categories.query(function (result) {
			console.log(result);
			deferred.resolve(result);
		});

		return deferred.promise;
	};


	/**
	 * Get a Category
	 * @param {Number} category id
	 *
	 * @returns {object} category
	 */
	service.getCategories = function () {
		var deferred = $q.defer();
		service.Categories.query(function (result) {
			console.log(result);
			deferred.resolve(result);
		});

		return deferred.promise;
	};

 	return service;
 });