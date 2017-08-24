
var db = require('../mongoConfig');

del = (req, res, next) => {
	respm = req.body.delnum;
	respf = req.body.fname;
	console.log(respf);
	db.Contacts.findOneAndRemove({ admin: req.session.email, 'number': respm })
	.then(function () {
    res.json({ status: "contact deleted" })
	})
	.catch(function (e) {
		res.json({status:"contact not deleted"})
	})

}

module.exports = {
	del
}