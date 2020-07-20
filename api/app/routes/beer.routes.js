const { authJwt } = require("../middlewares");
const controller = require("../controllers/beer.controller");


module.exports = (app) => {

  app.get("/api/admin/beer", [authJwt.verifyToken], controller.getCategorys)

  app.put("/api/admin/beer/category",[authJwt.verifyToken], controller.createCategory)

  app.delete("/api/admin/beer/category/:id", [authJwt.verifyToken], controller.deteteCategory)

  app.put('/api/admin/beer/category/switch/:id', [authJwt.verifyToken], controller.showCategory)

  // Food Items

  app.post("/api/admin/beer", [authJwt.verifyToken], controller.createDrink)

  app.post("/api/admin/beer/:id", [authJwt.verifyToken], controller.updateDrink)

  app.delete("/api/admin/beer/:id", [authJwt.verifyToken], controller.deleteDrink)


}