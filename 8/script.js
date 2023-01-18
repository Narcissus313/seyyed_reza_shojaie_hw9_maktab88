function myFunction(id) {
	if (!$(`#${id}`).hasClass("w3-show")) {
		$(".w3-container>div").removeClass("w3-show");
		$(".w3-container>div").addClass("w3-hide");

		$(`#${id}`).removeClass("w3-hide");
		$(`#${id}`).addClass("w3-show");

		let btnCarret = `#button` + String(`#${id}`.match(/[0-9]/g)) + `>i`;
		$(btnCarret).removeClass("fa-caret-down");
		$(btnCarret).addClass("fa-caret-right");
	} else {
		$(".w3-container>div").removeClass("w3-show");
		$(".w3-container>div").addClass("w3-hide");

		$(`.w3-button>i`).removeClass("fa-caret-right");
		$(`.w3-button>i`).addClass("fa-caret-down");
	}
}
