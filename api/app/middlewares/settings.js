const db = require("../models");
const Settings = db.settings



const underMaintenance = (req, res, next) => {
  Settings.findOne({}, (err, settings) => {
    if (err) return res.status(500).send({ msg: err })
    if (settings.maintenance) return res.send({ maintenance: true })
    next();
  })
}

const settings = {
  underMaintenance
}

module.exports = settings