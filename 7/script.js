$(document).ready(function () {
	let a = 0;
	$(".btn-add-ten").click(function () {
		if (a >= 100) {
			alert("no further step is allowed!");
			return;
		}
		a += 10;
		$("span").text(a.toFixed().toString() + "%");
		$(".percent").css("width", "" + a + "%");
		if (a >= 91) {
			$(".percent").css("width", "" + 100 + "%");
			setTimeout(() => {
				alert("finished");
				return;
			}, 20);
		}
	});
});
