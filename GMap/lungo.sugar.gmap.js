/**
 * GMap Manager
 *
 * @namespace Lungo.Sugar
 * @class GMap
 * @version 1.0
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Sugar.GMap = (function(lng, undefined) {

    var DEFAULT_OPTIONS_GMAPS_STATIC = {
        sensor: false,
        mobile: true
    };
    var GMAPS_STATIC_URL = 'http://maps.google.com/maps/api/staticmap'
    var _instance = null;
    var _instance_markers = [];

    /**
     *
     */
    var init = function(options) {
        var element = lng.dom(options.el);

        if (element.length > 0) {
            _instance = this.Interface.Map(element[0], options);
        } else {
            console.error('Imposible');
        }
    };

    /**
     *
     */
    var instance = function() {
        return _instance;
    };

    /**
     *
     */
     var clean = function() {
        _cleanMarkers();
        this.Route.clean();
    };

    /**
     *
     */
    var center = function(position) {
        _instance.setCenter(this.Interface.LatLng(position));
    };

    /**
     *
     */
    var zoom = function(level) {
        _instance.setZoom(level);
    };

    /**
     *
     */
    var addMarker = function(position, icon, animate) {
        if (position) {
            var marker = new google.maps.Marker({
                map: _instance,
                icon: this.Interface.MarkerIcon(icon),
                animation: google.maps.Animation.DROP,
                position: this.Interface.LatLng(position)
            });

            if (animate) {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }

            _instance_markers.push(marker);
        }

        return marker;
    };

    /**
     *
     */
    var image = function(options) {
        var element = lng.dom(options.el);

        if (element.length > 0) {
            var options = lng.Core.mix(DEFAULT_OPTIONS_GMAPS_STATIC, options);

            var environment = $$.environment();
            options.size = environment.screen.width + 'x' + environment.screen.height;

            options.center = options.center.latitude + ',' + options.center.longitude;
            options.markers = options.center;
            delete options.el;

            var url = GMAPS_STATIC_URL + $$.serializeParameters(options);
            element.html('<img src="' + url + '"/>');
        }
    };

    var _cleanMarkers = function() {
        for (var i = 0, len = _instance_markers.length; i < len; i++) {
            _instance_markers[i].setMap(null);
        }
        _instance_markers = [];
    };

    return {
        init: init,
        image: image,
        instance: instance,
        clean: clean,
        center: center,
        zoom: zoom,
        addMarker: addMarker
    }

})(Lungo);
