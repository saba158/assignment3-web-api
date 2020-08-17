const express = require('express');
let router = express.Router();
const auth = require ("../../middlewares/auth")
const admin = require ("../../middlewares/admin")
const Validatelookbook = require ("../../middlewares/validatelookbook")
var {lookbook} = require ("../../models/lookbook");


// get products
router.get("/",  async (req, res) => {
    console.log(req.user);
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
     let skipRecords = perPage * (page - 1);
     let records = await lookbook.find().skip(skipRecords).limit(perPage);
   
    return res.send(records);
});

// get 1 product
router.get("/:id", async (req, res) => {
    try {
        let record = await lookbook.findById(req.params.id);
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
router.put("/:id", Validatelookbook, async (req, res) => {
    try {
        let record = await lookbook.findById(req.params.id);
        record.name = req.body.name;
        record.productdetails = req.body.productdetails;
        await record.save();
        return res.send(record); // when everythinh is fine

    } catch (error) {
        return res.status(400).send("invalid id"); // when id is wrong
    }
});

// delete a record
router.delete("/:id", auth, admin, async (req, res) => {
    try {
        let record = await lookbook.findByIdAndDelete(req.params.id);
        return res.send(record); // when everythinh is fine
    } catch (error) {
        return res.status(400).send("invalid id"); // when id is wrong
    }
});

// insert a record
router.post("/", Validatelookbook, async (req, res) => {
   
        let record = new lookbook();
        record.name = req.body.name;
        record.productdetails = req.body.productdetails;
        await record.save();
        return res.send(record); // when everythinh is fine
});

module.exports= router;
