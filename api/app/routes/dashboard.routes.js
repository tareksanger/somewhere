const { authJwt } = require("../middlewares");
const controller = require("../controllers/dashboard.controller");


module.exports = (app) => {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/admin/dashboard', [authJwt.verifyToken], controller.getDashboardData)

  app.put('/api/admin/settings/maintenance', [authJwt.verifyToken], controller.setMaintenance)


  app.get('/api/admin/contact', [authJwt.verifyToken], controller.getContact)
  app.put('/api/admin/contact', [authJwt.verifyToken], controller.updateContact)


  app.get('/api/admin/address', [authJwt.verifyToken], controller.getAddress)
  app.post('/api/admin/address', [authJwt.verifyToken], controller.updateAddress)

}