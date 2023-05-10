/**
 * Accordions
 */
import { $window, $document, $body } from '../utils/globals.js';
const $accordion = $('.js-accordion');
const $accordions = $('.js-accordions');
const $accordionTrigger = $('.js-accordion-trigger');
const $accordionExpand = $('.js-accordion-expand');
$accordionTrigger.on('click', function(e) {
	const $accordionTrigger = $(this);
	e.preventDefault();
	$accordionTrigger.closest($accordion).siblings('.is-active').find($accordionExpand).stop().slideToggle(500);
	$accordionTrigger.closest($accordion).siblings('.is-active').removeClass('is-active');
	setTimeout(function() {
		$accordionTrigger.closest($accordion).toggleClass('is-active');
		$accordionTrigger.closest($accordions).toggleClass('has-active', $accordion.hasClass('is-active'));
	}, 100);
	$accordionTrigger.siblings($accordionExpand).stop().slideToggle(500);
});
$window.on('load', function() {
	$accordionExpand.show();
	$accordionExpand.stop().slideUp(0);
});
