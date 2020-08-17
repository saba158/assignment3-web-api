var mongoose = require("mongoose");
const joi = require("joi"); 

var lookbookSchema = mongoose.Schema ( {

    name: String,
    productdetails: String,
    
});

var lookbook = mongoose.model("lookbook", lookbookSchema);
function validatelookbook(data) {
    const schema = joi.object( {
        name: joi.string().min(2).max(15).required(),
        productdetails: joi.string().min(2).max(1000).required(),
        

    });
    return schema.validate(data, {abortEarly:false});
  
}
module.exports.lookbook = lookbook;
module.exports.validate = validatelookbook;
