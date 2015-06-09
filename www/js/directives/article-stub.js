angular.module('ionPress')
    .directive('articleStub', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-stub.html',
            scope: {
                article: '=',
                wordLimit: '@'
            },
            link: function postLink(scope) {

            }
        }
    });