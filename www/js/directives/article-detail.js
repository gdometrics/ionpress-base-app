angular.module('ionPress')
    .directive('articleDetail', function (articleService) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-detail.html',
            scope: {
                article: '='
            },
            link: function postLink(scope) {
                scope.article.categories = articleService.getCategoriesFromArticle(scope.article);
            }
        };
    });