'use strict';

var convictCtrl = require('./eos-convict-controller'),
    deployCtrl = require('./eos-deploy-controller'),
    intCtrl = require('./eos-interrogate-controller'),
    mmCtrl = require('./eos-maintenance-mode-controller'),
    reloadCtrl = require('./eos-reload-controller'),
    setActiveCtrl = require('./eos-set-active-controller'),
    soakCtrl = require('./eos-soak-controller');

module.exports = function(angular) {

  var eosModule = angular.module('external.eos', []);

  eosModule.controller('EosConvictController', convictCtrl);
  eosModule.controller('EosDeployController', deployCtrl);
  eosModule.controller('EosInterrogateController', intCtrl);
  eosModule.controller('EosMaintenanceModeController', mmCtrl);
  eosModule.controller('EosReloadController', reloadCtrl);
  eosModule.controller('EosSetActiveController', setActiveCtrl);
  eosModule.controller('EosSoakController', soakCtrl);

};