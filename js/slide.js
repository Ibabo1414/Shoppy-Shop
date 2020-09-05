$(function() {

    /* DOM Elements */

    var $rightArrow = $('.slide-arrow-right'),
        $leftArrow = $('.slide-arrow-left'),
        $sliderTrack = $('.slider-track'),
        $slides = $('.slide-container'),
        $slider = $('.main-slider');

    /* Params */

    var sliderTrackLength = $sliderTrack.width(),
        sliderLength = $slider.width(),
        steps = $slides.length,
        step = $slides.width(),
        offset = ((sliderLength - (step * steps)) / 2) - (steps * step),
        rightClickDisabled = false,
        leftClickDisabled = false;

    /* Clone Slides */

    $slides.clone().addClass('cloned-left').prependTo($sliderTrack);
    $slides.clone().addClass('cloned-right').appendTo($sliderTrack);

    /* Event Listeners */

    $leftArrow.on('click', slideToLeft);
    $rightArrow.on('click', slideToRight);

    /* Controller */

    var slideController = {};

    slideController.currentStep = {
        value: 0,
        increase: function() {
            return ++slideController.currentStep.value;
        },
        decrease: function() {
            return --slideController.currentStep.value;
        },
        reset: function() {
            return slideController.currentStep.value = 0;
        }
    };

    slideController.position = {
        value: 0,
        set: function(position) {
            var positions = {
                left: function() {
                    var firstSlide = slideController.currentStep.value === 0,
                        lastSlide = slideController.currentStep.value === -steps;

                    if (firstSlide) {
                        slideController.position.value = offset + step;
                        slideController.currentStep.decrease();
                    } else if (lastSlide) {
                        slideController.position.value = offset;
                        slideController.currentStep.reset();
                    } else {
                        slideController.position.value = slideController.position.value + step;
                        slideController.currentStep.decrease();
                    }

                    return slideController.position.value;
                },
                right: function() {
                    var firstSlide = slideController.currentStep.value === 0,
                        lastSlide = slideController.currentStep.value === steps - 1;

                    if (firstSlide) {
                        slideController.position.value = offset - step;
                        slideController.currentStep.increase();
                    } else if (lastSlide) {
                        slideController.position.value = slideController.position.value - step;
                        setTimeout(function() {
                               slideController.position.value = offset;
                            $sliderTrack.css({
            'transform': 'translateX(' + offset + 'px)',
            'transition-duration': '0s'
        });
                        }, 1000)
                           
                     
                        slideController.currentStep.reset();
                        console.log('Last Slide!');
                    } else {
                        slideController.position.value = slideController.position.value - step;
                        slideController.currentStep.increase();
                    }

                    return slideController.position.value;
                }
            };

            return positions[position]();
        }
    };

    slideController.shift = function(direction) {
        var directions = {
            left: function() {
                var position = slideController.position.set('left');

                translateX(position);
            },
            right: function() {
                var position = slideController.position.set('right');

                translateX(position);
            }
        };

        return directions[direction]();
    };
    
    /* Special Functions */

    function slideToRight() {
        if (!rightClickDisabled) {
            slideController.shift('right');
            rightClickDisabled = true;
 
            setTimeout(function() {
                rightClickDisabled = false;
            }, 1000);
        }
    }

    function slideToLeft() {
        if (!leftClickDisabled) { 
            slideController.shift('left');
            leftClickDisabled = true;

            setTimeout(function() {
               leftClickDisabled = false;
            }, 1000);
        }
    }

    function translateX(value) {
        var complexValue = typeof value === 'object';
        
        complexValue ? translateWithDuration() : 
        $sliderTrack.css({
            'transform': 'translateX(' + value + 'px)',
            'transition-duration': '1s'
        });
    }
});