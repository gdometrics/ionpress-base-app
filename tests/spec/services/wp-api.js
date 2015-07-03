'use strict';

describe('Service: wpApiResource', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var wpApiResource, $httpBackend, wpApi;
	beforeEach(inject(function (_$httpBackend_, _wpApiResource_, _wpApi_) {
		wpApiResource = _wpApiResource_;
        $httpBackend = _$httpBackend_;
        wpApi = _wpApi_;

        /**
         * Application Route makes requests to categories and posts before loading views
         * Even during our unit testing - set the expectations here so they don't affect our actual tests
         */
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.category.endpoint).respond(200, JSON.stringify([{
            id : 'abcde',
            name : 'test'
        }]));

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint).respond(200, JSON.stringify([{
            id : 'abcde',
            name : 'test'
        }]));

        $httpBackend.expect('GET', wpApi.baseUrl + wpApi.category.endpoint);
        $httpBackend.expect('GET', wpApi.baseUrl + wpApi.post.endpoint);
	}));

    afterEach(inject(function($httpBackend){
        //These two calls will make sure that at the end of the test, all expected http calls were made
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('should return a promise', function () {
        expect(wpApiResource.getCategories().then).toBeDefined();

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.category.endpoint + '/1').respond(200, JSON.stringify({
            id : '1',
            name : 'test'
        }));
        expect(wpApiResource.getCategory(1).then).toBeDefined();

        expect(wpApiResource.getPosts().then).toBeDefined();

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '/1').respond(200, JSON.stringify({
            id : '1',
            name : 'test'
        }));

        expect(wpApiResource.getPost(1).then).toBeDefined();

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '?filter[cat]=1').respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));

        expect(wpApiResource.getPostsByCategoryId(1).then).toBeDefined();

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.tag.endpoint).respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));
        expect(wpApiResource.getTags().then).toBeDefined();

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.tag.endpoint + '/1').respond(200, JSON.stringify({
            id : '1',
            name : 'test'
        }));

        expect(wpApiResource.getTag(1).then).toBeDefined();

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '?filter[tag]=1').respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));

        expect(wpApiResource.getPostsByTagId(1).then).toBeDefined();
    });

    it('should provide an array of categories', inject(function ($rootScope) {
        wpApiResource.getCategories().then(function (value) {
            expect(Array.isArray(value)).toBe(true);
        });

        $rootScope.$digest();
    }));

    it('should provide an array of posts', inject(function ($rootScope) {
        wpApiResource.getPosts().then(function (value) {
            expect(Array.isArray(value)).toBe(true);
        });

        $rootScope.$digest();
    }));

    it('should provide an array of posts by category id', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '?filter[cat]=1').respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));

        wpApiResource.getPostsByCategoryId(1).then(function (value) {
            expect(Array.isArray(value)).toBe(true);
        });

        $rootScope.$digest();
    }));

    it('should provide an array of tags', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.tag.endpoint).respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));

        wpApiResource.getTags().then(function (value) {
            expect(Array.isArray(value)).toBe(true);
        });

        $rootScope.$digest();
    }));

    it('should provide an array of tags', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.tag.endpoint).respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));

        wpApiResource.getTags().then(function (value) {
            expect(Array.isArray(value)).toBe(true);
        });

        $rootScope.$digest();
    }));

    it('should provide an array of posts by tag id', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '?filter[tag]=1').respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));

        wpApiResource.getPostsByTagId(1).then(function (value) {
            expect(Array.isArray(value)).toBe(true);
        });

        $rootScope.$digest();
    }));

    it('should return an array of posts using provided term', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + "?filter[s]=hawk").respond(200, JSON.stringify([{
            id : '1',
            name : 'test'
        }]));

        wpApiResource.findPostsWithTerm('hawk').then(function (value) {
            expect(Array.isArray(value)).toBe(true);
        });

        $rootScope.$digest();
    }));
});
