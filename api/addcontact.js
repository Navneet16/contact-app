var db = require('../mongoConfig');
add = (req, res, next) => {

	contactRes = {
                    first_name: req.body.first_name,
                    number: req.body.number
                    
	             }
               
                
                 db.Contacts.findOne({ number: contactRes.number })
                 .then(function (response) {
                     if (!response) {
                         var contact = new db.Contacts({
                             "admin": req.session.email,
                             "first_name": contactRes.first_name,
                             "number": contactRes.number
                             
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

}
module.exports = {
	add
}