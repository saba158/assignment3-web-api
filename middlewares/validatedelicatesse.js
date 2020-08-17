const { validate } = require("../models/delicatesse");

function Validatedelicatesse(req, res, next) {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message); 
  next(); 
};


module.exports = Validatedelicatesse;