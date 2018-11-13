;(function ( $, window, document, undefined ) {

    $(function() {
    'use strict';

    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            var later = function() {
                timeout = null;
                if(!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if(callNow) func.apply(context, args);
        };
    };

    const animations = document.querySelectorAll('.animation');
    const node = Array.prototype.slice.call(animations, 0);

    function animation() {
        node.forEach(function(animation, index) {
            const heightOfElement = animation.clientHeight;
            const animationPoint = (window.scrollY + window.innerHeight) - heightOfElement / 2;
            const animationPos = animation.getBoundingClientRect();
            const halfShown = animationPoint > animationPos.top + window.pageYOffset;
            if (halfShown) {
                if (!animation.classList.contains('active')) {
                    animation.className += ' active';
                }
                node.splice(index, 1);
            }
        });
    };
    window.addEventListener('scroll', debounce(animation, 20, false));


    });
    })(jQuery, window, document);