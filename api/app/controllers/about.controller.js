const db = require("../models")
const About = db.about


exports.getAbout = (req, res) => {
  About.findOne({}, (err, about)=> {
    if (err) return res.status(500).send({ msg: err });
    return res.send(about)
  })
}


exports.updateAbout = (req, res) => {
  const newData = {
    text: req.body.text,
  }
  About.findOneAndUpdate({}, newData, err => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({msg: "About has been updated!"})
  })

}

exports.showHideAbout = (req, res) => {
  const newData = {
    show: req.body.show,
  }
  About.findOneAndUpdate({}, newData, err => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({msg: "About has been updated!"})
  })
}


