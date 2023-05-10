/*
 * Animations
 */
import { $window, $document, $body } from '../utils/globals.js';
import AOS from 'aos';
const $timeline = $('.js-timeline');

function initAos() {
	function calcOffset() {
		let winHeight = window.innerHeight;
		let winVh = winHeight / 100;
		return parseInt(20 * winVh);
	}
	AOS.init({
		anchorPlacement: 'top-bottom',
		duration: 1000,
		once: true,
		offset: calcOffset()
	});
	$window.on('resize', _.throttle(function() {
		AOS.refresh();
	}, 100));
}

function initTimeline() {
	const $item = $('.js-timeline li');
	let timingStart = 300;
	let timingStep = 100;
	const timingGroup = 1;
	let i = 0;
	let transitionDelay = 0;
	$timeline.attr({
		'data-aos': 'fade-in'
	});
	$item.each(function() {
		const $item = $(this);
		transitionDelay = timingStart + Math.floor(i / timingGroup) * timingStep;
		$item.css({
			transitionDelay: transitionDelay / 1000 + 's',
		});
		i++;
	});

	function animateTimeline() {
		if (!$timeline.hasClass('is-animating') && $timeline.hasClass('aos-animate')) {
			const $item = $('.js-timeline li:not(li.is-current~li)');
			i = 0;
			timingStart = transitionDelay;
			timingStep = 600;
			$timeline.addClass('is-animating');
			$item.each(function() {
				const $item = $(this);
				transitionDelay = timingStart + Math.floor(i / timingGroup) * timingStep;
				setTimeout(function() {
					$item.addClass('is-animated');
				}, transitionDelay);
				i++;
			});
		}
	}
	$window.on('load scroll resize', _.throttle(function() {
		animateTimeline();
	}, 100));
}
$document.ready(function() {
	initTimeline();
	initAos();
});
