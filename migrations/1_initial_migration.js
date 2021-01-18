const Migrations = artifacts.require("Migrations");
const franco = artifacts.require('francoCoin');

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(franco,"francoCoin","FRT",3,21000000000)
};
