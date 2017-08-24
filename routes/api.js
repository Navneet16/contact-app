var express = require('express');
var router = express.Router();
var auth = function (req, res, next) {
	if (req.session && req.session.isLogged) {
		return next();
		// req.session.destroy();
	}	
	else
		return res.json({ status: 'FAILED', message: 'Please login.' });
};


var addcontact = require('../api/addcontact');
var listcontact = require('../api/listcontact');
var deletecontact = require('../api/deletecontact');
var editcontact = require('../api/editcontact')
var authenticate = require('../api/authenticate')
var adduser = require('../api/adduser')
var logout = require('../api/logout')

router.post('/authenticate', authenticate.authenticate)
router.post('/adduser', adduser.addUser)
router.post('/edit', editcontact.edit)
router.post('/delete', deletecontact.del);
router.post('/add',addcontact.add);
router.post('/list', listcontact.list);
router.post('/logout',logout.logout)

module.exports = router;
