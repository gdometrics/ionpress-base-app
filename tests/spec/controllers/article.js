'use strict';

describe('Controller: articleController', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var articleController, articleService, $httpBackend, wpApi, scope;
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

    beforeEach(inject(function ($controller, $rootScope, $stateParams, _articleService_) {
        scope           = $rootScope.$new();
        $stateParams.id = 1;
        $stateParams.articles = [{
            id: 1,
        }];

        articleController = $controller('ArticleCtrl', {
            '$scope': scope,
            '$stateParams': $stateParams,
            'articleService': _articleService_
        });

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '/1').respond(200, JSON.stringify({
            id : 1,
            name : 'test'
        }));
    }));

    afterEach(inject(function($httpBackend){
        //These two calls will make sure that at the end of the test, all expected http calls were made
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it('should be receive an array of articles from $stateParams', function () {
        expect(scope.articles.length > 0).toBe(true);
    });

    it('should retrieve an article with the given ID of 1', function () {
        scope.article.then(function (article) {
            expect(article.id).toBe(1);
        });
    });
});
