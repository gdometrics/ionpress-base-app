angular.module('ionPress')
    .directive('articleViewer', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/article-viewer.html',
            scope: {
                article: '=',
                articles: '='
            },
            controller: 'articleViewerDelegate',
            link: function postLink(scope, elem, attrs, articleViewerDelegate) {
                scope.updateSlideAvailability = articleViewerDelegate.updateSlideAvailability;
                scope.nextSlide = articleViewerDelegate.nextSlide;
                scope.goBack = articleViewerDelegate.goBack;

                articleViewerDelegate.loadArticle(scope.article).then(function (article) {
                    scope.article = article;
                    scope.viewableArticles = articleViewerDelegate.loadViewableArticles(
                        article,
                        angular.copy(scope.articles)
                    );
                });
            }
        };
    });