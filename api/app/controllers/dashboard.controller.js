const db = require("../models");
const Settings = db.settings
const Contact = db.contact
const Address = db.address


exports.getDashboardData = (req, res) => {
  Settings.findOne({}, (err, settings)=> {
    if(err) return res.status(500).send({msg: err})
    return res.send({settings})
  })

}

exports.setMaintenance = (req, res ) => {

  let newData = {maintenance: req.body.maintenance }

  Settings.findOneAndUpdate({}, newData, {upsert: true}, (err, doc)=> {
    if(err) return res.status(500).send({msg: err})
    return res.send({msg: 'Updated!'})
  })
}

exports.setMaintenance = (req, res ) => {

  let newData = {maintenance: req.body.maintenance }

  Settings.findOneAndUpdate({}, newData, {upsert: true}, (err, doc)=> {
    if(err) return res.status(500).send({msg: err})
    return res.send({msg: 'Updated!'})
  })
}

exports.getContact = (req, res) => {
  Contact.findOne({}, (err, contact)=> {
    if(err) return res.status(500).send({msg: err})
    return res.send(contact)


  })

}

exports.updateContact = (req, res) => {
  let newData = {email: req.body.email, tel: req.body.tel}
  Contact.findOneAndUpdate({}, newData, {upsert: true}, (err, doc)=> {
    if(err) return res.status(500).send({msg: err})
    return res.send({msg: 'Updated!'})
  })
}


exports.getAddress= (req, res) => {
  Address.findOne({}, (err, address)=> {
    if(err) return res.status(500).send({msg: err})
    return res.send(address)
  })

}

exports.updateAddress = (req, res) => {
  let newData = {street: req.body.street, city: req.body.city}
  Address.findOneAndUpdate({}, newData, {upsert: true}, (err, doc)=> {
    if(err) return res.status(500).send({msg: err})
    return res.send({msg: 'Updated!'})
  })
}