angular.module('ionPress')
    .controller('ArticleCtrl', function ($rootScope, $stateParams, $scope, articleService) {
        $scope.articles = $stateParams.articles;
        $scope.article  = articleService.getArticleById($stateParams.id);

        $scope.hideBar = false;

        $rootScope.$on('$ionicView.beforeEnter', function (event, view) {
            if(view.stateName === 'app.article') {
                $scope.hideBar = true;
            }else{
                $scope.hideBar = false;
            }
        });
    });