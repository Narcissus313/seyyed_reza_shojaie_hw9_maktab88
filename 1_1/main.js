$(document).ready(function () {
	let params = Object.keys(userData[0]);
	function tableTitleMaker() {
		["row", ...params].map((property) => {
			$("thead>tr").append(`<th>${property}</th>`);
		});
	}

    function userRowMaker(user) {
        $("tbody").append("<tr onclick='userModalShower()'></tr>");
			
			// $("tbody>tr").append(`<td>${user.uid}</td>`);
			$("tbody>tr").append(`<td>${user.uid}</td>`);
			$("tbody>tr").append(`<td>${user.firstName}</td>`);
			$("tbody>tr").append(`<td>${user.lastName}</td>`);
			$("tbody>tr").append(`<td>${user.city}</td>`);
			$("tbody>tr").append(`<td>${user.personalCode}</td>`);
			$("tbody>tr").append(`<td>${user.phoneNumber}</td>`);
			$("tbody>tr").append(`<td>${user.position}</td>`);
		 
    }
    
    function renderRows() {
        for (const [index,user] of userData.entries()) {
            $("tbody>tr").prepend(`<td>${index + 1}</td>`);
            userRowMaker(user);
        }
    }
    function tableMaker() {
        tableTitleMaker();
        renderRows();
    }
        

	tableMaker();
});
