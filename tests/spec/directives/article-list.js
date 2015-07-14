'use strict';

describe('Directive: articleList', function () {

	// load the service's module
	beforeEach(module('ionPress'));

    var element, scope;
    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.articles = [];

        element = $compile('<article-list articles="articles"></article-list>')(scope);

        scope.$digest();
    }));

    it('should have articles', function () {
        var isolated = element.isolateScope();
        expect(isolated.articles).toBeDefined();
    });

    it('should have a controller', function () {
        expect(element.controller).toBeDefined();
    });
});
