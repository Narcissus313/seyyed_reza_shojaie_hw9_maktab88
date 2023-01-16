$(document).ready(function () {
	let divText = $(".container").text();
	let res = "";
	$(".container").on("click", function () {
		res += divText;
		$(".container").text(res);
	});
});
