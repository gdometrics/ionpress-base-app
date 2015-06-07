angular.module('ionPress')
    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate, categories) {
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.categories = categories;
    });