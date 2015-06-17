angular.module('ionPress')
    .controller('ArticleCtrl', function ($rootScope, $stateParams, $scope, articleService) {
        $scope.articles = $stateParams.articles;
        $scope.article  = articleService.getArticleById($stateParams.id);
    });