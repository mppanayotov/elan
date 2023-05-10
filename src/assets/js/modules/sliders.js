/**
 * Sliders
 * "swiper": "^5.4.2"
 */
import { $window, $document, $body } from '../utils/globals.js';
import Swiper from 'swiper/js/swiper';
$('.js-slider').each(function() {
	const $slider = $(this);

	function initSlider() {
		const swiper = new Swiper($slider, {
			preloadImages: false,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			observer: false,
			observeParents: false,
			observeSlideChildren: false,
			loop: false,
			slidesPerView: 1,
			spaceBetween: 0,
			speed: 1000,
			direction: 'vertical',
			allowTouchMove: true,
			touchReleaseOnEdges: true,
			mousewheel: {
				enabled: true,
				eventsTarget: 'html'
			},
			keyboard: {
				enabled: true
			},
			breakpoints: {
				1024: {
					allowTouchMove: false
				}
			},
			navigation: {
				nextEl: $slider.closest('.js-slider-container').find('.js-slider-button-next'),
				prevEl: $slider.closest('.js-slider-container').find('.js-slider-button-prev')
			}
		});
		let sliderEnded = false;
		let isRewinding = false;

		function rewind() {
			const currentScrollPos = $document.scrollTop();
			if (currentScrollPos == 0) {
				return
			}
			isRewinding = true;
			$('html, body').stop().animate({
				scrollTop: 0
			}, 1000);
			setTimeout(function() {
				isRewinding = false;
			}, 1000);
		}
		swiper.on('reachEnd', function() {
			sliderEnded = true;
			setTimeout(function() {
				swiper.mousewheel.disable();
				swiper.keyboard.disable();
				$body.removeClass('is-frozen');
			}, 1000);
		});
		swiper.on('fromEdge', function() {
			rewind();
			sliderEnded = false;
		});
		$window.on('load scroll resize', _.throttle(function() {
			const currentScrollPos = $document.scrollTop();
			if (currentScrollPos == 0) {
				$body.addClass('is-frozen');
				swiper.mousewheel.enable();
				swiper.keyboard.enable();
			} else if (!sliderEnded && !isRewinding) {
				$body.addClass('is-frozen');
			}
		}, 100));
		swiper.on('slideChange', function() {
			$slider.find('.swiper-slide.swiper-slide-visible video').each(function() {
				$(this)[0].play();
			});
		});
		swiper.on('transitionEnd', function() {
			$slider.find('.swiper-slide:not(.swiper-slide-visible) video').each(function() {
				$(this)[0].pause();
			});
		});
		$slider.find('.swiper-slide:not(.swiper-slide-visible) video').each(function() {
			$(this)[0].pause();
		});
	}
	$window.on('load', function() {
		initSlider();
	});
});
$('.js-slider-words').each(function() {
	const $slider = $(this);

	function initSlider() {
		$slider.find('h2').each(function() {
			$(this).attr('data-title', $(this).html());
		});
		const swiper = new Swiper($slider, {
			preloadImages: false,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
			loop: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			initialSlide: 1,
			speed: 1000,
			allowTouchMove: false,
			autoplay: {
				delay: 2200
			}
		});
	}
	$(document).ready(function() {
		initSlider();
	});
});
