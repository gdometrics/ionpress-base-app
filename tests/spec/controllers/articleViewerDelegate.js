'use strict';

describe('Controller: articleViewerDelegate', function () {

    // load the service's module
    beforeEach(module('ionPress', function ($provide) {
        $provide.decorator('$ionicLoading', function ($delegate) {

            $delegate.show = jasmine.createSpy();
            $delegate.hide = jasmine.createSpy();

            return $delegate;
        });
    }));

    var articleViewerDelegateController, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        articleViewerDelegateController = $controller('articleViewerDelegate', {
            '$scope': scope
        });

        articleViewerDelegateController.updateSlideAvailability = jasmine.createSpy();
    }));

    it('should show ionic loading modal when loading an article', inject(function ($q, $ionicLoading) {
        var deferred = $q.defer();
        articleViewerDelegateController.loadArticle(deferred.promise);

        expect($ionicLoading.show).toHaveBeenCalled();
    }));

    it('should hide ionic loading modal when an article has loaded', inject(function ($q, $ionicLoading) {
        var deferred = $q.defer();
        articleViewerDelegateController.loadArticle(deferred.promise);
        deferred.resolve();
        scope.$digest();
        expect($ionicLoading.hide).toHaveBeenCalled();
    }));

    it('should remove article in focus from viewable articles', function () {
        var article = {ID: 2},
            articles = [
                {
                    ID: 1
                },{
                    ID: 2
                },{
                    ID: 3
                }
            ],
            viewableArticles = articleViewerDelegateController.loadViewableArticles(article, articles);

           expect(viewableArticles.indexOf(article)).toBe(-1);
    });
});
