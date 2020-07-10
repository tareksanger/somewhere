const db = require("../models");
const Contact = db.contact
const FoodCategory = db.foodCategory
const Beer = db.beer
const WineCategory = db.wineCategory
const DrinkCategory = db.drinkCategory



exports.getHomeData = (req, res) => {
  Contact.findOne({}).populate('address', '-__v').exec((err, contact) => {
    if (err) return res.status(500).send({ msg: err })

    const data = {
      contact
    }

    res.send(data)


  })
}


exports.getFoodMenu = (req, res) => {
  FoodCategory.find({}).populate('items', '-__v').exec((err, foodCategories) => {
    if (err) return res.status(500).send({ msg: err })

    let food = {}
    for (let c of foodCategories) food[c.name] = c
    res.send(food)

  })

}


exports.getDrinks = (req, res) => {
  Beer.find({}).populate('items', '-__v').exec((err, beer) => {
    if (err) return res.status(500).send({ msg: err })

      DrinkCategory.find({}).populate('items', '-__v').exec((err, drinks) => {
        if (err) return res.status(500).send({ msg: err })
        const data = {
          beer,
          drinks,
        }
        res.send(data)
      })


  })
}


  exports.getWine = (req, res) => {
    WineCategory.find({}).populate('items', '-__v').exec((err, wine) => {
      if (err) return res.status(500).send({ msg: err })
      res.send(wine)
    })
  }



