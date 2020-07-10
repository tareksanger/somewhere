const mongoose = require("mongoose");

const wine = mongoose.model(
  "Wine",
  new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    type: { type: String },
    description: String, 
    price5oz: Number,
    price9oz: Number,
    priceBottle: Number,
  })
  
);

module.exports = wine;