/**
 * Sizer
 */
import { $window, $document, $body } from '../utils/globals.js';
$(document).ready(function() {
	const MOBILE_WIDTH = 767;
	const $fullHeight = $('.js-full-height');
	$fullHeight.each(function() {
		const $fullHeight = $(this);

		function updateHeight($item) {
			$item.removeAttr('style');
			const initialHeight = parseFloat(getComputedStyle($item[0]).height) - parseFloat(getComputedStyle($item[0]).paddingTop) - parseFloat(getComputedStyle($item[0]).paddingBottom);
			const stetchHeight = 'calc(100vh - ' + $item.offset().top + 'px)';
			const currentHeight = $window.innerHeight() - $item.offset().top;
			const safeHeight = initialHeight + parseFloat(getComputedStyle($item[0]).paddingBottom);
			$item.css('minHeight', stetchHeight);
			$item.css('height', currentHeight + 'px');
			const bottom = parseFloat(getComputedStyle($item[0]).height) - $window.innerHeight() + $item.offset().top + parseFloat(getComputedStyle($item[0]).paddingBottom);
			$item.css('paddingBottom', bottom + 'px');
			const top = parseFloat(getComputedStyle($item[0]).height) - initialHeight - parseFloat(getComputedStyle($item[0]).paddingBottom);
			if (top < 0) {
				$item.css('paddingTop', 0);
				$item.css('height', safeHeight + 'px');
			} else {
				$item.css('paddingTop', top + 'px');
			}
		}
		$window.on('load resize', _.debounce(function() {
			if ($window.width() > MOBILE_WIDTH) {
				$fullHeight.removeAttr('style');
				$fullHeight.removeClass('is-loaded');
			} else {
				updateHeight($fullHeight);
				$fullHeight.addClass('is-loaded');
			}
		}, 100));
		if ($window.width() <= MOBILE_WIDTH) {
			updateHeight($fullHeight);
			$fullHeight.addClass('is-loaded');
		}
	});
	$('.js-full-height-video-container').each(function() {
		$(this).css('height', getComputedStyle($(this)[0]).height);
	});
	$('.js-full-height-video').each(function() {
		$(this).css('paddingBottom', $(this).closest($('.js-full-height-video-container')).height() - $window.innerHeight() + 'px')
	});
});
