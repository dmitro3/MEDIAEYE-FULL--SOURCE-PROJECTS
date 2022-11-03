const { scripts, ConfigManager } = require('@openzeppelin/cli');
const { add, push, create } = scripts;
const {publicKey} = require("../privatekey")

const config = require("../config")

const AskoToken = artifacts.require("AskoToken")
const AskoStaking = artifacts.require("AskoStaking")

const AskoDevfund = artifacts.require("AskoDevfund")
const AskoPromoFund = artifacts.require("AskoPromoFund")
const AskoTeamLock = artifacts.require("AskoTeamLock")

async function initialize(accounts,networkName){
    let owner = accounts[0]

    const devfundParams = config.AskoDevFund
    const promoParams = config.AskoPromoFund
    const teamLockParams = config.AskoTeamLock

    const askoToken =   await AskoToken.deployed()
    const askoStaking = await AskoStaking.deployed()

    const askoDevfund =   await AskoDevfund.deployed()
    const askoPromoFund =   await AskoPromoFund.deployed()
    const askoTeamLock = await AskoTeamLock.deployed()

    await askoDevfund.initialize(
      devfundParams.releaseAmount,
      devfundParams.releaseInterval,
      devfundParams.releaseStart,
      devfundParams.authorizor,
      devfundParams.releaser,
      askoToken.address,
      askoStaking.address
    )

    await askoPromoFund.initialize(
      promoParams.authorizor,
      promoParams.releaser,
      askoToken.address
    )

    await askoTeamLock.initialize(
      teamLockParams.releaseAmount,
      teamLockParams.releaseInterval,
      teamLockParams.releaseStart,
      teamLockParams.teamMembers,
      askoToken.address
    )

    askoToken.mint(askoDevfund.address,devfundParams.size,{from:owner})
    askoToken.mint(askoPromoFund.address,promoParams.size,{from:owner})
    askoToken.mint(askoTeamLock.address,teamLockParams.size,{from:owner})

}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    await initialize(accounts,networkName)
  })
}
