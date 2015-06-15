angular.module('ionPress')
    .directive('articleStub', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-stub.html',
            scope: {
                article: '=',
                category: '=',
                articles: '=',
                wordLimit: '@'
            },
            link: function postLink(scope) {

            }
        }
    });