var mongoose = require("mongoose");
const joi = require("joi"); 
var bcrypt = require("bcryptjs")

var UserSchema = mongoose.Schema ( {

    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
      }
});

UserSchema.methods.generateHashedPassword = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  };



var User = mongoose.model("User", UserSchema);

function validateUser(data) {
    const schema = joi.object( {
        name: joi.string().min(2).max(15).required(),
        email: joi.string().email().min(2).max(15).required(),
        password: joi.string().min(2).max(15).required(),
        

    });
    return schema.validate(data, {abortEarly:false});
}

function validateuserlogin(data) {
    const schema = joi.object( {
      //  name: joi.string().min(2).max(15).required(),
        email: joi.string().email().min(2).max(15).required(),
        password: joi.string().min(2).max(15).required(),
        

    });
    return schema.validate(data, {abortEarly:false});
}

module.exports.User = User;
module.exports.validate = validateUser; // for sign up
module.exports.validateuserlogin = validateuserlogin; // for login
