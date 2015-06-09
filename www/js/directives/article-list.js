angular.module('ionPress')
    .directive('articleList', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-list.html',
            scope: {
                articles: '='
            },
            link: function postLink(scope) {

            }
        }
    });