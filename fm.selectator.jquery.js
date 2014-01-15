/*
 Selectator jQuery Plugin
 A plugin for select elements
 version 1.0, Dec 10th, 2013
 by Ingi P. Jacobsen

 The MIT License (MIT)

 Copyright (c) 2013 Faroe Media

 Permission is hereby granted, free of charge, to any person obtaining a copy of
 this software and associated documentation files (the "Software"), to deal in
 the Software without restriction, including without limitation the rights to
 use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function($) {
	$.selectator = function (element, options) {
		var defaults = {
			prefix: 'selectator_',
			height: 'auto',
			useDimmer: false,
			showAllOptionsOnFocus: false,
			searchCallback: function(){},
			labels: {
				search: 'Search...'
			}
		};
	
		var plugin = this;
		var multiple = $(element).attr('multiple') !== undefined;
		var selected_index = multiple ? -1 : 0;
		var box_element = null;
		var chosenitems_element = null;
		var input_element = null;
		var textlength_element = null;
		var options_element = null;
		var key = {
			backspace: 8,
			enter: 13,
			escape: 27,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		plugin.settings = {};

		
		
		// INITIALIZE PLUGIN
		plugin.init = function () {
			plugin.settings = $.extend({}, defaults, options);

			//// ================== CREATE ELEMENTS ================== ////
			// dimmer
			if (plugin.settings.useDimmer) {
				if ($('#' + plugin.settings.prefix + 'dimmer').length === 0) {
					var dimmer_element = document.createElement('div');
					$(dimmer_element).attr('id', plugin.settings.prefix + 'dimmer');
					$(dimmer_element).hide();
					$(document.body).prepend(dimmer_element);
				}
			}
			// box element
			box_element = document.createElement('div');
			if (element.id !== undefined) {
				$(box_element).attr('id', plugin.settings.prefix + element.id);
			}
			$(box_element).addClass('selectator ' + (multiple ? 'multiple ' : 'single ') + 'options-hidden');
			$(box_element).css({
				width: $(element).css('width'),
				padding: $(element).css('padding'),
				position: 'relative'
			});
			if (plugin.settings.height === 'element') {
				$(box_element).css({
					height: $(element).outerHeight() + 'px'
				});
			}
			$(element).after(box_element);
			$(element).hide();
			// textlength element
			textlength_element = document.createElement('span');
			$(textlength_element).addClass(plugin.settings.prefix + 'textlength');
			$(textlength_element).css({
				position: 'absolute',
				visibility: 'hidden'
			});
			$(box_element).append(textlength_element);
			// chosen items element
			chosenitems_element = document.createElement('div');
			$(chosenitems_element).addClass(plugin.settings.prefix + 'chosen_items');
			$(box_element).append(chosenitems_element);
			// input element
			input_element = document.createElement('input');
			$(input_element).addClass(plugin.settings.prefix + 'input');
			if (!multiple) {
				$(input_element).attr('placeholder', plugin.settings.labels.search);
				$(input_element).css('width', 'calc(100% - 30px)');
			} else {
				$(input_element).width(20);
			}
			$(input_element).attr('autocomplete', 'false');
			$(box_element).append(input_element);
			// options element
			options_element = document.createElement('ul');
			$(options_element).addClass(plugin.settings.prefix + 'options');

			$(box_element).append(options_element);

			//// ================== BIND ELEMENTS EVENTS ================== ////
			// source element
			$(element).change(function () {
				plugin.refreshSelectedOptions();
			});
			// box element
			$(box_element).bind('focus', function (e) {
				e.preventDefault();
				e.stopPropagation();
				showOptions();
				$(input_element).focus();
			});
			$(box_element).bind('mousedown', function (e) {
				e.preventDefault();
				e.stopPropagation();
				input_element.focus();
				if (input_element.setSelectionRange) {
					input_element.focus();
					input_element.setSelectionRange(input_element.value.length, input_element.value.length);
				} else if (input_element.createTextRange) {
					var range = input_element.createTextRange();
					range.collapse(true);
					range.moveEnd('character', input_element.value.length);
					range.moveStart('character', input_element.value.length);
					range.select();
				}
			});
			$(box_element).bind('mouseup', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$(box_element).bind('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (!multiple || plugin.settings.showAllOptionsOnFocus) {
					//showOptions();
					search();
				}
				input_element.focus();
			});
			$(box_element).bind('dblclick', function (e) {
				e.preventDefault();
				e.stopPropagation();
				input_element.focus();
				input_element.select();
			});
			// input element
			$(input_element).bind('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$(input_element).bind('dblclick', function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$(input_element).bind('keydown', function (e) {
				e.stopPropagation();
				var keyCode = e.keyCode || e.which;
				switch (keyCode) {
					case key.up:
						e.preventDefault();
						if (selected_index > (multiple ? -1 : 0)) {
							selected_index = selected_index - 1;
						} else {
							selected_index = $(options_element).find('.' + plugin.settings.prefix + 'option').length - 1;
						}
						refreshActiveOption();
						scrollToActiveOption();
						break;
					case key.down:
						e.preventDefault();
						if (selected_index < $(options_element).find('.' + plugin.settings.prefix + 'option').length - 1) {
							selected_index = selected_index + 1;
						} else {
							selected_index = (multiple ? -1 : 0);
						}
						refreshActiveOption();
						scrollToActiveOption();
						break;
					case key.escape:
						e.preventDefault();
						break;
					case key.enter:
						e.preventDefault();
						if (selected_index !== -1) {
							selectOption();
						} else {
							if ($(input_element).val() !== '') {
								plugin.settings.searchCallback();
							}
						}
						resizeInput();
						break;
					case key.backspace:
						if (input_element.value === '') {
							$(element).find('option:selected').last()[0].selected = false;
							$(element).trigger('change');
							plugin.refreshSelectedOptions();
							search();
						}
						resizeInput();
						break;
					default:
						resizeInput();
						break;
				}
			});
			$(input_element).bind('keyup', function (e) {
				e.preventDefault();
				e.stopPropagation();
				var keyCode = e.keyCode || e.which;
				if (keyCode === key.escape || keyCode === key.enter) {
					hideOptions();
				} else if (keyCode < 37 || keyCode > 40) {
					search();
				}
				if ($(box_element).hasClass('options-hidden') && (keyCode === key.left || keyCode === key.right || keyCode === key.up || keyCode === key.down)) {
					search();
				}
			});
			$(input_element).bind('focus', function (e) {
				e.preventDefault();
				e.stopPropagation();
				if (!$(options_element).is(':empty') || !multiple || plugin.settings.showAllOptionsOnFocus) {
					search();
					showOptions();
				}
			});
			$(input_element).bind('blur', function (e) {
				e.preventDefault();
				e.stopPropagation();
				hideOptions();
			});
			plugin.refreshSelectedOptions();
		};



		// RESIZE INPUT
		var resizeInput = function () {
			textlength_element.innerHTML = input_element.value;
			if (multiple) {
				$(input_element).css({ width: ($(textlength_element).width() + 20) + 'px' });
			}
		};



		// REFRESH SELECTED OPTIONS
		plugin.refresh = function () {
			plugin.refreshSelectedOptions();
		};
		plugin.refreshSelectedOptions = function () {
			$(chosenitems_element).empty();
			$(element).find('option').each(function () {
				if (this.selected) {
					var item_element = document.createElement('div');
					$(item_element).addClass(plugin.settings.prefix + 'chosen_item');
					//$(item_element).html($(this).html());

					// left
					if ($(this).data('left') !== undefined) {
						var left_element = document.createElement('div');
						$(left_element).addClass(plugin.settings.prefix + 'chosen_item_left').html($(this).attr('data-left'));
						$(item_element).append(left_element);
					}
					// right
					if ($(this).data('right') !== undefined) {
						var right_element = document.createElement('div');
						$(right_element).addClass(plugin.settings.prefix + 'chosen_item_right').html($(this).attr('data-right'));
						$(item_element).append(right_element);
					}
					// title
					var title_element = document.createElement('div');
					$(title_element).addClass(plugin.settings.prefix + 'chosen_item_title').html($(this).html());
					$(item_element).append(title_element);
					// subtitle
					if ($(this).data('subtitle') !== undefined) {
						var subtitle_element = document.createElement('div');
						$(subtitle_element).addClass(plugin.settings.prefix + 'chosen_item_subtitle').html($(this).attr('data-subtitle'));
						$(item_element).append(subtitle_element);
					}
					// remove button
					var button_remove_element = document.createElement('div');
					$(button_remove_element).data('element', this);
					$(button_remove_element).addClass(plugin.settings.prefix + 'chosen_item_remove');
					$(button_remove_element).bind('mousedown', function (e) {
						e.preventDefault();
						e.stopPropagation();
					});
					$(button_remove_element).bind('mouseup', function (e) {
						e.preventDefault();
						e.stopPropagation();
						$(this).data('element').selected = false;
						$(element).trigger('change');
						plugin.refreshSelectedOptions();
					});
					$(button_remove_element).html('X');
					$(item_element).append(button_remove_element);
					// clear
					var clear_element = document.createElement('div');
					clear_element.style.clear = 'both';
					$(item_element).append(clear_element);

					$(chosenitems_element).append(item_element);
				}
			});
			search();
		};



		// OPTIONS SEARCH METHOD
		var search = function () {
			$(options_element).empty();
			if (input_element.value.replace(/\s/g, '') !== '' || !multiple || plugin.settings.showAllOptionsOnFocus) {
				var optionsArray = [];
				$(element).children().each(function () {
					if ($(this).prop('tagName').toLowerCase() === 'optgroup') {
						var group = this;
						if ($(group).children('option').length !== 0) {
							var hasMatches = false;
							$(group).children('option').each(function () {
								if ((!this.selected || !multiple) && $(this).html().toLowerCase().indexOf(input_element.value.toLowerCase()) !== -1) {
									hasMatches = true;
								}
							});
							if (hasMatches) {
								var groupOptionsArray = [];
								$(group).children('option').each(function () {
									if ((!this.selected || !multiple) && $(this).html().toLowerCase().indexOf(input_element.value.toLowerCase()) !== -1) {
										groupOptionsArray.push({
											type: 'option',
											text: $(this).html(),
											element: this
										});
									}
								});
								optionsArray.push({
									type: 'group',
									text: $(group).attr('label'),
									options: groupOptionsArray,
									element: group
								});
							}
						}
					} else {
						if ($(this).html().toLowerCase().indexOf(input_element.value.toLowerCase()) !== -1) {
							if (!this.selected || !multiple) {
								optionsArray.push({
									type: 'option',
									text: $(this).html(),
									element: this
								});
							}
						}
					}
				});
				generateOptions(optionsArray);
			}
			if ($(input_element).is(':focus')) {
				if (!$(options_element).is(':empty') || !multiple || plugin.settings.showAllOptionsOnFocus) {
					showOptions();
				} else {
					hideOptions();
				}
			} else {
				hideOptions();
			}
			if (multiple) {
				selected_index = -1;
			}

		};

		// GENERATE OPTIONS
		var generateOptions = function (optionsArray) {
			var index = -1;
			$(optionsArray).each(function () {
				if (this.type === 'group') {
					var group_header_element = document.createElement('li');
					$(group_header_element).addClass(plugin.settings.prefix + 'group_header');
					$(group_header_element).html($(this.element).attr('label'));
					$(options_element).append(group_header_element);

					var group = document.createElement('ul');
					$(group).addClass(plugin.settings.prefix + 'group');
					$(options_element).append(group);

					$(this.options).each(function () {
						index++;
						var option = createOption.call(this.element, index);
						$(group).append(option);
					});

					$(options_element).append(group);
				} else {
					index++;
					var option = createOption.call(this.element, index);
					$(options_element).append(option);
				}
			});
			if (multiple) {
				refreshActiveOption();
			}
		};

		// CREATE RESULT OPTION
		var createOption = function (index) {
			// holder li
			var option = document.createElement('li');
			$(option).data('index', index);
			$(option).data('element', this);
			$(option).addClass(plugin.settings.prefix + 'option');
			if (this.selected) {
				$(option).addClass('active');
			}
			// left
			if ($(this).data('left') !== undefined) {
				var left_element = document.createElement('div');
				$(left_element).addClass(plugin.settings.prefix + 'option_left').html($(this).attr('data-left'));
				$(option).append(left_element);
			}
			// right
			if ($(this).data('right') !== undefined) {
				var right_element = document.createElement('div');
				$(right_element).addClass(plugin.settings.prefix + 'option_right').html($(this).attr('data-right'));
				$(option).append(right_element);
			}
			// title
			var title_element = document.createElement('div');
			$(title_element).addClass(plugin.settings.prefix + 'option_title').html($(this).html());
			$(option).append(title_element);
			// subtitle
			if ($(this).data('subtitle') !== undefined) {
				var subtitle_element = document.createElement('div');
				$(subtitle_element).addClass(plugin.settings.prefix + 'option_subtitle').html($(this).attr('data-subtitle'));
				$(option).append(subtitle_element);
			}
			// clear
			var clear_element = document.createElement('div');
			clear_element.style.clear = 'both';
			$(option).append(clear_element);

			// BIND EVENTS
			$(option).bind('mouseover', function (e) {
				e.stopPropagation();
				e.preventDefault();
				selected_index = index;
				refreshActiveOption();
			});
			$(option).bind('mousedown', function (e) {
				e.stopPropagation();
				e.preventDefault();
			});
			$(option).bind('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				selectOption();
			});


			return option;
		};

		// SHOW OPTIONS AND DIMMER
		var showOptions = function () {
			$(box_element).removeClass('options-hidden').addClass('options-visible');
			if (plugin.settings.useDimmer) {
				$('#' + plugin.settings.prefix + 'dimmer').show();
			}
			$(options_element).css('top', ($(box_element).outerHeight()-2) + 'px');
			if ($(box_element).hasClass('single')) {
				selected_index = $(options_element).find('.' + plugin.settings.prefix + 'option').index($(options_element).find('.' + plugin.settings.prefix + 'option.active'));
			}
			scrollToActiveOption();
		};

		// HIDE OPTIONS AND DIMMER
		var hideOptions = function () {
			$(box_element).removeClass('options-visible').addClass('options-hidden');
			if (plugin.settings.useDimmer) {
				$('#' + plugin.settings.prefix + 'dimmer').hide();
			}
		};

		// REFRESH ACTIVE IN OPTIONS METHOD
		var refreshActiveOption = function () {
			$(options_element).find('.active').removeClass('active');
			if (selected_index !== -1) {
				$(options_element).find('.' + plugin.settings.prefix + 'option').eq(selected_index).addClass('active');
			}
		};

		// SCROLL TO ACTIVE OPTION IN OPTIONS LIST
		var scrollToActiveOption = function () {
			var $active_element = $(options_element).find('.' + plugin.settings.prefix + 'option.active');
			if ($active_element.length > 0) {
				$(options_element).scrollTop($(options_element).scrollTop() + $active_element.position().top - $(options_element).height()/2 + $active_element.height()/2);
			}

		};

		// SELECT ACTIVE OPTION
		var selectOption = function () {
			$(options_element).find('.' + plugin.settings.prefix + 'option').eq(selected_index).data('element').selected = true;
			$(element).trigger('change');
			plugin.refreshSelectedOptions();
			$(input_element).val('');
			box_element.focus();
			hideOptions();
		};



		// REMOVE PLUGIN AND REVERT SELECT ELEMENT TO ORIGINAL STATE
		plugin.destroy = function () {
			$(box_element).remove();
			$.removeData(element, 'selectator');
			$(element).show();
			if ($('.selectator').length === 0) {
				$('#' + plugin.settings.prefix + 'dimmer').remove();
			}
		};

		// Initialize plugin
		plugin.init();
	};
	
	$.fn.selectator = function(options) {
		options = options !== undefined ? options : {};
		return this.each(function () {
			if (typeof(options) === 'object') {
				if (undefined === $(this).data('selectator')) {
					var plugin = new $.selectator(this, options);
					$(this).data('selectator', plugin);
				}
			} else if ($(this).data('selectator')[options]) {
				$(this).data('selectator')[options].apply(this, Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + options + ' does not exist in $.selectator');
			}
		});
	};

}(jQuery));
