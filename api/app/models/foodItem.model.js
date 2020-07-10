const mongoose = require("mongoose");

const FoodItem = mongoose.model(
  "Food_Item",
  new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    description: String, 
    price: Number 
  })
  
);

module.exports = FoodItem;
