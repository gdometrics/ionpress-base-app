angular.module('ionPress')
    .controller('MainCtrl', function ($scope, $ionicSideMenuDelegate) {
        $scope.toggleMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };
    });