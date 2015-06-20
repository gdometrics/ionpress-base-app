'use strict';

describe('Directive: articleDetail', function () {

	// load the service's module
	beforeEach(module('ionPress'));

    var element, scope;
    beforeEach(inject(function ($rootScope, $compile, moment) {
        scope = $rootScope.$new();

        element = $compile('<article-detail article="article"></article-detail>')(scope);

        scope.article = {
            ID: 1,
            title: "stub title",
            content: "Excuse me. Excuse me. Marty, you seem so nervous, is something wrong? Are you okay? Marty, one rejection isn't the end of the world.",
            author: {
                name: 'test',
                avatar: 'avatar.png'
            },
            modified: moment().format()
        };

        scope.$digest();
    }));

    it('should have an article', function () {
        var isolated = element.isolateScope();
        expect(isolated.article).toBeDefined();
    });

    it('should have an article with an author', function () {
        var isolated = element.isolateScope();

        expect(isolated.article.author).toBeDefined();
    });

    it('should have the authors name ', function () {
        var isolated = element.isolateScope();

        expect(isolated.article.author.name).toBeDefined();
    });

    it('should have article modified date', function () {
        var isolated = element.isolateScope();

        expect(isolated.article.modified).toBeDefined();
    });

    it('should have an array of categories related to the article', function () {
        var isolated = element.isolateScope();
        expect(isolated.article.categories).toBeDefined();
        expect(Array.isArray(isolated.article.categories)).toBe(true);
    });

    it('should have 2 categories related to the article', inject(function ($compile, articleService) {
        spyOn(articleService, 'getCategoriesFromArticle').and.callFake(function() {
            return [
                {
                    ID: 1,
                    name: 'testCat 1'
                },
                {
                    ID: 2,
                    name: 'testCat 2'
                }
            ];
        });

        element = $compile('<article-detail article="article"></article-detail>')(scope);
        scope.$digest();

        var isolated = element.isolateScope(),
            h2el = element.find('h2');

        expect(h2el.find('a').length).toBe(2);
        expect(isolated.article.categories.length).toBe(2);
    }));

    it('should have an avatar for the article author', function () {
        expect(angular.element(element.find('img')).attr('src')).toBe('avatar.png');
    });
});
