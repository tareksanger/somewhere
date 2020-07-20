const { authJwt } = require("../middlewares");
const controller = require("../controllers/wine.controller");


module.exports = (app) => {


  app.get("/api/admin/wine", [authJwt.verifyToken], controller.getCategorys)

  app.put("/api/admin/wine/category",[authJwt.verifyToken], controller.createCategory)

  app.delete("/api/admin/wine/category/:id", [authJwt.verifyToken], controller.deteteCategory)

  app.put('/api/admin/wine/category/switch/:id', [authJwt.verifyToken], controller.showCategory)

  // Food Items

  app.post("/api/admin/wine", [authJwt.verifyToken], controller.createWine)

  app.post("/api/admin/wine/:id", [authJwt.verifyToken], controller.updateWine)

  app.delete("/api/admin/wine/:id", [authJwt.verifyToken], controller.deleteWine)


}