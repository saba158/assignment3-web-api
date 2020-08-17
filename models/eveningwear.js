var mongoose = require("mongoose");
const joi = require("joi"); 

var eveningwearSchema = mongoose.Schema ( {

    name: String,
    price: String,
    productdetails: String,
    color: String,
    fabric: String,
});

var eveningwear = mongoose.model("eveningwear", eveningwearSchema);
function validateeveningwear(data) {
    const schema = joi.object( {
        name: joi.string().min(2).max(15).required(),
        price: joi.number().min(0).required(),
        productdetails: joi.string().min(2).max(15).required(),
        color: joi.string().min(2).max(15).required(),
        fabric: joi.string().min(2).max(15).required(),

    });
    return schema.validate(data, {abortEarly:false});
  
}
module.exports.eveningwear = eveningwear;
module.exports.validate = validateeveningwear;
