$(document).ready(function () {
	// let a = $(".parent").text();
	// let b = $(".target")[0].firstChild.nodeValue;
	// let c = $(".child").text();
	$(".parent-copy").click(function () {
		$(".target")[0].firstChild.nodeValue =
			$(".parent").text() + $(".target")[0].firstChild.nodeValue;
		// a + b;
	});
	$(".child-copy").click(function () {
		$(".target")[0].firstChild.nodeValue =
			$(".child").text() + $(".target")[0].firstChild.nodeValue;
		// c;
	});
});
