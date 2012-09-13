/**
 * socket.io implementation in Lungo.JS
 *
 * @namespace Lungo.Sugar
 * @class Socket_IO
 * @version 0.0
 *
 * @author Braulio Valdivielso Martínez < yo@brauliovaldivielso.eu > || @bvaldivielso
 */

Lungo.Sugar.Socket_IO = (function(lng, io) {
	var _socket;
	var connect = function(url, options){
		_socket = io.connect(url, options);
	};

	var on = function(event_name, callback){
		_socket.on(event_name, callback);
	};

	var emit = function(event_name, data){
		_socket.emit(event_name, data);
	};

	var disconnect = function(){
		_socket.disconnect();
	};

	return {
		connect : connect,
		on : on,
		emit : emit,
		disconnect : disconnect
	};
})(Lungo, io);
