'use strict';

describe('Service: articleService', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var articleService, $httpBackend, wpApi;
	beforeEach(inject(function (_$httpBackend_, _articleService_, _wpApi_) {
        $httpBackend = _$httpBackend_;
        articleService = _articleService_;
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

    it('should return an article with an ID of 1', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '/1').respond(200, JSON.stringify({
            ID : 1,
            name : 'test'
        }));

        articleService.getArticleById(1).then(function (article) {
            expect((article.ID === 1)).toBe(true);
        });

        $rootScope.$digest();
    }));

    it('should have 2 categories', inject(function ($rootScope) {
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint + '/1').respond(200, JSON.stringify({
            ID : 1,
            name : 'test',
            terms: {
                category: [
                    {
                        id: 1,
                        name: 'cat 1'
                    },
                    {
                        id: 2,
                        name: 'cat 2'
                    }
                ]
            }
        }));

        articleService.getArticleById(1).then(function (article) {
            var categories = articleService.getCategoriesFromArticle(article);
            expect(categories.length === 2).toBe(true);
        });

        $rootScope.$digest();
    }));
});
