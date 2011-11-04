/** 
 * Geolocation API (HTML5) Wrapper
 * 
 * @namespace LUNGO.Sugar
 * @class Gps
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Sugar.Gps = (function(lng, undefined) {
    var _position = null;
    var _watcher = null;

    var CALLBACK = {
        success: null,
        error: null
    };

    /**
     *
     *
     *
     *
     */
    var get = function(callbacks) {
        if (_isReady()) {
            _bindCallbacks(callbacks);
            navigator.geolocation.getCurrentPosition(_success, _error);
        }
    };

    /**
     *
     *
     *
     *
     */
    var watch = function(callbacks, options) {
        if (_isReady()) {
            _bindCallbacks(callbacks);
            _watcher = navigator.geolocation.watchPosition(_success, _error);
        }
    };

    /**
     *
     *
     *
     *
     */
    var position = function() {
        return _position;
    };

    /**
     *
     *
     *
     *
     */
    var address = function(latitude, longitude, callback) {
        // @todo: Check Social Analytics RESTful >> 
    };

    var _isReady = function() {
        if (navigator.geolocation) {
            _clearPosition();
            return true;
        } else {
            lng.core.log(3, 'Sugar.Gps >> ERROR: navigator.geolocation is innacesible.')
            return false;
        }
    };

    var _clearPosition = function() {
        _position = null;

        if (_watcher) {
            navigator.geolocation.clearWatch(_watcher);
            _watcher = null;
        }
    };

    var _bindCallbacks = function(callbacks) {
        CALLBACK.success = (callbacks.success || null);
        CALLBACK.error = (callbacks.error || null);
    };

    var _success = function(position) {
        _position = position.coords;
        _callback(CALLBACK.success);
    };

    var _error = function(error) {
        console.error(error);
        _clearPosition();
        _callback(CALLBACK.error);
    };

    var _callback = function(callback) {
        if (lng.Core.toType(callback) === "function") {
            callback();
        }
    };

    return {
        get: get,
        watch: watch,
        position: position,
        address: address
    }

})(LUNGO);