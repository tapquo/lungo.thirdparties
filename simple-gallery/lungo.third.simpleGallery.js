/**
 * Simple Image Gallery
 *
 * @namespace Lungo.Sugar
 * @class simpleGallery
 *
 * @author Hugo Habel <hugohabel@gmail.com> || @hugohabel
 */

Lungo.Sugar.SimpleGallery = (function(lng, undefined) {
    // Internal options
    var _options = [];
    // Aux vars
    var _imgs = [];             // Images collection
    var _imgsCount = null;      // Number of images
    var _currentIndex = null;   // Current image number
    var _currentImg = null;     // Current image
    var _transition = null;
    var _texts = [];
    // Selectors
    var SELECTOR = {
        BODY : 'body',
        SECTION : '#main',
        SIMPLEGALLERY : '.simpleGallery',
        IMGS : '.simpleGallery img'
    }
    // CSS Classes
    var CSS_CLASS = {
        ANIMATED : 'animated',
        INACTIVE : 'inactive'
    }
    // Sugar HTML
    var MARKUP_SIMPLEGALLERY = '<div class="simpleGallery"></div>';
    // Init Method
    var _init = function() {
        $(SELECTOR.BODY).append(MARKUP_SIMPLEGALLERY);
        _subscribeEvents();
    };
    // Show Method
    var show = function(simpleGallery) {
        var gallery = $(SELECTOR.SIMPLEGALLERY);                                // Get the gallery container
        for ( var i = 0, len = simpleGallery.imgs.length; i < len; i++ ) {      // Create the img tags and populate the gallery
            var img = document.createElement('img');
            img.src = simpleGallery.imgs[i];
            img.setAttribute('class', 'inactive');
            gallery.append(img);
        }
        _imgs = $(SELECTOR.IMGS);
        _imgsCount = _imgs.length;
        _currentIndex = 0;
        _texts = simpleGallery.text;
        if ( simpleGallery.showText ) {
            var textContainer = document.createElement('div');
            textContainer.setAttribute('class', 'textContainer');
            if ( simpleGallery.textPosition == 'top' ) {
                textContainer.style.top = '0px';
            } else if ( simpleGallery.textPosition == 'bottom' ) {
                textContainer.style.bottom = '0px';
            }
            gallery.append(textContainer);
            var text = document.createElement('p');
            text.innerHTML = simpleGallery.text[_currentIndex];
            $(textContainer).append(text);
        }
        $(_imgs[_currentIndex]).attr('class', CSS_CLASS.ANIMATED);              // Set the active image
        _transition = simpleGallery.transition;
        if ( simpleGallery.slideshow == 'auto' ) {
            setInterval(_slideshow, 2000);
        }
    };
    function _slideshow() {
        $(SELECTOR.SIMPLEGALLERY).trigger('click');
    }
    // Register the events
    var _subscribeEvents = function() {
        $(SELECTOR.SIMPLEGALLERY).bind('click', function() {
            $(_imgs[_currentIndex]).attr('class', 'inactive');
            if ( _currentIndex == _imgs.length - 1 ) {
                _currentIndex = 0;
            } else {
                _currentIndex++;
            }
            $(_imgs[_currentIndex]).attr('class', 'animated ' + _transition);
            $('.textContainer p')[0].innerHTML = _texts[_currentIndex];
        });
    };
    _init();    // Initializes the sugar
    return {
        show: show
    }
})(Lungo);
