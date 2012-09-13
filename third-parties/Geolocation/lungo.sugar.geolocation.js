/**
 * Geolocation A Google Maps-based geolocation sugar
 *
 * @namespace Lungo.Sugar
 * @class Geolocation
 *
 * @author Gabriel Ferreiro Blazetic <gbril9119@gmail.com> || @garolard
 */

Lungo.Sugar.Geolocation = (function(lng, undefined) {

	var _container;
	var _latlng;
	var _map;
	var _userPosition = false;
	var _markers = false;

	var _onSuccess = function(position) {
		_latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var opt = {
			zoom: 15,
			center: _latlng,
			disableDefaultUI: true,
			MapTypeId: google.maps.MapTypeId.ROADMAP
		};

		_map = new google.maps.Map(_container, opt);

		if(_userPosition) {

			var image = new google.maps.MarkerImage(
			  '../assets/images/blue_dot.png',
			  new google.maps.Size(18,18),
			  new google.maps.Point(0,0),
			  new google.maps.Point(9,18)
			);


			var shape = {
			  coord: [15,1,16,2,16,3,17,4,17,5,17,6,17,7,17,8,17,9,17,10,17,11,17,12,17,13,16,14,16,15,15,16,2,16,1,15,1,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,1,3,1,2,2,1,15,1],
			  type: 'poly'
			};

			var marker = new google.maps.Marker({
			position: _latlng,
			map: _map,
			title: 'Aquí estás tu',
			icon:image,
			shape:shape
			});
		}

		if(_markers != false){
			for(index in _markers){

				var latLng = new google.maps.LatLng(_markers[index].lat,_markers[index].lng);
				var marker = new google.maps.Marker({
				position: latLng,
				map: _map,
				title: _markers[index].title
				});
			}
		}

	};

	var _onError = function(err) {
		if(err.code == 1) {
			alert("Acceso denegado");
		} else if(err.code == 2) {
			alert("No se puede conseguir localización");
		}
	};

	var setMap = function(container, userPosition, markers) {
		if(userPosition){_userPosition = true;}
		if(markers != false){_markers = markers;}
		_container = document.getElementById(container);
		navigator.geolocation.getCurrentPosition(_onSuccess, _onError);
	};

	return {
		setMap: setMap
	}

})(Lungo);
