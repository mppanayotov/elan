/*
 * Simple menu
 */
import { $window, $document, $body } from '../utils/globals.js';
const $menu = $('.js-menu');
const $menuTrigger = $('.js-menu-trigger');
const MOBILE_WIDTH = 767;

function hasOpenMenu() {
	return $body.hasClass('has-open-menu');
}

function openMenu() {
	$menuTrigger.addClass('is-active');
	$menu.addClass('is-active');
	$body.addClass('has-open-menu');
}

function closeMenu() {
	$menuTrigger.removeClass('is-active');
	$menu.removeClass('is-active');
	$body.removeClass('has-open-menu');
}
$menuTrigger.on('click', function(e) {
	e.preventDefault();
	if (!hasOpenMenu()) {
		openMenu();
	} else {
		closeMenu();
	}
});
$window.on('load resize', _.debounce(function() {
	if ($window.width() > MOBILE_WIDTH && hasOpenMenu()) {
		closeMenu();
	}
}, 100));
