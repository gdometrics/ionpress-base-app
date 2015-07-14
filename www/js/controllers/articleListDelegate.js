angular.module('ionPress')
    .controller('articleListDelegate', function ($scope) {
        var controller = this;

        /**
         * Provides an interface to share articles between controllers
         *
         * @returns {*}
         */
        controller.getArticles = function () {
            // Deep copy articles
            var articles = angular.copy($scope.articles);

            return controller.modify(articles);
        };

        /**
         * Provides a cleaner interface to modify articles
         *
         * Using a decorator this function can be extended
         * and used to apply additional modifications or filters
         *
         * @param articles
         * @returns {*}
         */
        controller.modify = function (articles) {
            return articles;
        };
    });
