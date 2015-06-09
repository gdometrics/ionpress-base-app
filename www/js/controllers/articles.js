angular.module('ionPress')
    .controller('ArticlesCtrl', function ($scope, category, articles) {
        $scope.title = category.name;
        $scope.articles = articles;
    });