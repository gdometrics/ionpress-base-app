'use strict';

describe('Directive: articleFull', function () {

	// load the service's module
	beforeEach(module('ionPress'));

    var element, scope;
    beforeEach(inject(function ($rootScope, $compile, moment) {
        scope = $rootScope.$new();

        element = $compile('<article-full article="article"></article-full>')(scope);

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
});
