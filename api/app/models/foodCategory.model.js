const mongoose = require("mongoose");

const FoodCategory = mongoose.model(
  "Food_Category",
  new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food_Item"
      }
    ]
  })
);

module.exports = FoodCategory;
