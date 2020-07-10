const { authJwt } = require("../middlewares");
const controller = require("../controllers/drink.controller");


module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/admin/drinks", [authJwt.verifyToken], controller.getCategorys)

  app.put("/api/admin/drinks/category",[authJwt.verifyToken], controller.createCategory)

  app.delete("/api/admin/drinks/category/:id", [authJwt.verifyToken], controller.deteteCategory)

  // Food Items

  app.post("/api/admin/drinks", [authJwt.verifyToken], controller.createDrink)

  app.post("/api/admin/drinks/:id", [authJwt.verifyToken], controller.updateDrink)

  app.delete("/api/admin/drinks/:id", [authJwt.verifyToken], controller.deleteDrink)


}