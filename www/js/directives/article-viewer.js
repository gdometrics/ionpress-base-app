angular.module('ionPress')
    .directive('articleViewer', function ($rootScope, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory) {
        $rootScope.$on('$ionicView.beforeLeave', function (event, state) {
            //if(state.direction == "back" && state.stateName == "app.article") {
            console.log(state);
            //}
        });

        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-viewer.html',
            scope: {
                article: '=',
                articles: '='
            },
            link: function postLink(scope, elem, attrs) {
                $ionicLoading.show({
                    template: '<ion-spinner icon="ripple" class="spinner-positive article-viewer"></ion-spinner>'
                });

                scope.article.then(function (article) {
                    // Get selected article's position with in array
                    var index = getArticlePosition(article, scope.articles);

                    if(index !== false) {
                        // Copy articles into a viewable selection to allow for swiping
                        scope.viewableArticles = angular.copy(scope.articles);
                        scope.viewableArticles = scope.viewableArticles.splice(index, scope.articles.length);
                    }

                    scope.article = article;
                    $ionicLoading.hide();
                });

                scope.goBack = function () {
                    $ionicHistory.goBack();
                };

                scope.nextSlide = function () {
                    $ionicSlideBoxDelegate.next();
                };

                /**
                 * Get Article position within articles list
                 *
                 * @param article
                 * @param articles
                 * @returns {boolean}
                 */
                function getArticlePosition(article, articles) {
                    var index = false;
                    if(article.hasOwnProperty('ID')) {
                        angular.forEach(articles, function (a, i) {
                            if(a.ID === article.ID) {
                                index = i;
                            }
                        });
                    }

                    return index;
                }
            }
        }
    });