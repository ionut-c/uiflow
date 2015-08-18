$(document).ready(function () {
    $('#menuToggler').click(function () {
        $('body').toggleClass('menu-expanded');
    });
});


$('ul#primary-menu a').click(function () { 
	$('ul#primary-menu .active').removeClass('active');
	$('ul.second-menu:visible').addClass('hidden');
	$(this).addClass('active').parent().parent().parent().children("a").addClass('active');
	
	if($(this).parent().children('ul.second-menu').hasClass('hidden')){ 
		$(this).parent().children('ul.second-menu').removeClass('hidden');
	}
	else if($(this).parent().parent().hasClass('hidden')){
		$(this).parent().parent().removeClass('hidden');
	}
	else{ 
		$('ul.second-menu').addClass('hidden');
	}
	
});

// $('#collapse-box tr').click(function () {
// 	$(this).next().toggleClass('hidden');
// });


$('#accordion')
  .on('show.bs.collapse', function(e) {
    $(e.target).prev('.panel-heading').addClass('active');
  })
  .on('hide.bs.collapse', function(e) {
    $(e.target).prev('.panel-heading').removeClass('active');
  });