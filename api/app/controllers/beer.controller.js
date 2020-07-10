const db = require("../models");
const Drink = db.drink;
const Beer = db.beer;


/* ********************
 * Category
 * 
 * 
 * ********************/

exports.createCategory = (req, res) => {

  const category = new Beer({ name: req.params.name })

  category.save((err, category) => {
    if (err) return res.status(500).send({ msg: err });

    res.send({ msg: 'Category Successfully added' })
  })
}

exports.deteteCategory = (req, res) => {
  Beer.findOne({ name: req.params.name }, (err, category) => {
    if (category.items) {
      for (let item of category.items) {
        Drink.deleteOne({ '_id': item }, err => {
          if (err) return res.status(500).send({ msg: err })
        })
      }
    }

  }).then(category => {
    Beer.deleteOne({ '_id': category.id }, err => {
      if (err) return res.status(500).send({ msg: err })
      res.send({ msg: 'Deleted' })
    })
  })

}

exports.getCategorys = (req, res) => {
  Beer.find({})
    .populate('items', '-__v')
    .exec((err, categorys) => {
      if (err) return res.status(500).send({ msg: err });

      let data = {}
      for (let c of categorys) data[c.name] = c

      res.send(data)
    })
}


/* ********************
 *  Drink
 * 
 * 
 * ********************/


exports.createDrink = (req, res) => {

  Beer.findOne({ name: req.body.category }, (err, category) => {
    if (err) {
      res.status(500).send({ msg: err })
      return
    }
    const item = new Drink({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price
    })

    item.save((err, item) => {
      if (err) return res.status(200).send({ msg: err })

      if (!category.items) category.items = []
      category.items.push(item)
      category.save(err => {
        if (err) return res.status(500).send({ msg: err })

        res.send(item)
      })
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
    res.send({ msg: "Food Item updated." })
  })
}


exports.deleteDrink = (req, res) => {
  Drink.deleteOne({ '_id': req.params.id }, (err) => {
    if (err) return res.status(500).send({ msg: err })
    res.send({ msg: "Food Item has been deleted." })
  })
}

