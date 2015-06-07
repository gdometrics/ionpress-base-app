angular.module('ionPress')
    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, wpApiResource) {
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        wpApiResource.getCategories().then(function (categories) {
        	console.log(categories);
        });
    });