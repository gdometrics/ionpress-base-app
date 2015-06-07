angular.module('ionPress')
    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, wpApiResource) {
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        wpApiResource.getPostsByCategoryId(3).then(function (categories) {
        	console.log(categories);
        });
    });