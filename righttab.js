(function($, window, document){
	$.fn.righttab = function(conf){
		var defaults = {
			'focus':'.day-seq',
			'handler':'.catalog-title',
			'active':'catalog-active'
		};

		$.extend(defaults, conf)
		$(window).on('scroll', function(e){
			var index = 0;
			$(defaults.focus).each(function(){
				var top = $(document).scrollTop(),
					elTop = $(this).offset().top;

				if(elTop - top < 100){
					$(defaults.handler).removeClass(defaults.active);
					$(defaults.handler).eq(index).addClass(defaults.active);	
				}
				index++;
			});
		});	
	}

})(jQuery, window, document)


