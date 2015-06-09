angular.module('ionPress')
    .factory('articleService', function () {
        var service = {};

        /**
         * Get Categories from Article
         *
         * @param article
         * @returns {Array}
         */
        service.getCategoriesFromArticle = function (article) {
            var categories = [];

            if(article.hasOwnProperty('terms') &&
                article.terms.hasOwnProperty('category')) {
                angular.forEach(article.terms.category, function(category) {
                    if(category.hasOwnProperty('name')) {
                        // Extract properties that we need and push into array
                        categories.push({
                            id: category.ID,
                            name: category.name
                        });
                    }
                });
            }

            return categories;
        };

        return service;
    });
