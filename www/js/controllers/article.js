angular.module('ionPress')
    .controller('ArticleCtrl', function ($scope, $stateParams, articleService) {
        $scope.articles = $stateParams.articles;
        $scope.id = $stateParams.id;
        $scope.article = articleService.getArticleById($stateParams.id);
    });