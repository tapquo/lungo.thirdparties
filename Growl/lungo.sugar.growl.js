/**
 * Growl Notification system in CSS3
 *
 * @namespace LUNGO.Sugar
 * @class Growl
 * @version 1.2
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Sugar.Growl = (function(lng, undefined) {
    var _options = [];

    var SELECTOR = {
        BODY: 'body',
        GROWL: '.growl',
        MODAL: '.growl .modal',
        NOTIFY: '.growl .notify',
        MODAL_HREF: '.growl .modal a'
    }

    var CSS_CLASS = {
        VISIBLE: 'visible',
        SHOW: 'show',
        WORKING: 'working',
        INPUT: 'input'
    }

    var CALLBACK_HIDE = 'LUNGO.Sugar.Growl.hide()';
    var MARKUP_GROWL = '<div class="growl"><div class="modal"></div><div class="notify"></div></div>';

    /**
     *
     */
    var show = function(title, description, icon, animate, seconds, callback) {
        _instance(true);

        var modal = _modalInstance(animate);
        modal.html('<span class="icon ' + icon + '"></span><strong>' + title + '</strong><small>' + description + '</small>');
        setTimeout(function() {
            modal.addClass(CSS_CLASS.SHOW);
        }, 100);

        _auto_hide(seconds, callback);
    };

    /**
     *
     */
    var hide = function() {
        _hide_children();

        setTimeout(function() {
            lng.dom(SELECTOR.GROWL).style('display', 'none');
        }, 300);
    };

    /**
     *
     */
    var notify = function(title, description, icon, type, seconds, callback) {
        _instance(false);

        var notify = lng.dom(SELECTOR.NOTIFY);
        notify.addClass(type || 'info');
        notify.html('<span class="icon ' + icon + '"></span><strong>' + title + '</strong><br/><small>' + description + '</small>');

        setTimeout(function() {
            notify.addClass(CSS_CLASS.SHOW);
        }, 300);

        _auto_hide(seconds, callback);
    };

    /**
     *
     */
    var option = function(title, options) {
        _instance(true);

        _options = options;
        var buttons = _createButtons(options);


        var modal = lng.dom(SELECTOR.MODAL);
        modal.removeClass(CSS_CLASS.WORKING).removeClass(CSS_CLASS.SHOW);
        modal.addClass('input').html('<strong>' + title + '</strong>' + buttons).show();

        setTimeout(function(){
            modal.addClass('show');
        }, 100);
    };

    /**
     *
     */
    var html = function(html, closable, callback) {
        html += (closable) ? '<span class="icon close"></span>' : '';

        _instance(true);

        var modal = _modalInstance(false);
        modal.html(html).addClass('url');
        setTimeout(function() {
            modal.addClass(CSS_CLASS.SHOW);
        }, 100);

        _auto_hide(0, callback);
    };


    var _init = function() {
        lng.dom(SELECTOR.BODY).append(MARKUP_GROWL);
        _subscribeEvents();
    };

    var _instance = function(modal) {
        var growl = lng.dom(SELECTOR.GROWL);

        growl.style('display') === 'none' && growl.show();
        modal && growl.addClass('modal');
    };

    var _modalInstance = function(animate) {
        var modal = lng.dom(SELECTOR.MODAL);
        modal.removeClass(CSS_CLASS.SHOW);
        modal.removeClass(CSS_CLASS.INPUT);

        _animate(modal, animate);

        return modal;
    };

    var _animate = function(element, animate) {
        if (animate) {
            element.addClass(CSS_CLASS.WORKING);
        }
        else {
            element.removeClass(CSS_CLASS.WORKING);
        }
    };

    var _createButtons = function(options) {
        var buttons = '';
        for (var i = 0, len = options.length; i < len; i++) {
            buttons += _option_button(options[i].color, 'growl_option_' + i, options[i].icon, options[i].name);
        };

        return buttons;
    };

    var _option_button = function(color, id, icon, label) {
        id = (id !== undefined) ? 'id="' + id + '"' : '';
        return '<a href="#" ' + id + ' class="button ' + color + '"><span class="icon ' + icon + '"></span>' + label + '</a>';
    };

    var _auto_hide = function(seconds, callback) {
        if (seconds != undefined && seconds != 0) {
            if (callback === undefined) {
                callback = CALLBACK_HIDE;
            }
            setTimeout(callback, seconds * 1000);
        }
    };

    var _hide_children = function() {
        _hide_child(SELECTOR.MODAL);
        _hide_child(SELECTOR.NOTIFY);
    };

    var _hide_child = function(selector) {
        var child = lng.dom(selector);
        if (child.hasClass(CSS_CLASS.SHOW)) {
            child.removeClass(CSS_CLASS.SHOW);
        }
    };

    var _subscribeEvents = function() {
        lng.dom(SELECTOR.NOTIFY).bind('click', function() {
            lng.dom(SELECTOR.NOTIFY).removeClass(CSS_CLASS.SHOW);
        });

        lng.dom('.growl .modal.input a, .growl .modal .close').tap(function(event) {
            if (lng.dom(this).attr('id')) {
                id = lng.dom(this).attr('id').replace(/growl_option_/g, '');
                setTimeout(_options[id].callback, 100);
            } else {
                event.preventDefault();
                hide();
                return false;
            }
        });
    };

    _init();

    return {
        show: show,
        hide: hide,
        notify: notify,
        option: option,
        html: html
    }
})(LUNGO);