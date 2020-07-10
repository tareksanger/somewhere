const mongoose = require("mongoose");

const drink = mongoose.model(
  "Drink",
  new mongoose.Schema({
    name: { type : String , required : true },
    type: { type: String },
    description: String, 
    price: Number 
  })
  
);

module.exports = drink;
