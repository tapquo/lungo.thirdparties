/**
 * GMap Manager
 *
 * @namespace Lungo.Sugar.Gmap
 * @class Route
 * @version 1.0
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Sugar.GMap.Route = (function(lng, undefined) {

    var TRAVEL_MODES = {
        WALKING: 'WALKING',
        DRIVING: 'DRIVING',
        BICYCLING: 'BICYCLING'
    };

    var _instance = {
        service: null,
        directions: null,
        route: null,
        instructions: null,
        markers: {
            icons: [],
            pointers: []
        }
    };

    var _that = Lungo.Sugar.GMap;
    var _callback = null;


    /**
     *
     */
    var init = function(from, to, travel_mode, markers, callback) {
        _callback = callback || null;

        _saveMarkers(from, to, markers);

        _instance.route = null;
        _instance.instructions = null;
        _instance.service = _instance.service || new google.maps.DirectionsService();
        _instance.service.route(
            {
                origin: _that.Interface.LatLng(from),
                destination: _that.Interface.LatLng(to),
                travelMode: (travel_mode !== undefined) ? TRAVEL_MODES[travel_mode] : TRAVEL_MODES.DRIVING
            },
            function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    _generateRouteInMap(response);
                }
            }
        );
    };

    /**
     *
     */
    var clean = function() {
        if (_instance.renderer) {
            _instance.renderer.setMap(null);

            for (var i = 0, len = _instance.markers.pointers.length; i < len; i++) {
                _instance.markers.pointers[i].setMap(null);
            }
            _instance.markers.pointers = [];
        }
    };

    /**
     *
     */
     var instructions = function() {
        var instructions = {};

        if (_instance.instructions) {
            instructions.distance = _instance.instructions.distance.text;
            instructions.duration = _instance.instructions.duration.text;
            instructions.steps = _createSteps();
        }

        return instructions;
    };

    var _generateRouteInMap = function(route) {
        _instance.route = route;
        _instance.instructions = route.routes[0].legs[0];

        clean();
        _instance.renderer = new google.maps.DirectionsRenderer({
            suppressMarkers: (_instance.markers.icons) ? true : false
        });
        _instance.renderer.setMap(_that.instance());
        _instance.renderer.setDirections(_instance.route);

        _drawMarkers();
        _applyCallback();
    };

    var _createSteps = function() {
        var steps = [];

        for (index in _instance.instructions.steps) {
            var step = _instance.instructions.steps[index];

            steps.push({
                distance: step.distance.text,
                duration: step.duration.text,
                instructions: step.instructions
            });
        };

        return steps;
    };

    var _saveMarkers = function(from, to, markers) {
        _instance.markers.icons = markers;
        _instance.markers.from = from;
        _instance.markers.to = to;
    };

    var _drawMarkers = function() {
        if (_instance.markers.icons) {
            _createMarker(_instance.markers.from, _instance.markers.icons.from);
            _createMarker(_instance.markers.to, _instance.markers.icons.to);
        }
    };

    var _createMarker = function(position, icons) {
        var marker = _that.addMarker(position, icons || null);
        _instance.markers.pointers.push(marker);
    };

    var _applyCallback = function() {
        if (_callback) {
            _callback.apply(_callback);
        }
    };

    return {
        init: init,
        clean: clean,
        instructions: instructions
    }

})(Lungo);
