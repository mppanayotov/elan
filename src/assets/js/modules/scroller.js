/**
 * Scroller
 */
$('.js-scroller').on('click', function(e) {
	e.preventDefault();
	const target = $(this).attr('data-target');
	$('html, body').stop().animate({
		scrollTop: $(target).offset().top
	}, 1000);
});
