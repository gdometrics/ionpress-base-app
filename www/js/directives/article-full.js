angular.module('ionPress')
    .directive('articleFull', function (articleService) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-full.html',
            scope: {
                article: '='
            },
            link: function postLink(scope) {

                // @TODO use article.format (standard/image) to determine template

                scope.article.categories = articleService.getCategoriesFromArticle(scope.article);
            }
        }
    });