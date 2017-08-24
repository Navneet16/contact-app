var express = require('express');
var router = express.Router();
var auth = function (req, res, next) {
	if (req.session.email && req.session.isLogged)
		return next();
	else
		return res.redirect('/');
};



// router.get('/my-account', auth, function (req, res, next) {
// 	res.render('my-account', { title: 'Token | Wallet', session: req.session });
// });


router.get('/home', auth, function (req, res, next) {
	if (req.session.isLogged) {
		res.render('home', { title: ' Your Contacts', email: req.session.email })
	}
});


/* GET login page. */
router.get('/', function (req, res, next) {
	res.render('login', { title: 'Contacts App' });
});

router.get('/logout', auth, function (req, res, next) {
	req.session.isLogged = false,
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;
