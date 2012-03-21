/**
 * Talk Manager
 *
 * @namespace LUNGO.Sugar
 * @class Talk
 * @version 1.0
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Sugar.Talk = (function(lng, undefined) {

    var TEMPLATE_NAME = 'sugar-talk-tmp';

    /**
     *
     */
    var init = function(options) {
        lng.View.Template.create(TEMPLATE_NAME, '<li class="talk {{me}}">\
            <img src="{{thumb}}" />\
            <span class="who">{{who}}<span class="timestamp">{{timestamp}}</span></span>\
            <span class="message">{{message}}</small>\
        </li>');
    };

    /**
     *
     */
    var create = function(container, data) {
        lng.View.Template.List.create({
            el: container,
            template: TEMPLATE_NAME,
            data: data
        });
    };

    /**
     *
     */
    var append = function(container, data) {
        lng.View.Template.List.append({
            el: container,
            template: TEMPLATE_NAME,
            data: data
        });
        lng.View.Scroll.last(container);
    };

    init();

    return {
        init: init,
        create: create,
        append: append
    }

})(LUNGO);