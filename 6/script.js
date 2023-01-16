$(document).ready(function () {
	$(".dropdown").hover(
		function () {
			$(".dropdown-content").slideToggle("fast");
			$(".dropdown-content").css("display", "block");
			$(".dropbtn").css("cursor", "pointer");
		},
		function () {
			$(".dropdown-content").stop().slideToggle("fast");
		}
	);
});
