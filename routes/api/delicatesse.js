const express = require('express');
let router = express.Router();
const auth = require ("../../middlewares/auth")
const admin = require ("../../middlewares/admin")
const Validatedelicatesse = require ("../../middlewares/validatedelicatesse")
var {delicatesse} = require ("../../models/delicatesse");


// get products
router.get("/",  async (req, res) => {
    console.log(req.user);
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
     let skipRecords = perPage * (page - 1);
     let records = await delicatesse.find().skip(skipRecords).limit(perPage);
   
    return res.send(records);
});

// get 1 product 
router.get("/:id", async (req, res) => {
    try {
        let record = await delicatesse.findById(req.params.id);
        if(!record)
        {
            return res.status(400).send("product with this id is not available"); // when product is not foung
        }else
        return res.send(record); // when everythinh is fine
    } catch (error) {
        return res.status(400).send("invalid id"); // when id is wrong
    }
});


//update a record
router.put("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        let record = await delicatesse.findById(req.params.id.toString()); //try
        record.name = req.body.name;
        record.price = req.body.price;
        record.productdetails = req.body.productdetails;
        record.color = req.body.color;
        record.fabric = req.body.fabric;
        await record.save();
        return res.send(record); // when everythinh is fine

    } catch (error) {
        console.log(error); //try, 
        return res.status(400).send("invalid id"); // when id is wrong
    }
});

// delete a record
router.delete("/:id",  async (req, res) => {
    try {
        let record = await delicatesse.findByIdAndDelete(req.params.id);
        return res.send(record); // when everythinh is fine
    } catch (error) {
        return res.status(400).send("invalid id"); // when id is wrong
    }
});

// insert a record
router.post("/", Validatedelicatesse, async (req, res) => {
   
        let record = new delicatesse();
        record.name = req.body.name;
        record.price = req.body.price;
        record.productdetails = req.body.productdetails;
        record.color = req.body.color;
        record.fabric = req.body.fabric;
        await record.save();
        return res.send(record); // when everythinh is fine
});

module.exports= router;
