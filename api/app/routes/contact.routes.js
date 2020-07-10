const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");


module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/admin/contact", [authJwt.verifyToken], controller.getContact)

  app.put("/api/admin/contact/:id",[authJwt.verifyToken], controller.updateContact)

  app.put("/api/admin/contact/address/:id",[authJwt.verifyToken], controller.updateAddress)

  

}