var smartSearchModule = angular.module('ionPress.plugin.smartSearch', ['ionic', 'jett.ionic.filter.bar', 'ionPress', 'angular.filter']);
(function (angular, smartSearchModule) {
    'use strict';

    smartSearchModule.factory('$smartSearchService', function (wpApiResource) {
        var service = {};

        /**
         *
         *
         * @param term
         * @returns {Object}
         */
        service.search = function (term) {
          return wpApiResource.findPostsWithTerm(term);
        };

        return service;
    });

    smartSearchModule.controller('$smartSearchController',
        function ($document, $compile, $scope, $attrs, $filter, $ionicFilterBar, $smartSearchService, $q) {
            var filterBars, searchIcon, inputWrapper,
                parentCntrlScope = $scope.$parent,
                spinner = $compile('<ion-spinner icon="ripple" class="search-loading"></ion-spinner>')($scope);

            /**
             *
             * @param filteredItems
             */
            function updateItems (filteredItems) {
                filteredItems = $q.when(filteredItems);
                filteredItems.then(function (items) {
                    parentCntrlScope.articles = items;
                }, function () {
                    parentCntrlScope.articles = [];
                });
            }

            /**
             *
             * @param withArticles
             */
            function restoreList (withArticles) {
                parentCntrlScope.articles = withArticles;
            }

            /**
             *
             * @param collection
             * @param search
             * @returns {deferred.promise}
             */
             function filterAndSearch (collection, search) {
                var deferred = $q.defer();

                $smartSearchService.search(search).then(function (response) {
                    if(response.length > 0) {
                        deferred.resolve(response);
                    }else{
                        deferred.reject();
                    }
                });

                return deferred.promise;
            };

            /**
             *
             */
            this.showFilterBar = function () {
                var originalArticles = angular.copy(parentCntrlScope.articles);
                var filterBarInstance = $ionicFilterBar.show({
                    items: parentCntrlScope.articles,
                    update: updateItems,
                    cancel: function () {
                        restoreList(originalArticles);
                    },
                    filter: function (collection, search) {
                        if(ionic.Platform.isIOS()) {
                            angular.element(inputWrapper[0]).prepend(spinner);
                            angular.element(searchIcon[0]).remove();
                        }

                        var promise = filterAndSearch(collection, search);

                        promise.finally(function () {
                            if(ionic.Platform.isIOS()) {
                                angular.element(inputWrapper[0]).prepend(searchIcon[0]);
                                spinner.remove();
                            }
                        });

                        return promise;
                    },
                    debounce: true
                });

                filterBars = $document[0].body.querySelectorAll('.filter-bar-wrapper');
                searchIcon = angular.element(filterBars[0]).find('i');
                inputWrapper = filterBars[0].querySelectorAll('.item-input-wrapper');
            };
        }
    );

    /**
     *
     */
    smartSearchModule.directive('smartSearch', function () {
        return {
            restrict: 'A',
            template: '',
            controller: '$smartSearchController',
            link: function (scope, element, attrs, controller) {
                element.bind('click', controller.showFilterBar);
            }
        };
    });
})(angular, smartSearchModule);