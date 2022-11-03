const { scripts, ConfigManager } = require("@openzeppelin/cli")
const { add, push, create } = scripts
const {publicKey} = require("../privatekey")

const config = require("../config")

const AskoToken = artifacts.require("AskoToken")
const AskoStaking = artifacts.require("AskoStaking")
const AskoStakingRewardPool = artifacts.require("AskoStakingRewardPool")

async function initialize(accounts,networkName) {
  let owner = accounts[0]

  const tokenParams =   config.AskoToken
  const stakingParams = config.AskoStaking
  const stakingRewardPoolParams = config.AskoStakingRewardPool

  const askoToken =   await AskoToken.deployed()
  const askoStaking = await AskoStaking.deployed()
  const askoStakingRewardPool = await AskoStakingRewardPool.deployed()

  await askoStakingRewardPool.initialize(
    stakingRewardPoolParams.releaseBP,
    stakingRewardPoolParams.releaseInterval,
    stakingRewardPoolParams.cycleStart,
    owner,
    askoToken.address,
    askoStaking.address
  )

  await askoToken.setTaxExemptStatus(askoStakingRewardPool.address,true,{from:owner})
  await askoToken.mint(askoStakingRewardPool.address,stakingRewardPoolParams.size,{from: owner})
  await askoStaking.registerStakeHandler(askoStakingRewardPool.address,{from:owner})
}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    await initialize(accounts,networkName)
  })
}
