$(document).ready(function () {
	let progressPercent = 0;
	$(".btn-add-ten").click(function () {
		if (progressPercent >= 100) {
			alert("no further step is allowed!");
			return;
		}
		progressPercent += 10;
		$("span").text(progressPercent.toFixed().toString() + "%");
		$(".percent").css("width", "" + progressPercent + "%");
		if (progressPercent >= 91) {
			$(".percent").css("width", "" + 100 + "%");
			setTimeout(() => {
				alert("finished");
				return;
			}, 20);
		}
	});
});
