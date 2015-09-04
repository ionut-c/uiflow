$(document).ready(function() {
    $(".language").click(function() {
    	$(".select-language").toggle();
    });

    $("#search").click(function() {
    	$(".search-form").slideToggle("slow");
    	$( ".search-form input" ).focus();
    });
    $(".close-search").click(function() {
    	$(".search-form").hide();
    });

    // var headerComponent = new HeaderComponent();

    function HeaderComponent() {
        $component = $('body').find(".header");
        $body = $('body');
        
        function updateHeader() {
            var factor = 0;
            if($(window).scrollTop() <= 64) {
                var factor = $(window).scrollTop();
            } else {
                factor = 64;
            }
            $component.css("top", "-"+factor+"px");
            $body.css("padding-top", ($component.height()-factor)+"px");
        }

        function attachEvents() {
            $(window).scroll(function() {
                $component.trigger("change");
            });
            $component.bind("change", function() {
                updateHeader();
            });
        }

        function init() {
            updateHeader();
            attachEvents();
        }
        
        if($component.length > 0) {
            init();
        }
    }
});