
function userLogin() {
	var email = document.getElementById("emaillog").value;
	var password = document.getElementById("passwordlog").value;

	axios.post('api/authenticate', {
		email: email,
		password: password
	})
		.then(function (response) {
			console.log('singn in res', response);
			if (response.data.success && response.data.isLogged) {
				location.replace('/home')

			}//end of if
			else if (response.data.message == "Authentication failed. Wrong password.") {
				location.reload();
				alert('Wrong password.');
			}
			else if (response.data.message == "Authentication failed. User not found.") {
				location.reload();
				alert('Username not found! Please sign Up!');
			}
		})
}

function userSignUp() {
	var email = document.getElementById("emailsign").value;
	var password = document.getElementById("passwordsign").value;
	console.log(email);
	console.log(password);
	if (email && password) {
		axios.post('/api/adduser', {
			email: email,
			password: password
		    
		})
			.then(function (response) {
				if (response.data.status == "added successfully") {
					// console.log('at front end', response);
					var html = '';
					html += '<p>Congratulations , you are registered!!</p>'
					html += '<p>Please sign in</p>'
					document.getElementById(`afterSignUp`).innerHTML = html;
				    location.reload();
				} else {
					//location.reload();
					alert('already signed Up!  Please login');

				}
			})

	} else {
		location.reload();
		alert('email or password cannot be null!!');
	}
}
