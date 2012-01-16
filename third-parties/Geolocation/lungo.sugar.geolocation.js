/**
 * Geolocation A Google Maps-based geolocation sugar
 *
 * @namespace LUNGO.Sugar
 * @class Geolocation
 *
 * @author Gabriel Ferreiro Blazetic <gbril9119@gmail.com> || @garolard
 */

LUNGO.Sugar.Geolocation = (function(lng, undefined) {

	var _container;
	var _latlng;
	var _map;
	var _marker = false;

	var _onSuccess = function(position) {
		_latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var opt = {
			zoom: 15,
			center: _latlng,
			disableDefaultUI: true,
			MapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		_map = new google.maps.Map(_container, opt);
		
		if(_marker) {
			var marker = new google.maps.Marker({
			position: _latlng,
			map: _map,
			title: 'Aquí estás tu'
			});
		}
		
	};
	
	var _onError = function(err) {
		if(err.code == 1) {
			alert("Acceso denegado");
		} else if(err.code == 2) {
			alert("No se puede conseguir localización");
		}
	};
	
	var setMap = function(container, marker) {
		if(marker){_marker = true;}
		_container = document.getElementById(container);
		navigator.geolocation.getCurrentPosition(_onSuccess, _onError);
	};
	
	return {
		setMap: setMap
	}

})(LUNGO);
