const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const db = {};

db.mongoose = mongoose;

db.settings = require("./settings.model")

db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

db.contact = require("./contact.model")
db.address = require("./address.model")
db.about = require("./about.model")

db.foodItem = require("./foodItem.model");
db.foodCategory = require("./foodCategory.model")

db.drink = require("./drink.model")
db.drinkCategory = require("./drinkCategory.model")
db.beer = require("./beer.model")

db.wine = require("./wine.model")
db.wineCategory = require("./wineCategory.model")

module.exports = db;