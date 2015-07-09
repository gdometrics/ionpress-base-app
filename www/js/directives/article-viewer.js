angular.module('ionPress')
    .directive('articleViewer', function ($rootScope, $ionicLoading, $ionicSlideBoxDelegate, $ionicHistory) {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-viewer.html',
            scope: {
                article: '=',
                articles: '='
            },
            require: ['articleViewer'],
            controller: function ($scope, $ionicSlideBoxDelegate) {
                /**
                 * Get Article position within articles list
                 *
                 * @param article
                 * @param articles
                 * @returns {boolean}
                 */
                this.getArticlePosition = function (article, articles) {
                    var index = false;
                    if(article.hasOwnProperty('ID')) {
                        angular.forEach(articles, function (a, i) {
                            if(a.ID === article.ID) {
                                index = i;
                            }
                        });
                    }

                    return index;
                };

                this.updateSlideAvailability = function () {
                    $scope.isSlideAvailable = isSlideAvailable();
                };

                function isSlideAvailable  () {
                    console.log($ionicSlideBoxDelegate.$getByHandle('article-viewer').slidesCount());
                    return(($ionicSlideBoxDelegate.currentIndex()+1) < $ionicSlideBoxDelegate.slidesCount());
                };
            },
            link: function postLink(scope, elem, attrs, controllers) {
                scope.updateSlideAvailability = controllers[0].updateSlideAvailability;

                $ionicLoading.show({
                    template: '<ion-spinner icon="ripple" class="spinner-positive article-viewer"></ion-spinner>'
                });

                scope.article.then(function (article) {
                    // Get selected article's position with in array
                    var index = controllers[0].getArticlePosition(article, scope.articles);

                    if(index !== false) {
                        // Copy articles into a viewable selection to allow for swiping
                        scope.viewableArticles = angular.copy(scope.articles);
                        scope.viewableArticles = scope.viewableArticles.splice(index, scope.articles.length);
                    }

                    scope.article = article;
                    controllers[0].updateSlideAvailability();
                    $ionicLoading.hide();
                });

                scope.goBack = function () {
                    $ionicHistory.goBack();
                };

                scope.nextSlide = function () {
                    $ionicSlideBoxDelegate.$getByHandle('article-viewer').next();
                    controllers[0].updateSlideAvailability();
                };
            }
        }
    });