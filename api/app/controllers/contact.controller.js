const db = require("../models");
const Contact = db.contanct
const Address = db.address



exports.getContact = (req, res) => {
  Contact.findOne({}, (err, contact) => {
    if (err) return res.status(500).send({ msg: err })
    return res.send(contact)
  })

}

exports.updateContact = (req, res) => {
  const newData = {
    email: req.body.email,
    tel: req.body.tel,
  }
  Contact.findOneAndUpdate({ _id: req.params.id }, newData, err => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Contact Updated!" })
  })
}

exports.updateAddress = (req, res) => {
  const newData = {
    street: req.body.street,
    city: req.body.city,
    province: req.body.province,
    postalCode: req.body.postalCode,
    country: req.body.country
  }
  Address.findOneAndUpdate({ _id: req.params.id }, newData, err => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Address Updated!" })
  })
}