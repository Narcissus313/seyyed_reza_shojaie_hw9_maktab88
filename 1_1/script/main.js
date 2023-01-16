$(document).ready(function () {
	let modal = $("#myModal")[0];
	let params = Object.keys(userData[0]);
	let lastUserClickedId;
	let modalContent = `<div class="modal-content">
		<span class="close">&times;</span>
                <div class="modal-header">
                    <h2></h2>
                </div>
                <div class="modal-body"></div>
                <div class="modal-footer">
                    <button class="btnUpdate">update this user</button>
                    <button class="btnDelete">Delete</button>
                </div>
            </div>`;

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
		$("thead>tr").html("");
		["row", ...params].map((param) => {
			$("<th class='title'>")
				.html(param)
				.on("click", function () {
					if (param !== "row") tableSort(param);
				})
				.appendTo($("thead>tr"));
		});
	}

	function updateUserByUid(uid) {
		let targetUser = userData.find(
			(user) => user["uid"].toString() === uid.toString()
		);
		for (let i = 1; i < params.length; i++) {
			targetUser[params[i]] = $(".modal-body>input")[i].value;
		}
	}
	function deleteUser(user) {
		closeModal();
		userData.splice(userData.indexOf(user), 1);
		tableMaker();
	}

	function closeModal() {
		resetModal();
		modal.style.display = "none";
	}

	function openModal() {
		$("#myModal").html(modalContent);
		$("#myModal").css("display", "block");
		$(".close")[0].onclick = function () {
			closeModal();
		};
		$(".btnUpdate").on("click", function () {
			let userToUpdate = userData.find(
				(user) => user.uid === lastUserClickedId
			);

			openModalToCreateOrEdit();
			$(".btnCreateConfirm").css("display", "none");
			$(".modal-header").css("font-size", "30px").html("Update User");
			$(".modal-body")
				.css("font-size", "30px")
				.html(
					params
						.map((param) => {
							if (
								param === "personalCode" ||
								param === "phoneNumber"
							)
								return `<input placeHolder='${param}' type='number' min=0 id='${param}' style='border:1px solid #ccc; width:100%;height:20px;padding:5px 10px' value="${userToUpdate[param]}">`;
							if (param === "uid")
								return `<input id='${param}' placeholder='xx' style='border:1px solid #ccc; width:100%;height:20px;padding:5px 10px' disabled value="${userToUpdate[param]}">`;
							return `<input placeHolder='${param}' type='text' id='${param}' style='border:1px solid #ccc; width:100%;height:20px;padding:5px 10px' value="${userToUpdate[param]}">`;
						})
						.join("")
				);
		});
	}

	function userDataShowModal(user) {
		openModal();
		let targetUser = userData.find((item) => user.uid === item.uid);

		$(".modal-header>h2").html(`${user["firstName"]} ${user["lastName"]}`);

		for (const param of params) {
			$(".modal-body").append(
				`<p><a class="fw-bold">${param}</a>: ${targetUser[param]}</p>`
			);
		}

		$(".btnDelete").on("click", function () {
			if (!!confirm("Are you sure you want to delete the user?"))
				deleteUser(user);
		});
	}

	function resetModal() {
		$(".modal-header").textContent = "";
		$(".modal-body").innerHTML = "";
		$(".modal-footer").innerHTML = "";
	}

	function userRowMaker(user) {
		let res = $("<tr>");
		res.on("click", function (e) {
			lastUserClickedId = user.uid;
			userDataShowModal(user);
		}).html(
			`<td style="padding:10px 20px;">${userData.indexOf(user) + 1}</td>`
		);
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

	function openModalToCreateOrEdit() {
		openModal();
		$(".btnDelete").css("display", "none");
		$(".btnUpdate").css("display", "none");
		$(".modal-header").css("font-size", "30px").html("Create New User");
		$(".modal-body")
			.css("font-size", "30px")
			.html(
				params
					.map((param) => {
						if (
							param === "uid" ||
							param === "personalCode" ||
							param === "phoneNumber"
						)
							return `<input placeHolder='${param}' type='number' min=0 id='${param}' style='border:1px solid #ccc; width:100%;height:20px;padding:5px 10px'>`;
						return `<input placeHolder='${param}' type='text' id='${param}' style='border:1px solid #ccc; width:100%;height:20px;padding:5px 10px'>`;
					})
					.join("")
			);
		$(".modal-footer")
			.append(
				'<button class="btnCreateConfirm" style="margin-top:20px">Create</button>'
			)
			.append(
				'<button class="btnUpdateConfirm" style="margin-top:20px"><a>Update</a></button>'
			);

		$(".btnCreateConfirm").on("click", function () {
			let newUserData = [...$(".modal-body").children("input")];
			let newUser = {};
			for (let i = 0; i < params.length; i++) {
				newUser[params[i]] = newUserData[i].value;
			}
			newUserData[0].value.toString();

			for (const user of userData) {
				if (
					newUserData[0].value.toString() === user["uid"].toString()
				) {
					alert("This id exists! Choose something else");
					return;
				}
			}
			if (newUserData[0].value.toString() === "") {
				alert("User should have an id");
				return;
			}
			userData.push(newUser);
			closeModal();
			tableMaker();
		});

		$(".btnUpdateConfirm").on("click", function () {
			updateUserByUid(lastUserClickedId);
			closeModal();
			tableMaker();
		});
	}

	$(".btnCreate").on("click", function () {
		openModalToCreateOrEdit();
		$(".btnUpdateConfirm").css("display", "none");
	});

	tableMaker();
});
