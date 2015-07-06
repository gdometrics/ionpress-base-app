'use strict';

describe('Directive: articleViewer', function () {

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

    var element, scope, deferred;
    beforeEach(inject(function ($rootScope, $compile, $q, moment) {
        scope    = $rootScope.$new();
        element  = $compile('<article-viewer article="article" articles="articles"></article-viewer>')(scope);
        deferred = $q.defer()

        scope.article = deferred.promise;
        deferred.resolve({
            ID: 1,
            title: "stub title",
            content: "Excuse me. Excuse me. Marty, you seem so nervous, is something wrong? Are you okay? Marty, one rejection isn't the end of the world.",
            author: {
                name: 'test',
                avatar: 'avatar.png'
            },
            modified: moment().format()
        });

        scope.articles = [{
            ID: 1,
            title: "stub title",
            content: "Excuse me. Excuse me. Marty, you seem so nervous, is something wrong? Are you okay? Marty, one rejection isn't the end of the world.",
            author: {
                name: 'test',
                avatar: 'avatar.png'
            },
            modified: moment().format()
            },
            {
                ID: 2,
                title: "stub title",
                content: "Excuse me. Excuse me. Marty, you seem so nervous, is something wrong? Are you okay? Marty, one rejection isn't the end of the world.",
                author: {
                    name: 'test',
                    avatar: 'avatar.png'
                },
                modified: moment().format()
            }];

        scope.$digest();
    }));

    it('should have an article', function () {
        var isolated = element.isolateScope();
        expect(isolated.article).toBeDefined();
        expect(isolated.article.ID).toBeDefined();
    });

    it('should call next slide', function () {
        var isolated     = element.isolateScope();
        var ionFooterBar = angular.element(element.find('ion-footer-bar'));
        var buttons      = ionFooterBar.find('button');

        spyOn(isolated, 'nextSlide');

        angular.forEach(buttons, function (button) {
            var bttnEl = angular.element(button);
            if(bttnEl.hasClass('next')) {
                bttnEl.triggerHandler('click');
            }
        });

        expect(isolated.nextSlide).toHaveBeenCalled();
    });
});
