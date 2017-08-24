var mongoose=require('mongoose');
var validator=require('validator');
mongoose.promise =require('bluebird');
mongoose.connect('mongodb://localhost:27017/contacts')
var schema1 = new mongoose.Schema({
   admin : String,
   first_name:String,
   number: Number,
  
});

var schema2 = new mongoose.Schema({
	password : {
      type:String,
      required:true,
      trim:true
     },
	email: {
        type: String,
        required: true,
        trim:true,
        validate:{
            validator :(value)=>{
                return validator.isEmail(value);
            },
            message : '{value} is not a valid email'
        }
     }
});

var Contacts = mongoose.model('Contacts', schema1);
var Accounts=mongoose.model('Accounts',schema2);
module.exports = {
	Contacts,
    Accounts
}