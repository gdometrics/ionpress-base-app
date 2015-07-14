'use strict';

describe('Controller: articleListDelegate', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var articleListDelegateController, scope;
    beforeEach(inject(function ($controller, $rootScope, $stateParams, _articleService_) {
        scope = $rootScope.$new();
        scope.articles = [];

        articleListDelegateController = $controller('articleListDelegate', {
            '$scope': scope
        });
    }));

    it('should return and array of articles', function () {
        expect(articleListDelegateController.getArticles).toBeDefined();
        expect(Array.isArray(articleListDelegateController.getArticles())).toBe(true);
    });
});
