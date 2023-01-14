$(document).ready(function () {
	let modal = $("#myModal")[0];
	let params = Object.keys(userData[0]);
	// let span = $(".close")[0];
	// let modalContent = $(".modal-content")[0];
	// let modalHeader = $(".modal-header")[0];
	// console.log('modalContent: ', modalContent);

	window.onclick = function (event) {
		if (event.target == modal) {
			closeModal();
		}
	};

	function tableSort(sortBy = null) {
		if (sortBy !== null)
			userData.sort((a, b) => {
				const current = a[sortBy].toString();
				const next = b[sortBy].toString();
				return current.toString().localeCompare(next, undefined, {
					numeric: true,
					sensivity: "base",
				});
			});
		renderRows();
	}

	function tableTitleMaker() {
		$('thead>tr').html('');
		["row", ...params].map((param) => {
			$("<th>")
				.html(param)
				.on("click", function () {
					if (param !== "row") tableSort(param);
				})
				.appendTo($("thead>tr"));
		});
	}

	function deleteUser(user) {
		closeModal();
		userData.splice(userData.indexOf(user), 1);
		tableMaker();
	}
	function closeModal() {
		modal.style.display = "none";
	}

	function openModal(user) {
		$("#myModal").html(`<div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2></h2>
                </div>
                <div class="modal-body">
                    <!-- <p>Some text in the Modal Body</p>
                        <p>Some other text...</p> -->
                </div>
                <div class="modal-footer">
                    <!-- <h3>Modal Footer</h3> -->
                    <br>
                    <button class="btnUpdate">update</button>
                    <button class="btnDelete">Delete</button>
                </div>
            </div>`);

		let targetUser = userData.find((item) => user.uid === item.uid);
		$("#myModal")[0].style.display = "block";

		$(".modal-header>h2").html(`${user["firstName"]} ${user["lastName"]}`);

		for (const param of params) {
			$(".modal-body").append(
				`<p><a class="fw-bold">${param}</a>: ${targetUser[param]}</p>`
			);
		}
		$(".close")[0].onclick = function () {
			closeModal();
		};

		$(".btnDelete").on("click", function () {
			if (!!confirm("Are you sure you want to delete the user?"))
				deleteUser(user);
		});
	}

	function userRowMaker(user) {
		let res = $("<tr>");
		res.on("click", function (e) {
			openModal(user);
		}).html(`<td style="padding:10px 20px;">${userData.indexOf(user) + 1}</td>`);
		for (const key of params) {
			res.append(`<td>${user[key]}</td>`);
		}
		return res;
	}

	function renderRows() {
		$("tbody").html("");
		for (const user of userData) {
			$("tbody").append(userRowMaker(user));
		}
	}

	function tableMaker() {
		tableTitleMaker();
		renderRows();
	}

	tableMaker();
});
