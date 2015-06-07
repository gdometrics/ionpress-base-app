angular.module('ionPress').factory('wpApiResource', function ($q, $resource, wpApi) {
	var service = {
		Categories: $resource(wpApi.baseUrl + wpApi.category.endpoint),
		Category: $resource(wpApi.baseUrl + wpApi.category.endpoint + '/:id'),
		CategoryPosts: $resource(wpApi.baseUrl + wpApi.post.endpoint + '?filter[cat]=:id'),
		Posts: $resource(wpApi.baseUrl + wpApi.post.endpoint),
		Post: $resource(wpApi.baseUrl + wpApi.post.endpoint + '/:id'),
		Tags:  $resource(wpApi.baseUrl + wpApi.tag.endpoint),
		Tag: $resource(wpApi.baseUrl + wpApi.tag.endpoint + '/:id'),
		TagPosts: $resource(wpApi.baseUrl + wpApi.post.endpoint + '?filter[tag]=:id')
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
	 * Get all Posts
	 *
	 * @returns {*}
	 */
	service.getPosts = function () {
		var deferred = $q.defer();
		service.Posts.query(function (result) {
			deferred.resolve(result);
		});

		return deferred.promise;
	};

	/**
	 * Get a Post
	 * @param {Number} post id
	 *
	 * @returns {object} post
	 */
	service.getPost = function (id) {
		var deferred = $q.defer();
		service.Post.get({
			id:id
		}, function (result) {
			deferred.resolve(result);
		});

		return deferred.promise;
	};


	/**
	 * Get a Category's Posts
	 * @param {Number} category id
	 *
	 * @returns {*}
	 */
	service.getPostsByCategoryId = function (id) {
		var deferred = $q.defer();
		service.CategoryPosts.query({
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
	 * Get a Tag
	 * @param {Number} tag id
	 *
	 * @returns {object} Tag
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

	/**
	 * Get a Tag's Posts
	 * @param {Number} tag id
	 *
	 * @returns {*}
	 */
	service.getPostsByTagId = function (id) {
		var deferred = $q.defer();
		service.TagPosts.query({
			id:id
		}, function (result) {
			deferred.resolve(result);
		});

		return deferred.promise;
	};


	return service;
 });