var mongoose = require("mongoose");
const joi = require("joi"); 

var delicatesseSchema = mongoose.Schema ( {

    name: String,
    price: String,
    productdetails: String,
    color: String,
    fabric: String,
});

var delicatesse = mongoose.model("delicatesse", delicatesseSchema);
function validatedelicatesse(data) {
    const schema = joi.object( {
        name: joi.string().min(2).max(150).required(),
        price: joi.number().min(0).required(),
        productdetails: joi.string().min(2).max(150).required(),
        color: joi.string().min(2).max(150).required(),
        fabric: joi.string().min(2).max(150).required(),

    });
    return schema.validate(data, {abortEarly:false});
  
}
module.exports.delicatesse = delicatesse;
module.exports.validate = validatedelicatesse;
