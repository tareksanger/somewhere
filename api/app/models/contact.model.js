const mongoose = require("mongoose");


const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    email: { type: String, unique: true, required: true, dropDups: true },
    tel: { type: String, unique: true, required: true, dropDups: true },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address"
    }
  })
)

module.exports = Contact