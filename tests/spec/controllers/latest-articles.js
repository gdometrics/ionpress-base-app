'use strict';

describe('Controller: LatestArticlesCtrl', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var articlesController, $httpBackend, wpApi, scope;
	beforeEach(inject(function (_$httpBackend_, _wpApi_) {
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
            id : 1,
            name : 'test'
        }]));

        $httpBackend.expect('GET', wpApi.baseUrl + wpApi.category.endpoint);
        $httpBackend.expect('GET', wpApi.baseUrl + wpApi.post.endpoint);
	}));

    beforeEach(inject(function ($controller, $rootScope, $stateParams) {
        scope           = $rootScope.$new();
        $stateParams.id = 1;
        $stateParams.articles = [{
            id: 1,
        }];

        articlesController = $controller('LatestArticlesCtrl', {
            '$scope': scope,
            'articles': [{
                id: 1,
                name: 'abcd'
            }]
        });
    }));

    afterEach(inject(function($httpBackend){
        //These two calls will make sure that at the end of the test, all expected http calls were made
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('should have articles', function () {
        expect(scope.articles).toBeDefined();
    });

    it('should have an array of articles', function () {
        expect(Array.isArray(scope.articles)).toBe(true);
    });
});
