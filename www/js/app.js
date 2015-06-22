angular.module('ionPress', [
    'ionic',
    'ionic.ion.headerShrink',
    'ngCordova',
    'ngResource',
    'wpApi.config',
    'truncate',
    'angularMoment'
]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('app', {
        abstract: true,
        url: '',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
            categories: function (wpApiResource) {
                return  wpApiResource.getCategories();
            }
        }
    }).state('app.latest', {
        url: '/',
        resolve: {
             articles: function (wpApiResource) {
                 return  wpApiResource.getPosts();
             }
         },
        views: {
            content: {
                templateUrl: 'views/latest-articles.html',
                controller: 'LatestArticlesCtrl'
            }
        }
    }).state('app.category', {
        url: '/category/:id',
        resolve: {
            category: function ($stateParams, wpApiResource) {
                return wpApiResource.getCategory($stateParams.id);
            },
            articles: function ($stateParams, wpApiResource) {
                return wpApiResource.getPostsByCategoryId($stateParams.id);
            }
        },
        views: {
            content: {
                templateUrl: 'views/articles.html',
                controller: 'ArticlesCtrl'
            }
        }
    }).state('app.article', {
        url: '/article/:id',
        views: {
            content: {
                templateUrl: 'views/article.html',
                controller: 'ArticleCtrl'
            }
        },
        params: {
            articles: []
        },
        cache: false
    });
}).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        /* istanbul ignore if  */
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true); // Fixes issues with keyboard creating space whilst animating
        }
        /* istanbul ignore if  */
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
});