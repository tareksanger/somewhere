const { settings } = require("../middlewares");
const controller = require("../controllers/main.controller");


module.exports = function (app) {
  
  app.get("/api/home", [settings.underMaintenance], controller.getHomeData)

  app.get("/api/home/food", [], controller.getFoodMenu)

  app.get("/api/home/drinks", [], controller.getDrinks)

  app.get("/api/home/wine", [], controller.getWine)

}