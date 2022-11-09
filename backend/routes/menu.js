const express = require('express');
const menuRoutes = express.Router(); //recordRoutes
const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

//getting list of all menu records
menuRoutes.route('/menu').get(function(req,res){
    let db_connect = dbo.getDb("CafeAppDB");
    db_connect
    .collection("CafeMenu")  //records
    .find({})
    .toArray(function(err, result){
        if(err) throw err;
        res.json(result);
    });
});


//getting single record by id
menuRoutes.route('/menu/:id').get(function(req,res) {
    let db_connect = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connect
        .collection('CafeMenu')
        .findOne(myquery, function(err, result) {
            if(err) throw err;
            res.json(result);
        });
});

//creating a new record
menuRoutes.route('/menu/add').post(function(req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        itemStatus: req.body.itemStatus,
    };
    db_connect.collection("CafeMenu").insertOne(myobj, function(err, res) {
        if (err) throw err;
        response.json(res);
    });
});



//updating a rec by id
menuRoutes.route('/update/:id').post(function(req,response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            itemStatus: req.body.itemStatus,
        },
    };
    db_connect
        .collection("CafeMenu")
        .updateOne(myquery, newValues, function(err,res) {
            if(err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

//deleting a record

menuRoutes.route('/:id').delete((req,response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id)};
    db_connect.collection("CafeMenu").deleteOne(myquery, function(err,obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

    module.exports = menuRoutes;