angular.module('ionPress')
    .controller('ArticleCtrl', function ($scope, article) {
        $scope.article = article;
    });