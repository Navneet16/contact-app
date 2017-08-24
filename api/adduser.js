var db = require('../mongoConfig');

addUser = (req, res, next) => {

	contactRes = {
		email: req.body.email,
		password: req.body.password
	}

	db.Accounts.findOne({ email: contactRes.email })
		.then(function (response) {
			console.log(response)
			if (!response) {
				// console.log('over jwt', contactRes.password);
				// var token = jwt.sign({ data: contactRes }, 'secret123');
				// console.log(token);
				var contact = new db.Accounts({
					"password": contactRes.password,
					"email": contactRes.email
				});
				contact.save()
					.then(function (response) {
						console.log(response);
						res.send({ 'status': 'added successfully' })
					})
					.catch(function (e) {
						res.send({ 'status': 'failure', Error: e });
					});
			}
			else {
				res.send({ 'status': 'contact already exist' })
			}
		})
		.catch(function (e) {
			res.send({ 'status': e })
		})
};

module.exports = {
	addUser
}