/**
 * Input AutoComplete
 *
 * @namespace Lungo.Sugar
 * @class AutoComplete
 * @version 1.0
 *
 * @author Mark Bradshaw <mbradshaw@americanbible.org>
 */

Lungo.Sugar.AutoComplete = function() {
	var 
		_el, _results_el, _choices, _place_holder
		_result_item_tag = 'li'
		;

	var init = function(options) {
		if (!(options.el && options.results_el)) {
			console.error('AutoComplete needs more to get setup.');
			return;
		}

		_el = options.el;
		_results_el= options.results_el;

		if (options.result_item_tag) {
			_result_item_tag = options.result_item_tag;
		}

		if (options.choices) {
			_choices = options.choices;
		}

		_el.on('keyup', lookup);
	}

	var setChoices = function(data) {
		_choices = data;
	}
	var getChoices = function() {
		return _choices;
	}

	var lookup = function(e) {
		e.stopPropagation();
		e.preventDefault();

		//13 = enter, 38 = up, 40 = down
		if (e.keyCode === 13) {
			return;
		}

		_results_el.empty();

		if (_el.val() != '') {
			var val = _el.val().toLowerCase();

			for (var i=0, length = _choices.length; i < length; i++) {
				if (_choices[i].toLowerCase().indexOf(val) == 0) {
					var item = _results_el.append('<' + _result_item_tag + '>' + _choices[i] + '</' + _result_item_tag + '>');
				}
			}

			_results_el.find(_result_item_tag).tap(tap);
		}
	}

	var tap = function(e) {
		_el.val(e.currentTarget.textContent);
		_results_el.empty();
	}

	return {
		init: init,
		getChoices: getChoices,
		setChoices: setChoices
	}

}