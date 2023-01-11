let userProfileModal = document.getElementById("userProfileModal");
let inputSearchbar = document.getElementById("inputSearchbar");
let modalHeader = document.querySelector(".modal-header");
let usersListRow = document.getElementById("usersList");
let modalTitle = document.querySelector(".modal-title");
let modalBody = document.querySelector(".modal-body");
let btnSearch = document.getElementById("btnSearch");
let pagesUl = document.getElementById("pagesUl");
let form = document.querySelector("#form");
let params = Object.keys(users[0]);
let numberOfCardsPerpage = 6;
let lastUsers;
// let pageNumber = Math.ceil(users.length / numberOfCardsPerpage);
let currentPage = 1;
let inputSearchbarValue;

function formPreventFromRefresh(event) {
	event.preventDefault();
}

function userProfileCreator(data) {
	const targetUser = users.find((user) => user.id == data);
	modalTitle.innerText = targetUser.first_name + " " + targetUser.last_name;
	modalBody.innerHTML = `
    <div class="row p-3">
        <div class="col p-3">
            <p>id: ${targetUser.id}</p>
            <p>email: ${targetUser.email}</p>
            <p>first name: ${targetUser.first_name}</p>
            <p>last name: ${targetUser.last_name}</p>
        </div>
        <div class="col"><img src="${targetUser.localImagePlace}" class="card-img-top my-2 rounded-3 text-center col-6 h-75"></img>
    </div>`;
}

function userCardMaker(user) {
	user.localImagePlace = `./images/${user.id}-image.jpg`;
	return `<div class="col-md-4 col-sm-6 my-1">
                <div class="card px-2 shadow h-100">
                    <img src="${user.localImagePlace}" class="card-img-top my-2 rounded-3">
                    <h5 class="card-title my-3 text-center fw-bold">${user.first_name} ${user.last_name}</h5>
                    <ul class="list-group list-group-flush h-25 fs-6">
                        <li class="list-group-item p-2">id: ${user.id}</li>
                        <li class="list-group-item p-2">email: ${user.email}</li>
                    </ul>
                    <button
                    onclick='userProfileCreator(${user.id})'
                    class="btn btn-primary my-3"
                    data-bs-toggle="modal" data-bs-target="#userProfileModal"
                    >
                    Profile</button>
                </div>
            </div>`;
}
function usersListGenerator(userList) {
    console.log('userList: ', userList);
	let cards = "";
	for (
		let i = numberOfCardsPerpage * (currentPage - 1);
		i < numberOfCardsPerpage * currentPage;
		i++
	) {
		if (!userList[i].length) return cards;
		cards += userCardMaker(userList[i]);
	}
	return cards;
}

function renderUsersList(customUsers) {
	usersListRow.innerHTML = "";
    usersListRow.innerHTML += usersListGenerator(customUsers);
    pageLinksCreator(customUsers);
}
function searchInUsers(value) {
	const filteredUsers = users.filter((item) => {
		for (const param of params) {
			if (param === "avatar") continue;
			if (String(item[param]).toLowerCase().includes(value.toLowerCase()))
				return true;
		}
    });
    lastUsers = filteredUsers;
	renderUsersList(filteredUsers);
}

btnSearch.addEventListener("click", function () {
	searchInUsers(inputSearchbarValue);
});

inputSearchbar.addEventListener("keyup", function (e) {
	inputSearchbarValue = inputSearchbar.value;
	if (inputSearchbarValue === "") renderUsersList(users);
	if (e.key === "Enter") searchInUsers(inputSearchbarValue);
});

function pageLinksCreator(users) {
    let pageNumber = Math.ceil(users.length / numberOfCardsPerpage);
    pagesUl.innerHTML = '';
	for (let i = 1; i < pageNumber+1; i++) {
		pagesUl.innerHTML += `<li class="page-item ${
			i == 1 ? "active" : ""
		}"><a class="page-link" href="#">${i}</a></li>`;
	}
}
pagesUl.addEventListener("click", function (e) {
	for (let i = 0; i < pagesUl.children.length; i++) {
		pagesUl.children[i].className = "page-item";
	}
	e.target.parentElement.className += " active";
	currentPage = +e.target.innerText;
    // console.log('currentPage: ', currentPage);
	renderUsersList(lastUsers);
});

form.addEventListener("submit", formPreventFromRefresh);
renderUsersList(users);
