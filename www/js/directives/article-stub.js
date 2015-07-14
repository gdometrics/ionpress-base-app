angular.module('ionPress')
    .directive('articleStub', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-stub.html',
            scope: {
                article: '=',
                wordLimit: '@'
            },
            require: '^articleList',
            link: function postLink(scope, element, attrs, articleListDelegate) {
                scope.articles = articleListDelegate.getArticles();
            }
        };
    });