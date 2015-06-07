angular.module('ionPress').factory('wpApiResource', function ($q, $resource, wpApi) {
	var service = {
		Categories: $resource(wpApi.baseUrl + wpApi.namespace + wpApi.category.endpoint),
		Category: $resource(wpApi.baseUrl + wpApi.namespace + wpApi.category.endpoint + '/:id'),
		Posts: $resource(wpApi.baseUrl + wpApi.namespace + wpApi.post.endpoint),
		Post: $resource(wpApi.baseUrl + wpApi.namespace + wpApi.post.endpoint + '/:id'),
		Tags:  $resource(wpApi.baseUrl + wpApi.namespace + wpApi.tag.endpoint),
		Tag: $resource(wpApi.baseUrl + wpApi.namespace + wpApi.tag.endpoint + '/:id')
	};

	/**
	 * Get all Categories
	 *
	 * @returns {*}
	 */
	service.getCategories = function () {
		var deferred = $q.defer();
		service.Categories.query(function (result) {
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
	service.getCategory = function (id) {
		var deferred = $q.defer();
		service.Category.get({
			id:id
		}, function (result) {
			deferred.resolve(result);
		});

		return deferred.promise;
	};

	/**
	 * Get all tags
	 *
	 * @returns {*}
	 */
	service.getTags = function () {
		var deferred = $q.defer();
		service.Tags.query(function (result) {
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
	service.getTag = function (id) {
		var deferred = $q.defer();
		service.Tag.get({
			id:id
		}, function (result) {
			deferred.resolve(result);
		});

		return deferred.promise;
	};


	return service;
 });