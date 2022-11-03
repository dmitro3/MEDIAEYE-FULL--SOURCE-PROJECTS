const { scripts, ConfigManager } = require('@openzeppelin/cli');
const { add, push, create } = scripts;
const {publicKey} = require("../privatekey")

const config = require("../config")

const AskoToken = artifacts.require("AskoToken")
const AskoStaking = artifacts.require("AskoStaking")

const AskoDevfund = artifacts.require("AskoDevfund")
const AskoPromoFund = artifacts.require("AskoPromoFund")
const AskoTeamLock = artifacts.require("AskoTeamLock")

async function deploy(options) {
  add({ contractsData: [
    { name: 'AskoDevfund', alias: 'AskoDevfund' },
    { name: 'AskoPromoFund', alias: 'AskoPromoFund' },
    { name: 'AskoTeamLock', alias: 'AskoTeamLock' }
  ] });
  await push(options);
  await create(Object.assign({ contractAlias: 'AskoDevfund' }, options));
  await create(Object.assign({ contractAlias: 'AskoPromoFund' }, options));
  await create(Object.assign({ contractAlias: 'AskoTeamLock' }, options));
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    let account = accounts[0]
    const { network, txParams } = await ConfigManager.initNetworkConfiguration({ network: networkName, from: account })
    await deploy({ network, txParams })
  })
}
