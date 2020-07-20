const db = require("../models");
const Wine = db.wine;
const WineCategory = db.wineCategory;


/* ********************
 * Category
 * 
 * 
 * ********************/

exports.createCategory = (req, res) => {

  const category = new WineCategory({ name: req.body.name })

  category.save((err, category) => {
    if (err) return res.status(500).send({ msg: err });

    return res.send({ category })
  })
}

exports.deteteCategory = (req, res) => {
  WineCategory.findOne({ _id: req.params.id }, async (err, category) => {
    if (err) return res.status(500).send({ msg: err })
    if (category.items) {
      for (let item of category.items) {
        Wine.deleteOne({ '_id': item }, err => {
          if (err) return res.status(500).send({ msg: err })
        })
      }
    }
  }).then(category => {
    WineCategory.deleteOne({ '_id': category.id }, err => {
      if (err) return res.status(500).send({ msg: err })
      return res.send({ msg: 'Deleted' })
    })
  })

}

exports.getCategorys = (req, res) => {
  WineCategory.find({})
    .populate('items', '-__v')
    .exec((err, categories) => {
      if (err) return res.status(500).send({ msg: err });
      return res.send(categories)
    })
}

exports.showCategory = (req, res) => {
  let newData = {show: req.body.show}
  WineCategory.findOneAndUpdate({_id: req.params.id}, newData, (err) => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Switch changed." })
  })
}


/* ********************
 *  Wine
 * 
 * 
 * ********************/


exports.createWine = (req, res) => {
  const newWine = new Wine({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price5oz: req.body.price5oz,
    price9oz: req.body.price9oz,
    priceBottle: req.body.priceBottle,
  })

  newWine.save((err, new_drink)=> {
    if (err) return res.status(500).send({ msg: err })

    WineCategory.findOneAndUpdate({name: req.body.category}, {$push: {items: new_drink}}, (err)=> {
      if(err){
        Wine.findByIdAndDelete({_id: new_drink._id}, error => res.status(500).send({ msg: error }))
        return res.status(500).send({ msg: err })
      }
      return res.send(new_drink)
    })

  })
}

exports.updateWine = (req, res) => {
  const newData = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price5oz: req.body.price5oz,
    price9oz: req.body.price9oz,
    priceBottle: req.body.priceBottle,
  }
  Wine.findOneAndUpdate({ _id: req.params.id }, newData, err => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Food Item updated." })
  })
}


exports.deleteWine = (req, res) => {
  Wine.deleteOne({ '_id': req.params.id }, (err) => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Food Item has been deleted." })
  })
}

