/**
 * Cards
 */
import { $window, $document, $body } from '../utils/globals.js';
const $card = $('.js-card');
const $cards = $('.js-cards');
const MOBILE_WIDTH = 767;

$card.on('click', function(e) {
	e.preventDefault();
	if ($window.width() > MOBILE_WIDTH) {
		if ($(this).hasClass('is-active')) {
			return
		}
		$card.closest($cards).find($card).removeClass('is-active');
		$(this).addClass('is-active');
	}
});

$window.on('load resize', _.debounce(function() {
	if (! $card.length) {
		return
	}
	
	if ($window.width() <= MOBILE_WIDTH) {
		$card.addClass('is-active');
	} else {
		$card.removeClass('is-active');
		$card[0].classList.add('is-active');
	}
}, 100));
