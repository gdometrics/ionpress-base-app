'use strict';

describe('Module: app', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var $httpBackend, wpApi;
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

    var $state, $injector, rootScope;
    beforeEach(inject(function (_$state_, _$rootScope_, _$injector_) {
        $state = _$state_;
        $injector = _$injector_;
        rootScope = _$rootScope_;
    }));

    afterEach(inject(function($httpBackend){
        //These two calls will make sure that at the end of the test, all expected http calls were made
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    }));

    describe('Route: state.app', function () {
        var state;
        beforeEach(function () {
            state = $state.get('app');
        });

        it('should use the MainCrl', function () {
            expect(state.controller).toBe('MainCtrl')
        });

        it('should be an abstract view', function () {
            expect(state.abstract).toBe(true)
        });

        it('should resolve categories', function () {
            expect(state.resolve.categories).toBeDefined();

            $injector.invoke(state.resolve.categories).then(function (categories) {
                expect(Array.isArray(categories));
            });
        });
    });
});
