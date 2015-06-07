angular.module('ionPress', [
    'ionic',
    'ngCordova',
    'wpApi.config'
]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('app', {
        abstract: true,
        url: '',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
    }).state('app.latest', {
        url: '/',
        /*resolve: {
         projects: function (projects) {
         return projects.getProjectList();
         }
         },*/
        views: {
            content: {
                templateUrl: 'views/articles.html',
                controller: 'ArticlesCtrl'
            }
        }
    }).state('app.category', {
        url: '/category/:id',
        //resolve: {
        //    projects: function (projects) {
        //        return projects.getProjectList();
        //    }
        //},
        views: {
            content: {
                templateUrl: 'views/articles.html',
                controller: 'ArticlesCtrl'
            }
        }
    }).state('app.article', {
        url: '/article/:id',
        //resolve: {
        //    projects: function (projects) {
        //        return projects.getProjectList();
        //    }
        //},
        views: {
            content: {
                templateUrl: 'views/article.html',
                controller: 'ArticleCtrl'
            }
        }
    });
}).run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true); // Fixes issues with keyboard creating space whilst animating
        }
        if (window.StatusBar) {
            StatusBar.hide();
        }
    });
});