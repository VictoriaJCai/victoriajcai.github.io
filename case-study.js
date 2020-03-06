$('document').ready(function(){
	var zoomImage = $('.can-zoom');

	zoomImage.on('click',function(){
		if($(this).parent().hasClass('three-images')) {
			$(this).prependTo($(this).parent());
			$(this).siblings().removeClass('zoom');
		}
		$(this).toggleClass('zoom');

		activeArticle = $(this).parents('.case-study');
	});

	$('.case-study').on('click','.gallery',function(e){
		if ($(this).css('position') === "static" || $(this).hasClass('expand')) {
			// Expanded either because the window is small or the gallery has been clicked
			var galleryImages = $(this).children('img');
			if ($(e.target).hasClass('collapse')) {
				$(this).removeClass('expand');
				galleryImages.removeClass('static focus');
				$(this).parent('section').find('.static.zoom').slideUp(function(){$(this).remove()});
				return;
			}
			if (e.target.tagName === "IMG") {
				if ($(e.target).hasClass('focus')){
					removeGalleryZoomImage(this);
				} else {
					removeGalleryZoomImage(this);
					$(e.target).addClass('focus static');
					var zoom = $(e.target).clone().css('display','none').addClass('zoom');
					$(this).before(zoom);
					zoom.slideDown();
				}
			}
			// Creates consistency between mobile and desktop views
			// Normalizes for window resizing
			$(this).addClass('expand');
			galleryImages.addClass('static');

			function removeGalleryZoomImage (gallery) {
				$(gallery).children('img').removeClass('focus');
				$(gallery).parent().find('img.static.zoom').slideUp(function(){
					$(this).remove();
				});
			}
		} else {
			// At least 850px and NOT expanded
			$(this).addClass('expand');
			var gallery = $(this).children('img');
			for(var i = gallery.length-1; i >= 0; i--) {
				window.setTimeout(function(i){
					return function() {
						$(gallery[i]).addClass('static');
					};
				}(i), 400*(1/(i+2)));
			}
		}
	});
	$('.case-study').on('click','.static.zoom',function(){
		$(this).siblings('.gallery.expand').find('.focus').click();
	});

	$('.what-is').on('click', function(){
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
			$(this).next('.def').slideUp('fast');
		} else {
			$(this).addClass('open');
			$(this).next('.def').slideDown('fast');
		}
	});

});
