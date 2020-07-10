const { settings } = require("../middlewares");
const controller = require("../controllers/main.controller");


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/home", [settings.underMaintenance], controller.getHomeData)

  app.get("/api/home/food", [], controller.getFoodMenu)

  app.get("/api/home/drinks", [], controller.getDrinks)

  app.get("/api/home/wine", [], controller.getWine)

}