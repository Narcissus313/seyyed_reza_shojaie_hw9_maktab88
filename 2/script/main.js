$(document).ready(function () {
	blue = () => $(".container").css("background-color", "blue");
	red = () => $(".container").css("background-color", "red");
	$(".container").hover(red, blue);
});
