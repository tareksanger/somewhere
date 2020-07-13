const { authJwt } = require("../middlewares");
const controller = require("../controllers/about.controller");

module.exports = function(app) {

  app.get("/api/admin/about", [authJwt.verifyToken], controller.getAbout);

  app.post("/api/admin/about", [authJwt.verifyToken], controller.updateAbout);
  
  app.post("/api/admin/about/switch", [authJwt.verifyToken], controller.showHideAbout);
};
