angular.module('ionPress')
    .directive('articleList', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-list.html',
            scope: {
                articles: '=',
                category: '='
            },
            controller: 'articleListDelegate',
            link: function postLink(scope) {}
        }
    });