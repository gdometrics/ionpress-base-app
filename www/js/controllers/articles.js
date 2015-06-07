angular.module('ionPress')
    .controller('ArticlesCtrl', function ($scope, category) {
        $scope.title = category.name;
    });