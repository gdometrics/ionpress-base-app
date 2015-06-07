angular.module('ionPress')
    .controller('LatestArticlesCtrl', function ($scope, articles) {
        $scope.articles = articles;
    });