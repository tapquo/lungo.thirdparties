/** 
 * Player audio files (.mp3, .wav and .ogg)
 * 
 * @namespace LUNGO.Sugar
 * @class Sound
 *
 * @author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
 */

LUNGO.Sugar.Sound = (function(lng, undefined) {
    var _background = document.createElement('audio');
    var _sound = document.createElement('audio');

    /**
    * Plays music in background with automatic rewind.
    *
    * @method background
    *
    * @param  {string} Source of sound file
     */
    var background = function(source) {
        if (source) {
            _setSourceAndPlay(_sound, source);
            _background.addEventListener('ended', function(){
                this.currentTime = 0;
            }, false);
        }
        else {
            _background.pause();
        }
    };

    /**
    * Play a given sound
    *
    * @method play
    *
    * @param  {string} Source of sound file
     */
    var play = function(source) {
        _setSourceAndPlay(_sound, source);
    };

    _setSourceAndPlay = function(container, source) {
        container.setAttribute('src', source);
        container.play();
    };

    return {
        background: background,
        play: play
    }
})(LUNGO);