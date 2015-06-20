'use strict';

describe('Directive: articleStub', function () {

	// load the service's module
	beforeEach(module('ionPress'));

    var element, scope;
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();

        element = $compile('<article-stub article="article" articles="articles" category="category" word-limit="20"></article-stub>')(scope);

        scope.article = {
            ID: 1,
            title: "stub title",
            content: "Excuse me. Excuse me. Marty, you seem so nervous, is something wrong? Are you okay? Marty, one rejection isn't the end of the world."
        };

        scope.category = {
            id: 1
        }

        scope.articles = [];
        scope.wordLimit = 20;

        scope.$digest();
    }));

    it('should have an article', function () {
        var isolated = element.isolateScope();
        expect(isolated.article).toBeDefined();
    });

    it('should have a category', function () {
        var isolated = element.isolateScope();
        expect(isolated.category).toBeDefined();
    });

    it('should have an array of articles', function () {
        var isolated = element.isolateScope();
        expect(isolated.articles).toBeDefined();
        expect(Array.isArray(isolated.articles)).toBe(true);
    });

    it('should have a title', function () {
        var isolated = element.isolateScope();
        var titleElm;
        angular.forEach(element.find('h2'), function (elm) {
            if(angular.element(elm).hasClass('title')) {
                titleElm = angular.element(elm);
            }
        });

        expect(titleElm.html()).toBe('stub title');
    });

    it('should limit content to 20 characters', function () {
        scope.wordLimit = 20;
        scope.$digest();

        var contentElm;
        angular.forEach(element.find('div'), function (elm) {
            if(angular.element(elm).hasClass('content')) {
                contentElm = angular.element(elm);
            }
        });

        // 115 is the number of characters for 20 words
        expect(contentElm.html().length).toBe(115);
    });

    it('should go to app.article state when clicking continue', inject(function ($state, $timeout, $httpBackend, wpApi) {
        var continueElm;
        angular.forEach(element.find('div'), function (elm) {
            if(angular.element(elm).hasClass('continue-reading')) {
                continueElm = angular.element(elm);
            }
        });

        var link = continueElm.find('a');

        // Prepare click event on element as jasmie/phantomJS don't define .click()
        angular.element(link).triggerHandler('click');

        // Mock backend requests
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.category.endpoint).respond(200, JSON.stringify([{
            id : 'abcde',
            name : 'test'
        }]));

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint).respond(200, JSON.stringify([{
            id : 'abcde',
            name : 'test'
        }]));

        // Prepare spy to capture state.go
        var stateName, stateParams;
        spyOn($state, 'go').and.callFake(function(state, params) {
            stateName = state;
            stateParams = params;
        });

        // Trigger click event
        $timeout.flush();

        // Test for expected state params
        expect($state.go).toHaveBeenCalled();
        expect(stateName).toBe('app.article');
        expect(stateParams.id).toBe(1);
        expect(stateParams.articles).toBeDefined();
    }));

    it('should go to app.article state when clicking article stub body', inject(function ($state, $timeout, $httpBackend, wpApi) {
        var bodyElm;
        angular.forEach(element.find('div'), function (elm) {
            if(angular.element(elm).hasClass('item-body')) {
                bodyElm = angular.element(elm);
            }
        });

        // Prepare click event on element as jasmie/phantomJS don't define .click()
        angular.element(bodyElm).triggerHandler('click');

        // Mock backend requests
        $httpBackend.when('GET', wpApi.baseUrl + wpApi.category.endpoint).respond(200, JSON.stringify([{
            id : 'abcde',
            name : 'test'
        }]));

        $httpBackend.when('GET', wpApi.baseUrl + wpApi.post.endpoint).respond(200, JSON.stringify([{
            id : 'abcde',
            name : 'test'
        }]));

        // Prepare spy to capture state.go
        var stateName, stateParams;
        spyOn($state, 'go').and.callFake(function(state, params) {
            stateName = state;
            stateParams = params;
        });

        // Trigger click event
        $timeout.flush();

        // Test for expected state params
        expect($state.go).toHaveBeenCalled();
        expect(stateName).toBe('app.article');
        expect(stateParams.id).toBe(1);
        expect(stateParams.articles).toBeDefined();
    }));
});
