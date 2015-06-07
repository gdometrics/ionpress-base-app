'use strict';

describe('Factory: wpApiResource', function () {

	// load the service's module
	beforeEach(module('ionPress'));

	var wpApiResource;
	beforeEach(inject(function (_wpApiResource_) {
		wpApiResource = _wpApiResource_;
	}));

	it("returns a promise" , function() {
		console.log(wpApiResource.getCategories());
		expect(wpApiResource.getCategories().hasOwnProperty('promise')).toBe(true);
	});
});
