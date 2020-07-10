const { authJwt } = require("../middlewares");
const controller = require("../controllers/drink.controller");


module.exports = (app) => {

  app.get("/api/admin/drinks", [authJwt.verifyToken], controller.getCategorys)

  app.put("/api/admin/drinks/category",[authJwt.verifyToken], controller.createCategory)

  app.delete("/api/admin/drinks/category/:id", [authJwt.verifyToken], controller.deteteCategory)

  // Food Items

  app.post("/api/admin/drinks", [authJwt.verifyToken], controller.createDrink)

  app.post("/api/admin/drinks/:id", [authJwt.verifyToken], controller.updateDrink)

  app.delete("/api/admin/drinks/:id", [authJwt.verifyToken], controller.deleteDrink)


}