/**
 * QR Encoder
 *
 * @namespace Lungo.Sugar
 * @class QR
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Sugar.QR = (function(lng, undefined) {

    var GOOGLE_SERVICE = 'http://chart.googleapis.com/chart?cht=qr';

    var encode = function(el, data, level, size) {
        var element = lng.dom(el);

        if (element) {
            var url = _generateUrl(data, level, size);
            element.append('<img src="' + url + '">');
        }
    };

    _generateUrl = function(data, level, size) {
        var url = GOOGLE_SERVICE;
        url += _data(data);
        url += _size(size);
        url += _level(level);

        return url;
    };

    _data = function(data) {
        return '&chl=' + data;
    };

    _size = function(size) {
        return '&chs=' + size + 'x' + size;
    };

    _level = function(level) {
        var default_level = 'L';
        return '&chld=' + default_level + '|0';
    };

    return {
        encode: encode
    }

})(Lungo);
