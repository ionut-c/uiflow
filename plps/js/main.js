$(document).ready(function() {
    $(".language").click(function() {
    	$(".select-language").toggle();
    });

    $("#search").click(function() {
    	$(".search-form").toggle();
    	$( ".search-form input" ).focus();
    });
    $(".close-search").click(function() {
    	$(".search-form").hide();
    });
});