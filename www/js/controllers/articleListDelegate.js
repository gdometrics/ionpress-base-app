'use strict';

angular.module('ionPress')
    .controller('articleListDelegate', function ($scope) {
        this.getArticles = function () {
            return $scope.articles;
        };
    });