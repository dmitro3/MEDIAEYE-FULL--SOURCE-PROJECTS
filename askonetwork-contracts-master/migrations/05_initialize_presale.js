const { scripts, ConfigManager } = require("@openzeppelin/cli")
const { add, push, create } = scripts
const {publicKey} = require("../privatekey")

const config = require("../config")

const AskoToken = artifacts.require("AskoToken")
const AskoStaking = artifacts.require("AskoStaking")
const AskoPresale = artifacts.require("AskoPresale")

async function initialize(accounts,networkName) {
  let owner = accounts[0]

  const tokenParams =   config.AskoToken
  const stakingParams = config.AskoStaking
  const presaleParams = config.AskoPresale
  const launchParams =  config.Launch

  const askoToken =   await AskoToken.deployed()
  const askoStaking = await AskoStaking.deployed()
  const askoPresale = await AskoPresale.deployed()

  await askoToken.initialize(
    tokenParams.name,
    tokenParams.symbol,
    tokenParams.decimals,
    owner,
    tokenParams.taxBP,
    askoStaking.address
  )

  await askoStaking.initialize(
    stakingParams.stakingTaxBP,
    stakingParams.unstakingTaxBP,
    owner,
    askoToken.address
  )

  await askoToken.mint(
    askoPresale.address,
    presaleParams.totalPresaleTokens.add(presaleParams.totalUniswapTokens)
  )

  await askoPresale.initialize(
    presaleParams.buybackBP,
    presaleParams.devfundBP,
    presaleParams.maxBuyPerAddress,
    presaleParams.maximumPresaleEther,
    presaleParams.requiresWhitelisting,
    presaleParams.totalPresaleTokens,
    presaleParams.totalUniswapTokens,
    owner,
    askoToken.address
  )

  askoPresale.setStartTime(launchParams.startTime.toString(),{from:owner})

}

module.exports = function(deployer, networkName, accounts) {
  deployer.then(async () => {
    await initialize(accounts,networkName)
  })
}
