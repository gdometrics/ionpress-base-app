angular.module('ionPress')
    .directive('articleList', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-list.html',
            scope: {
                articles: '='
            },
            controller: 'articleListDelegate',
            link: function postLink(scope) {}
        }
    });