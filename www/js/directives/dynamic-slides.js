angular.module('ionPress')
    .directive('dynamicSlides', function () {
        return {
            require: ['^ionSlideBox', '^articleViewer'],
            link: function (scope, elem, attrs, controllers) {
                scope.$watch(function () {
                    return scope.$eval(attrs.dynamicSlides).length;
                }, function (val) {
                    controllers[0].__slider.update();
                    controllers[1].updateSlideAvailability();
                });
            }
        };
    });