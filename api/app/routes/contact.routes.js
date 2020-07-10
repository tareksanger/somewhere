const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");


module.exports = (app) => {

  app.get("/api/admin/contact", [authJwt.verifyToken], controller.getContact)

  app.put("/api/admin/contact/:id",[authJwt.verifyToken], controller.updateContact)

  app.put("/api/admin/contact/address/:id",[authJwt.verifyToken], controller.updateAddress)

  

}