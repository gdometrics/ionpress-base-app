angular.module('ionPress')
    .directive('articleStub', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-stub.html',
            scope: {
                article: '=',
                category: '=',
                wordLimit: '@'
            },
            require: '^articleList',
            link: function postLink(scope, element, attrs, articleListCntrl) {
                scope.articles = articleListCntrl.getArticles();
            }
        }
    });