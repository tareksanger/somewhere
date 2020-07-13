const mongoose = require("mongoose");


const About = mongoose.model(
  "About",
  new mongoose.Schema({
    text: String,
    show: {type: Boolean, default: false},
  })
)

module.exports = About