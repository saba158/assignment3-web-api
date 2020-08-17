const express = require('express');
let router = express.Router();
const auth = require ("../../middlewares/auth")
const admin = require ("../../middlewares/admin")
const Validateeveningwear = require ("../../middlewares/validateeveningwear")
var {eveningwear} = require ("../../models/eveningwear");


// get products
router.get("/",  async (req, res) => {
    console.log(req.user);
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
     let skipRecords = perPage * (page - 1);
     let records = await eveningwear.find().skip(skipRecords).limit(perPage);
   
    return res.send(records);
});

// get 1 product
router.get("/:id", async (req, res) => {
    try {
        let record = await eveningwear.findById(req.params.id);
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
router.put("/:id", Validateeveningwear, async (req, res) => {
    try {
        let record = await eveningwear.findById(req.params.id);
        record.name = req.body.name;
        record.price = req.body.price;
        record.productdetails = req.body.productdetails;
        record.color = req.body.color;
        record.fabric = req.body.fabric;
        await record.save();
        return res.send(record); // when everythinh is fine

    } catch (error) {
        return res.status(400).send("invalid id"); // when id is wrong
    }
});

// delete a record
router.delete("/:id", auth, admin, async (req, res) => {
    try {
        let record = await eveningwear.findByIdAndDelete(req.params.id);
        return res.send(record); // when everythinh is fine
    } catch (error) {
        return res.status(400).send("invalid id"); // when id is wrong
    }
});

// insert a record
router.post("/", Validateeveningwear, async (req, res) => {
   
        let record = new eveningwear();
        record.name = req.body.name;
        record.price = req.body.price;
        record.productdetails = req.body.productdetails;
        record.color = req.body.color;
        record.fabric = req.body.fabric;
        await record.save();
        return res.send(record); // when everythinh is fine
});

module.exports= router;
