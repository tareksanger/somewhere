const mongoose = require("mongoose");

const Settings = mongoose.model(
  "Settings",
  new mongoose.Schema({
    maintenance: Boolean
  })
)


module.exports = Settings