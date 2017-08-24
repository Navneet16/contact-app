var db = require('../mongoConfig');

edit = (req, res, next) => {

	resp = {
		first_name: req.body.first_name1,
		number: req.body.numberr
		
	}
	var number1 = req.body.oldnum;
	console.log('inside edit',resp);
	db.Contacts.findOneAndUpdate({ number: number1 },resp)
		.then(function (response) {
			if (response) {
			   db.Contacts.update({ admin: req.session.email, first_name: resp.first_name, number: resp.number })
				res.json({ msg: "user is edited" });
			}
			else {
				res.json({ msg: "edit failed" });
			}
		})

};

module.exports = {
	edit
}