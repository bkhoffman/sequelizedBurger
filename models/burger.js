// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

let burger = {
  //select all burgers from db
  all: function(cb){
    orm.all("burgers", function(res){
      cb(res);
    });
  },
  //create new burger
  create: function(cols, vals, cb){
    orm.create("burgers", cols, vals, function(res){
      cb(res);
    });
  },
  //update condition to change burger devoured state
  update: function(objColVals, condition, cb){
    orm.update("burgers", objColVals, condition, function(res){
      cb(res);
    });
  },
  //delete burger from db
  delete: function(condition, cb){
    orm.delete("burgers", condition, function(res){
      cb(res);
    });
  }
};

module.exports = burger;