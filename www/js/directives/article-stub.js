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
            /**
             *
             * @param scope
             * @param element
             * @param attrs
             * @param articleListCntrl
             */
            link: function postLink(scope, element, attrs, articleListCntrl) {
                scope.articles = articleListCntrl.getArticles();
            }
        }
    });