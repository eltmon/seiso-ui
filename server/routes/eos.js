var eos = require('../controllers/eos');

module.exports = function(router) {

  router.use(assureAuth);

  router.post('/convict', eos.convict);
  router.post('/deploy', eos.deploy);
  router.post('/interrogate', eos.interrogate);
  router.post('/maintenanceMode', eos.maintenanceMode);
  router.post('/setActive', eos.setActive);
  router.post('/soak', eos.soak);

  function assureAuth(req, res, next) {
    if (req.isAuthenticated() && req.user) {
      next();
    } else {
      res.status(401).json({msg: 'Not Authorized.'});
    }
  }
};
