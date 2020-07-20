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
      return res.send(categories)
    })
}

exports.showCategory = (req, res) => {
  let newData = {show: req.body.show}
  FoodCategory.findOneAndUpdate({_id: req.params.id}, newData, (err) => {
    if (err) return res.status(500).send({ msg: err })
    return res.send({ msg: "Switch changed." })
  })
}

/* ********************
 * Item
 * 
 * 
 * ********************/


exports.createFoodItem = (req, res) => {
  const newFood = new FoodItem({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  })

  newFood.save((err, new_food)=> {
    if (err) return res.status(500).send({ msg: err })
    FoodCategory.findOneAndUpdate({name: req.body.category}, {$push: {items: new_food}}, (err)=> {
      if(err){
        FoodItem.findByIdAndDelete({_id: new_food._id}, error => res.status(500).send({ msg: error }))
        return res.status(500).send({ msg: err })
      }
      return res.send(new_food)
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

