angular.module('ionPress')
    .factory('articlesService', function (wpApiResource) {
        var service = {};

        /**
         * Get Articles By Category Id
         *
         * @param catId
         * @returns {*}
         */
        service.getArticlesByCategoryId = function (catId) {
            return wpApiResource.getPostsByCategoryId(catId);
        };

        return service;
    });
