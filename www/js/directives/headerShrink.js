angular.module('ionPress.plugin.headerShrink', [])
    .directive('headerShrink', function ($document, $rootScope) {
        var reset = false;

        function resetHeaders () {
            var headers = $document[0].body.querySelectorAll('.bar-header');
            ionic.requestAnimationFrame(function () {
                angular.forEach(headers, function (header) {
                    header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, 0, 0)';

                    for (var i = 0, j = header.children.length; i < j; i++) {
                        header.children[i].style.opacity = 1;
                    }

                    reset = true;
                });
            });
        }

        // Reset headers after the view has segued to the next
        $rootScope.$on('$ionicView.beforeLeave', function () {
            resetHeaders();
        });

        return { //@TODO move logic into a controller to provide access to $ionicView events
            restrict: 'A',
            link: function ($scope, $element) {
                var y = 0;
                var prevY = 0;
                var scrollDelay = 0.4;

                var fadeAmt;

                var headers = $document[0].body.querySelectorAll('.bar-header');
                var headerHeight = headers[0].offsetHeight;

                function onScroll(e) {
                    var scrollTop = e.detail.scrollTop;

                    if (scrollTop >= 0 && reset === false) {
                        y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
                    } else {
                        reset = false;
                        y = 0;
                    }

                    ionic.requestAnimationFrame(function () {
                        fadeAmt = 1 - (y / headerHeight);
                        angular.forEach(headers, function (header) {
                            header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';

                            for (var i = 0, j = header.children.length; i < j; i++) {
                                header.children[i].style.opacity = fadeAmt;
                            }
                        });
                    });

                    prevY = scrollTop;
                }

                $element.bind('scroll', onScroll);
            }
        };
    });