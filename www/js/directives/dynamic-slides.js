angular.module('ionPress')
    .directive('dynamicSlides', function () {
        return {
            require: ['^ionSlideBox'],
            link: function (scope, elem, attrs, slider) {
                scope.$watch(function () {
                    return scope.$eval(attrs.dynamicSlides).length;
                }, function () {
                    slider[0].__slider.update();
                });
            }
        };
    });