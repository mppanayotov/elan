/*
 * Mobile Nav
 */
import { $window, $document, $body } from '../utils/globals.js';
const $mobileNav = $('.js-mobile-nav');
const $mobileNavTrigger = $('.js-mobile-nav-trigger');
const TABLET_WIDTH = 1024;

function hasOpenMobileNav() {
	return $body.hasClass('has-open-nav');
}

function openMobileNav() {
	$mobileNavTrigger.addClass('is-active');
	$mobileNav.addClass('is-active');
	$body.addClass('has-open-nav');
}

function closeMobileNav() {
	$mobileNavTrigger.removeClass('is-active');
	$mobileNav.removeClass('is-active');
	$body.removeClass('has-open-nav');
}
$mobileNavTrigger.on('click', function(e) {
	e.preventDefault();
	if (!hasOpenMobileNav()) {
		openMobileNav();
	} else {
		closeMobileNav();
	}
});
$window.on('load resize', _.debounce(function() {
	if ($window.width() > TABLET_WIDTH && hasOpenMobileNav()) {
		closeMobileNav();
	}
}, 100));
