$(document).ready(function () {
	$(".btn-slide-up").click(function (e) {
		$(".div-target").slideUp("slow");
	});
	$(".btn-slide-down").click(function (e) {
		$(".div-target").slideDown("slow");
	});
	$(".btn-slide-toggle").click(function (e) {
		$(".div-target").slideToggle("fast");
	});
});
