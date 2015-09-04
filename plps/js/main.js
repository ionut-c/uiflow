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

    var headerComponent = new HeaderComponent();

    function HeaderComponent() {
        $component = $('body').find(".header");
        $body = $('body');
        
        function updateHeader() {
            if($(window).scrollTop() <= 64) {
                $component.css("top", "-"+$(window).scrollTop()+"px");
                $body.css("padding-top", ($component.height()-$(window).scrollTop())+"px");
            }
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