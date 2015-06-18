'use strict';

describe('Service: articlesService', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var articlesService, $httpBackend, wpApi;
	beforeEach(inject(function (_$httpBackend_, _articlesService_, _wpApi_) {
        $httpBackend = _$httpBackend_;
        articlesService = _articlesService_;
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

    it('should return articles for category ID 1', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '?filter[cat]=1').respond(200, JSON.stringify([{
            ID : 1,
            name : 'test'
        }]));

        articlesService.getArticlesByCategoryId(1).then(function (articles) {
            expect(articles.length > 0).toBe(true);
        });

        $rootScope.$digest();
    }));
});
