const { authJwt } = require("../middlewares");
const controller = require("../controllers/food.controller");

module.exports = function(app) {

  app.get("/api/admin/food", [authJwt.verifyToken], controller.getCategorys)

  app.put("/api/admin/food/category",[authJwt.verifyToken], controller.createCategory)

  app.delete("/api/admin/food/category/:id", [authJwt.verifyToken], controller.deteteCategory)

  // Food Items

  app.post("/api/admin/food", [authJwt.verifyToken], controller.createFoodItem)

  app.post("/api/admin/food/:id", [authJwt.verifyToken], controller.updateFoodItem)

  app.delete("/api/admin/food/:id", [authJwt.verifyToken], controller.deleteFoodItem)

};
