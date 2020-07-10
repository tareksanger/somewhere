const db = require("../models");
const FoodItem = db.foodItem;
const FoodCategory = db.foodCategory;


/* ********************
 * Category
 * 
 * 
 * ********************/

exports.createCategory = (req, res) => {

  const category = new FoodCategory({
    name: req.body.name
  })

  category.save((err, category) => {
    if (err) res.status(500).send({ msg: err });
    return res.send({ category })
  })
}

exports.deteteCategory = (req, res) => {
  FoodCategory.findOne({ _id: req.params.id }, (err, category) => {
    if (err) return res.status(500).send({ msg: err })
    if (category.items) {
      for (let item of category.items) {
        FoodItem.deleteOne({ '_id': item }, err => {
          if (err) return res.status(500).send({ msg: err })
        })
      }
    }
  }).then(category => {
    FoodCategory.deleteOne({ '_id': category.id }, err => {
      if (err) return res.status(500).send({ msg: err })
      return res.send({ msg: 'Deleted' })
    })
  })

}

exports.getCategorys = (req, res) => {
  FoodCategory.find({})
    .populate('items', '-__v')
    .exec((err, categories) => {
      if (err) return res.status(500).send({ msg: err });

      let data = {}
      for (let c of categories) {
        data[c.name] = c
      }

      return res.send(data)
    })
}


/* ********************
 * Item
 * 
 * 
 * ********************/


exports.createFoodItem = (req, res) => {

  FoodCategory.findOne({ name: req.body.category }, (err, category) => {
    if (err) return res.status(500).send({ msg: err })

    const item = new FoodItem({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    })

    item.save(async (err, item) => {
      if (err) return res.status(200).send({ msg: err })
        
      if (!category.items) category.items = []
      
      category.items.push(item)
      category.save(err => {
        if (err) return res.status(500).send({ msg: err })
        return res.send(item)
      })
    })
  })
}

exports.updateFoodItem = (req, res) => {
  const newData = {
    name: req.params.name,
    description: req.body.description,
    price: req.body.price,
  }
  FoodItem.findOneAndUpdate({ _id: req.params.id }, newData, err => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Food Item updated." })
  })
}


exports.deleteFoodItem = (req, res) => {
  FoodItem.deleteOne({ '_id': req.params.id }, (err) => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Food Item has been deleted." })
  })
}

