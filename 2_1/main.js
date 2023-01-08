let usersListRow = document.getElementById("usersList");
// let userData = document.getElementById('usersList');
function userCardMaker(user) {
	return `<div class="col-lg-3 col-md-4 col-sm-6 my-1">
                <div class="card px-2 shadow h-100">
                    <img src="${user.avatar}" class="card-img-top my-2 rounded-3" alt="1">
                    <h5 class="card-title my-3 text-center">${user.first_name} ${user.last_name}</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">id: ${user.id}</li>
                        <li class="list-group-item">email: ${user.email}</li>
                    </ul>
                    <button onclick="userProfileModalShowBtn()" href="#" class="btn btn-primary mt-3 mb-2">Profile</button>
                </div>
            </div>`;
}

function usersListGenerator() {
	for (const user of users) {
		usersListRow.innerHTML += userCardMaker(user);
	}
}
usersListGenerator();

userProfileModalShowBtn = function () {
    
}
