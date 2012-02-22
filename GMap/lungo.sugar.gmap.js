/**
 * GMap Manager
 *
 * @namespace LUNGO.Sugar
 * @class GMap
 * @version 1.0
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Sugar.GMap = (function(lng, undefined) {

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

    var _cleanMarkers = function() {
        for (var i = 0, len = _instance_markers.length; i < len; i++) {
            _instance_markers[i].setMap(null);
        }
        _instance_markers = [];
    };

    return {
        init: init,
        instance: instance,
        clean: clean,
        center: center,
        zoom: zoom,
        addMarker: addMarker
    }

})(LUNGO);