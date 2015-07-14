'use strict';

describe('Controller: MainCtrl', function () {

    // load the service's module
    beforeEach(module('ionPress', function ($provide) {
        $provide.decorator('$ionicSideMenuDelegate', function ($delegate) {
            $delegate.toggleLeft = jasmine.createSpy();

            return $delegate;
        });
    }));

    var mainController, scope;
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        mainController = $controller('MainCtrl', {
            '$scope': scope,
            'categories': [{

            }]
        });
    }));

    it('should toggle left menu', inject(function ($ionicSideMenuDelegate) {
        scope.toggleMenu();
        expect($ionicSideMenuDelegate.toggleLeft).toHaveBeenCalled();
    }));

    it('should have categories', function () {
        expect(scope.categories).toBeDefined();
    });
});