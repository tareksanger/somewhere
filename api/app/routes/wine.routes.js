const { authJwt } = require("../middlewares");
const controller = require("../controllers/wine.controller");


module.exports = (app) => {


  app.get("/api/admin/wine", [authJwt.verifyToken], controller.getCategorys)

  app.put("/api/admin/wine/category",[authJwt.verifyToken], controller.createCategory)

  app.delete("/api/admin/wine/category/:id", [authJwt.verifyToken], controller.deteteCategory)

  // Food Items

  app.post("/api/admin/wine", [authJwt.verifyToken], controller.createWine)

  app.post("/api/admin/wine/:id", [authJwt.verifyToken], controller.updateWine)

  app.delete("/api/admin/wine/:id", [authJwt.verifyToken], controller.deleteWine)


}