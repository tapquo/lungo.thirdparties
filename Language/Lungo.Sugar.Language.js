/**
 * Description or Responsability
 *
 * @namespace Lungo.Sugar
 * @class Language
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

Lungo.Sugar.Language = (function(lng, undefined) {
    var _languages = {};
    var _i18n = null;

    /**
     *
     *
     *
     *
     */
    var create = function(i18n, language) {
        _languages[i18n] = language;
    };

    /**
     *
     *
     *
     *
     */
    var get = function(i18n) {
        if (_languages[i18n]) {
            _i18n = i18n;
        }
    };

    /**
     *
     *
     *
     *
     */
    var label = function(key) {
        return _languages[_i18n][key];
    };

    return {
        create: create,
        get: get,
        label: label
    }

})(Lungo);
