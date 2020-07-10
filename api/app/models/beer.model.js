const mongoose = require("mongoose");

const Beer = mongoose.model(
  "Beer",
  new mongoose.Schema({
    name: { type : String , unique : true, required : true, dropDups: true },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Drink"
      }
    ]
  })
  
);

module.exports = Beer;
