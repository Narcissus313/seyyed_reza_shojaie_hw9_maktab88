function myFunction(id) {
	if (!$(`#${id}`).hasClass("w3-show")) {
		$(`#${id}`).removeClass("w3-hide");
		$(`#${id}`).addClass("w3-show");
		$(`#button1>i`).removeClass("fa-caret-down");
		$(`#button1>i`).addClass("fa-caret-right");
	} else {
		$(`#${id}`).removeClass("w3-show");
		$(`#${id}`).addClass("w3-hide");
		$(`.w3-button>i`).removeClass("fa-caret-right");
		$(`.w3-button>i`).addClass("fa-caret-down");
	}
}
