angular.module('ionPress')
    .directive('articleList', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-list.html',
            scope: {
                articles: '=',
                category: '='
            },
            /**
             *
             * @param $scope
             */
            controller: function ($scope) {
                this.getArticles = function () {
                    return $scope.articles;
                };
            },
            /**
             *
             * @param scope
             */
            link: function postLink(scope) {

            }
        }
    });