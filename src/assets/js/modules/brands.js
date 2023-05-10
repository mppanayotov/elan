/**
 * Brands
 */
import { $window, $document, $body } from '../utils/globals.js';
const $brand = $('.js-brand');
const $brandTrigger = $('.js-brand-trigger');
const $brandExpand = $('.js-brand-expand');
const $brandImage = $('.js-brand-image');
$brandTrigger.on('click', function(e) {
	const $brandTrigger = $(this);
	e.preventDefault();
	$brandTrigger.closest($brand).siblings('.is-active').find($brandExpand).stop().slideToggle(500);
	$brandTrigger.closest($brand).siblings('.is-active').removeClass('is-active');
	setTimeout(function() {
		$brandTrigger.closest($brand).addClass('is-active');
	}, 100);
	$brandTrigger.siblings($brandExpand).stop().slideDown(500);
});
$window.on('load', function() {
	$brandExpand.show();
	$brandExpand.stop().slideUp(0);

	$('.js-brand:first-child').addClass('is-active');
	$('.js-brand:first-child .js-brand-expand').stop().slideDown(500);
});
