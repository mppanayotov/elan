/**
 * Parallax
 */
import { $window, $document, $body } from '../utils/globals.js';

function initParallax() {
	const $container = $('.js-parallax-container');
	const $items = $('h2, h3, img, figure');
	$container.each(function() {
		const $container = $(this);
		const $containerItems = $container.find($items);
		$container.addClass('scrollme js-parallax-container');
		$containerItems.each(function() {
			const $item = $(this);
			$item.addClass('animateme js-parallax');
			updateParallax($item);
		});
	});
	$window.on('load', function() {
		$container.each(function() {
			$(this).addClass('has-loaded');
		});
	});
	$window.on('resize', _.throttle(function() {
		updateParallax();
	}, 100));
}

function updateParallax($item) {
	if (!$item) {
		const $item = $('.js-parallax');
		$item.each(function() {
			setAttributes($(this));
		});
	} else {
		setAttributes($item);
	}
}

function setAttributes($item) {
	if (!$item) {
		return;
	}
	let elevation;
	if ($item[0].nodeName.toLowerCase() == 'h2') {
		elevation = parseInt($item.height() * 1);
	}
	if ($item[0].nodeName.toLowerCase() == 'h3') {
		elevation = parseInt($item.height() / 3);
	}
	if ($item[0].nodeName.toLowerCase() == 'img') {
		elevation = parseInt($item.height() * 1.5);
	}
	if ($item[0].nodeName.toLowerCase() == 'figure') {
		elevation = -parseInt($item.height() / 4);
	}
	$item.css({
		transform: 'translateY(' + elevation + 'px'
	});
	$item.attr({
		'data-when': 'span',
		'data-from': '2',
		'data-to': '0',
		'data-translatey': elevation
	});
}
$document.ready(function() {
	if (!$('.js-parallax-container').length) {
		return
	}
	initParallax();
	setTimeout(function() {
		require('../../vendor/jquery.scrollme.min.js');
	}, 100);
});
