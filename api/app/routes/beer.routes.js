const { authJwt } = require("../middlewares");
const controller = require("../controllers/beer.controller");


module.exports = (app) => {

  app.get("/api/admin/beer", [authJwt.verifyToken], controller.getCategorys)

  app.put("/api/admin/beer/category",[authJwt.verifyToken], controller.createCategory)

  app.delete("/api/admin/beer/category/:id", [authJwt.verifyToken], controller.deteteCategory)

  // Food Items

  app.post("/api/admin/beer", [authJwt.verifyToken], controller.createDrink)

  app.post("/api/admin/beer/:id", [authJwt.verifyToken], controller.updateDrink)

  app.delete("/api/admin/beer/:id", [authJwt.verifyToken], controller.deleteDrink)


}