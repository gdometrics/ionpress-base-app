angular.module('ionPress')
    .directive('articleHeader', function (articleService) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-header.html',
            scope: {
                article: '='
            },
            link: function postLink(scope) {
                scope.article.categories = articleService.getCategoriesFromArticle(scope.article);
            }
        }
    });