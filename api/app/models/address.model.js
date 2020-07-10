const mongoose = require("mongoose");


const Contact = mongoose.model(
  "Address",
  new mongoose.Schema({
    street: { type : String , unique : true, required : true, dropDups: true },
    city: String,
    province: String,
    postalCode: String,
    country: String
  })
)

module.exports = Contact