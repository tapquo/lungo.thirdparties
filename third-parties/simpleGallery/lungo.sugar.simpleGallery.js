/** 
 * Simple Image Gallery
 * 
 * @namespace LUNGO.Sugar
 * @class simpleGallery
 *
 * @author Hugo Habel <hugohabel@gmail.com> || @hugohabel
 */

LUNGO.Sugar.SimpleGallery = (function(lng, undefined) {

    // Internal options
    var _options = [];

    // Aux vars
    var _imgs = [];             // Images collection
    var _imgsCount = null;      // Number of images
    var _currentIndex = null;   // Current image number
    var _currentImg = null;     // Current image

    // Selectors
    var SELECTOR = {
        BODY : 'body',
        SECTION : '#main',
        SIMPLEGALLERY : '.simpleGallery',
        IMGS : '.simpleGallery img'
    }

    // CSS Classes
    var CSS_CLASS = {
        ACTIVE  : 'simpleGalleryactive',
        ANIMATE : 'simpleGalleryanimate',
        INACTIVE: 'simpleGalleryinactive'
    }

    // Sugar HTML
    var MARKUP_SIMPLEGALLERY = '<div class="simpleGallery"></div>';

    // Init Method
    var _init = function() {
        $(SELECTOR.BODY).append(MARKUP_SIMPLEGALLERY);
        _subscribeEvents();
    };

    // Show Method
    var show = function(imgs) {
        var gallery = $(SELECTOR.SIMPLEGALLERY);                // Get the gallery container
        for ( var i = 0, len = imgs.length; i < len; i++ ) {    // Create the img tags and populate the gallery
            var img = document.createElement('img');
            img.src = imgs[i];
            gallery.append(img);
        }
        _imgs = $(SELECTOR.IMGS);
        _imgsCount = _imgs.length;
        _currentIndex = _imgs.length;
        $(_imgs[_currentIndex-1]).attr('class', CSS_CLASS.ACTIVE);      // Set the active image
    };

    // Register the events
    var _subscribeEvents = function() {
        $(SELECTOR.SIMPLEGALLERY).bind('click', function() {
            _currentImg = $('.' + CSS_CLASS.ACTIVE);            // Get the current image
            _currentImg.attr('class', CSS_CLASS.ANIMATE);       // Animate
            setTimeout(
                function() { 
                    _currentImg.attr('class', CSS_CLASS.INACTIVE);
                }, 
                1000
            );
            // Get the next image in the gallery
            if ( _currentIndex == 1 ) {
                _currentIndex = _imgsCount;
            } else {
                _currentIndex--;
            }
            $(_imgs[_currentIndex-1]).attr('class', CSS_CLASS.ACTIVE);  // Set the next image as active
        });
    };
    
    _init();    // Initializes the sugar

    return {
        show: show
    }
})(LUNGO);