const express = require("express");
const router = express.Router();
// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

//Get route to get burgers info from db
router.get("/", function(req, res){
  burger.all(function(data){
    let hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
//POST route to create/add a new burger
router.post("/api/burgers", function(req, res){
  burger.create([
    "id", "burger_name", "devoured"
  ], [
    req.body.id, req.body.burger_name, req.body.devoured
  ], function(result){
    //return id of new burger created
    res.json({ id: result.insertId });
  });
});
//PUT route to update burger devoured state
router.put("/api/burgers/:id", function(req, res){
  let condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result){
    if (result.changedRows == 0){
      //if no rows changed, then ID is incorrect
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
//DELETE route to delete burger
router.delete("/api/burgers/:id", function(req, res){
  let condition = "id = " + req.params.id;
  
  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});



module.exports = router;
