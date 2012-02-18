/**
 * GMap Manager
 *
 * @namespace LUNGO.Sugar.Gmap
 * @class Route
 * @version 1.0
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Sugar.GMap.Route = (function(lng, undefined) {

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

    var _that = LUNGO.Sugar.GMap;
    var _callback = null;

    /**
     *
     */
    var init = function(from, to, markers, callback) {
        _callback = callback || null;

        _instance.route = null;
        _instance.instructions = null;
        _instance.markers.icons = markers;
        _instance.service = _instance.service || new google.maps.DirectionsService();
        _instance.service.route(
            {
                origin: _that.Interface.LatLng(from),
                destination: _that.Interface.LatLng(to),
                travelMode: google.maps.TravelMode.DRIVING
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

    var _drawMarkers = function() {
        if (_instance.markers.icons) {
            _that.addMarker(
                {
                    latitude: _instance.instructions.start_location.Qa,
                    longitude: _instance.instructions.start_location.Ra
                },
                _instance.markers.icons.from || null
            );

            _that.addMarker(
                {
                    latitude: _instance.instructions.end_location.Qa,
                    longitude: _instance.instructions.end_location.Ra
                },
                _instance.markers.icons.to || null
            );
        }
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

})(LUNGO);