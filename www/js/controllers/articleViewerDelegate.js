angular.module('ionPress')
    .controller('articleViewerDelegate', function ($scope, $ionicSlideBoxDelegate, $ionicHistory, $state, $ionicLoading, $q) {
        var delegate = $ionicSlideBoxDelegate.$getByHandle('article-viewer'),
            controller = this;

        /**
         * Load Article 
         *
         * @param article
         * @returns {deferred.promise|{then}}
         */
        controller.loadArticle = function (article) {
            var deferred = $q.defer();

            $ionicLoading.show({
                templateUrl: 'views/loaders/article-viewer.html'
            });

            $q.when(article).then(function (article) {
                deferred.resolve(article);
                controller.updateSlideAvailability();
                $ionicLoading.hide();
            });

            return deferred.promise;
        };

        /**
         *
         * @param article
         * @param articles
         * @returns {Array}
         */
        controller.loadViewableArticles = function (article, articles) {
            // Get selected article's position with in array
            var index = controller.getArticlePosition(article, articles),
                viewableArticles = [];

            if(index !== false) {
                // Copy articles into a viewable selection to allow for swiping
                viewableArticles = articles.splice(index, articles.length);
            }

            return viewableArticles;
        };

        /**
         * Get Article position within articles list
         *
         * @param article
         * @param articles
         * @returns {boolean}
         */
        controller.getArticlePosition = function (article, articles) {
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

        /**
         * Transition to next slide
         */
        controller.nextSlide = function () {
            delegate.next();
            controller.updateSlideAvailability();
        };

        /**
         * Update Availability of next slide
         */
        controller.updateSlideAvailability = function () {
            $scope.isNextSlideAvailable = isNextSlideAvailable();
        };

        /**
         * Where available go back to the previous view
         * otheriwse return back to the main screen (app.latest)
         */
        controller.goBack = function () {
            var history = $ionicHistory.viewHistory();
            if(history.backView !== null) {
                $ionicHistory.goBack();
            }else{
                $state.go('app.latest');
            }
        };

        /**
         *
         * @returns {boolean}
         */
        function isNextSlideAvailable () {
            return ((delegate.currentIndex() + 1) < $scope.articles.length);
        }
    });