angular.module('ionPress')
    .controller('ArticlesCtrl', function ($scope, category, articles) {
        $scope.category = category;
        $scope.articles = articles;
    });