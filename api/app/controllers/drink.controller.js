const db = require("../models");
const Drink = db.drink;
const DrinkCategory = db.drinkCategory;


/* ********************
 * Category
 * 
 * 
 * ********************/

exports.createCategory = (req, res) => {

  const category = new DrinkCategory({ name: req.body.name })

  category.save((err, category) => {
    if (err) return res.status(500).send({ msg: err });

    return res.send({ category })
  })
}

exports.deteteCategory = (req, res) => {
  DrinkCategory.findOne({ _id: req.params.id }, async(err, category) => {
    if (err) return res.status(500).send({ msg: err })
    if (category.items) {
      for (let item of category.items) {
        Drink.deleteOne({ '_id': item }, err => {
          if (err) return res.status(500).send({ msg: err })
        })
      }
    }
  }).then(category => {
    DrinkCategory.deleteOne({ '_id': category.id }, err => {
      if (err) return res.status(500).send({ msg: err })
      return res.send({ msg: 'Deleted' })
    })
  })
}

exports.getCategorys = (req, res) => {
  DrinkCategory.find({})
    .populate('items', '-__v')
    .exec((err, categorys) => {
      if (err) return res.status(500).send({ msg: err });

      let data = {}
      for (let c of categorys) data[c.name] = c

      return res.send(data)
    })
}


/* ********************
 *  Drink
 * 
 * 
 * ********************/


exports.createDrink = (req, res) => {
  const newDrink = new Drink({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price
  })

  newDrink.save((err, new_drink)=> {
    if (err) return res.status(500).send({ msg: err })

    DrinkCategory.findOneAndUpdate({name: req.body.category}, {$push: {items: new_drink}}, (err)=> {
      if(err){
        Drink.findByIdAndDelete({_id: new_drink._id}, error => res.status(500).send({ msg: error }))
        return res.status(500).send({ msg: err })
      }
      return res.send(new_drink)

    })

  })
}

exports.updateDrink = (req, res) => {
  const newData = {
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
  }
  Drink.findOneAndUpdate({ _id: req.params.id }, newData, err => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Food Item updated." })
  })
}


exports.deleteDrink = (req, res) => {
  Drink.deleteOne({ '_id': req.params.id }, (err) => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Food Item has been deleted." })
  })
}

