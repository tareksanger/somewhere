const mongoose = require("mongoose");

const DrinkCategory = mongoose.model(
  "Wine_Category",
  new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wine"
      }
    ]
  })
  
);

module.exports = DrinkCategory;