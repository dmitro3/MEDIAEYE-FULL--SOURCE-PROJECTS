const { accounts, contract, web3 } = require("@openzeppelin/test-environment")
const { expectRevert, time, BN, ether, balance } = require("@openzeppelin/test-helpers")
const {expect} = require("chai")
const config = require("../config")

const SECONDS_PER_DAY = 86400

const AskoToken = contract.fromArtifact("AskoToken")
const AskoStaking = contract.fromArtifact("AskoStaking")
const AskoStakingRewardPool = contract.fromArtifact("AskoStakingRewardPool")

const owner = accounts[0]
const registeredStakers = [accounts[1],accounts[2],accounts[3],accounts[4],accounts[5],accounts[6],accounts[7],accounts[8]]
const nonRegisteredStaker = accounts[9]

describe("AskoStakingRewardPool", function() {
  before(async function() {
    const tokenParams = config.AskoToken
    const stakingParams = config.AskoStaking
    const stakingRewardPoolParams = config.AskoStakingRewardPool

    this.askoToken = await AskoToken.new()
    this.askoStaking = await AskoStaking.new()
    this.askoStakingRewardPool = await AskoStakingRewardPool.new()

    await this.askoToken.initialize(
      tokenParams.name,
      tokenParams.symbol,
      tokenParams.decimals,
      owner,
      tokenParams.taxBP,
      this.askoStaking.address
    )
    await this.askoStaking.initialize(
      stakingParams.stakingTaxBP,
      stakingParams.unstakingTaxBP,
      owner,
      this.askoToken.address
    )
    await this.askoStakingRewardPool.initialize(
      stakingRewardPoolParams.releaseBP,
      stakingRewardPoolParams.releaseInterval,
      stakingRewardPoolParams.cycleStart,
      owner,
      this.askoToken.address,
      this.askoStaking.address
    )

    await this.askoToken.setIsTaxActive(true,{from:owner})
    await this.askoToken.setTaxExemptStatus(this.askoStakingRewardPool.address,true,{from:owner})

    await this.askoStaking.setStartTime(stakingParams.startTime,{from:owner})
    await this.askoStaking.registerStakeHandler(this.askoStakingRewardPool.address,{from:owner})

    await Promise.all([
      this.askoToken.mint(registeredStakers[0],ether('25'),{from: owner}),
      this.askoToken.mint(registeredStakers[1],ether('25'),{from: owner}),
      this.askoToken.mint(registeredStakers[2],ether('25'),{from: owner}),
      this.askoToken.mint(registeredStakers[3],ether('25'),{from: owner}),
      this.askoToken.mint(registeredStakers[4],ether('25'),{from: owner}),
      this.askoToken.mint(registeredStakers[5],ether('25'),{from: owner}),
      this.askoToken.mint(registeredStakers[6],ether('25'),{from: owner}),
      this.askoToken.mint(nonRegisteredStaker,ether('25'),{from: owner}),
      this.askoToken.mint(this.askoStakingRewardPool.address,stakingRewardPoolParams.size,{from: owner})
    ])
  })
  describe("Stateless", function() {
    describe("#handleStake", function(){
      it("Should revert", async function() {
        const staker = registeredStakers[0]
        await expectRevert(
          this.askoStakingRewardPool.handleStake(staker,"100","100",{from:staker}),
          "Sender must be AskoStaking sc."
        )
      })
    })
    describe("#handleUnstake", function(){
      it("Should revert", async function() {
        const staker = registeredStakers[0]
        await expectRevert(
          this.askoStakingRewardPool.handleUnstake(staker,"100","100",{from:staker}),
          "Sender must be AskoStaking sc."
        )
      })
    })
  })
  describe("State: Cycle 0", function() {
    describe("#getCurrentCycleCount", function() {
      it("Should be 0", async function() {
        const cycle = await this.askoStakingRewardPool.getCurrentCycleCount()
        expect(cycle.toString()).to.equal("0")
      })
    })
    describe("#register", function(){
      it("Should set registeredStakers to true", async function() {
        const staker = registeredStakers[0]
        await this.askoStakingRewardPool.register({from:staker})
        let isRegistered = await this.askoStakingRewardPool.isStakerRegistered(staker)
        expect(isRegistered).to.equal(true)
      })
      it("Should increase cycleStakerPoolOwnership for next cycle by stakeValue when stake then register.", async function() {
        const staker = registeredStakers[1]
        const value = ether("5")
        await this.askoStaking.stake(value,{from:staker})
        await this.askoStakingRewardPool.register({from:staker})
        const registrantAmount = await this.askoStakingRewardPool.cycleStakerPoolOwnership("1",staker)
        const stakeValue = await this.askoStaking.stakeValue(staker)
        expect(registrantAmount.toString()).to.equal(stakeValue.toString())
      })
      it("Should increase cycleStakerPoolOwnership for next cycle by stakeValue when register then stake.", async function() {
        const staker = registeredStakers[2]
        const value = ether("5")
        await this.askoStakingRewardPool.register({from:staker})
        await this.askoStaking.stake(value,{from:staker})
        const registrantAmount = await this.askoStakingRewardPool.cycleStakerPoolOwnership("1",staker)
        const stakeValue = await this.askoStaking.stakeValue(staker)
        expect(registrantAmount.toString()).to.equal(stakeValue.toString())
      })
      it("Should increase cycleStakerPoolOwnership for next cycle by final stakeValue when stake, unstake, then register", async function() {
        const staker = registeredStakers[3]
        const value = ether("5")
        const unstakeValue = ether("3")
        await this.askoStakingRewardPool.register({from:staker})
        await this.askoStaking.stake(value,{from:staker})
        await this.askoStaking.unstake(unstakeValue,{from:staker})
        const registrantAmount = await this.askoStakingRewardPool.cycleStakerPoolOwnership("1",staker)
        const stakeValue = await this.askoStaking.stakeValue(staker)
        expect(registrantAmount.toString()).to.equal(stakeValue.toString())
      })
      it("Should increase cyclePoolTotal for next cycle by stakeValue on stake.", async function() {
        const staker = registeredStakers[0]
        const value = ether("5")
        const cycleTotalRegisteredInitial = await this.askoStakingRewardPool.cyclePoolTotal("1")
        await this.askoStaking.stake(value,{from:staker})
        const stakeValue = await this.askoStaking.stakeValue(staker)
        const cycleTotalRegisteredFinal = await this.askoStakingRewardPool.cyclePoolTotal("1")
        expect(cycleTotalRegisteredFinal.toString())
          .to.equal(new BN(cycleTotalRegisteredInitial).add(new BN(stakeValue)).toString())
      })
    })
    describe("#claim", function(){
      it("Should revert during cycle 0.", async function() {
        const staker = nonRegisteredStaker
        await expectRevert(
          this.askoStakingRewardPool.claim("0",{from:staker}),
          "Has not yet started."
        )
      })
    })
    describe("#calculatePayout", function(){
      it("Should be 0 for nonregistered", async function() {
        const staker = nonRegisteredStaker
        let payout = await this.askoStakingRewardPool.calculatePayout(staker,"1");
        expect("0").to.equal(payout.toString())
      })
    })
    describe("#calculatePayout", function(){
      it("Should be 0 for cycle 0", async function() {
        const staker = registeredStakers[0]
        let payout = await this.askoStakingRewardPool.calculatePayout(staker,"0");
        expect("0").to.equal(payout.toString())
      })
    })
    describe("#calculatePayout", function(){
      it("Should be basispoints of contract balance * percent ownership for next cycle", async function() {
        const staker = registeredStakers[1]
        const cycleStakerPoolOwnership = await this.askoStakingRewardPool.cycleStakerPoolOwnership("1",staker)
        const cyclePoolTotal = await this.askoStakingRewardPool.cyclePoolTotal("1")
        const cycleTotalReward = await this.askoStakingRewardPool.cycleTotalReward("1")
        const cycleStakerClaimed = await this.askoStakingRewardPool.cycleStakerClaimed("1",staker)
        const isStakerRegistered = await this.askoStakingRewardPool.isStakerRegistered(staker)
        const balance = await this.askoToken.balanceOf(this.askoStakingRewardPool.address)
        let payout = await this.askoStakingRewardPool.calculatePayout(staker,"1")
        let expectedPayout = (cycleStakerPoolOwnership)
          .mul(new BN(config.AskoStakingRewardPool.size))
          .mul(new BN(config.AskoStakingRewardPool.releaseBP))
          .div(new BN(10000))
          .div(cyclePoolTotal)
        expect("0").to.not.equal(payout.toString())
        expect(expectedPayout.toString()).to.equal(payout.toString())
      })
    })
  })
  describe("State: Cycle 1", function() {
    before(async function() {
      await time.advanceBlock()
      let latest = await time.latest()
      await time.increase(SECONDS_PER_DAY*30)
    })
    describe("#getCurrentCycleCount", function() {
      it("Should be 1", async function() {
        const cycle = await this.askoStakingRewardPool.getCurrentCycleCount()
        expect(cycle.toString()).to.equal("1")
      })
    })
    describe("#register", function(){
      it("Should set registeredStakers to true", async function() {
        const staker = registeredStakers[4]
        await this.askoStakingRewardPool.register({from:staker})
        let isRegistered = await this.askoStakingRewardPool.isStakerRegistered(staker)
        expect(isRegistered).to.equal(true)
      })
      it("Should increase cycleStakerPoolOwnership for next cycle by stakeValue when stake then register.", async function() {
        const staker = registeredStakers[5]
        const value = ether("5")
        await this.askoStaking.stake(value,{from:staker})
        await this.askoStakingRewardPool.register({from:staker})
        const registrantAmount = await this.askoStakingRewardPool.cycleStakerPoolOwnership("2",staker)
        const stakeValue = await this.askoStaking.stakeValue(staker)
        expect(registrantAmount.toString()).to.equal(stakeValue.toString())
      })
      it("Should increase cycleStakerPoolOwnership for next cycle by stakeValue when register then stake.", async function() {
        const staker = registeredStakers[6]
        const value = ether("5")
        await this.askoStakingRewardPool.register({from:staker})
        await this.askoStaking.stake(value,{from:staker})
        const registrantAmount = await this.askoStakingRewardPool.cycleStakerPoolOwnership("2",staker)
        const stakeValue = await this.askoStaking.stakeValue(staker)
        expect(registrantAmount.toString()).to.equal(stakeValue.toString())
      })
      it("Should increase cyclePoolTotal for next cycle by stakeValue on stake.", async function() {
        const staker = registeredStakers[4]
        const value = ether("5")
        const cycleTotalRegisteredInitial = await this.askoStakingRewardPool.cyclePoolTotal("2")
        await this.askoStaking.stake(value,{from:staker})
        const stakeValue = await this.askoStaking.stakeValue(staker)
        const cycleTotalRegisteredFinal = await this.askoStakingRewardPool.cyclePoolTotal("2")
        expect(cycleTotalRegisteredFinal.toString())
          .to.equal(new BN(cycleTotalRegisteredInitial).add(new BN(stakeValue)).toString())
      })
    })
    describe("#claim", function(){
      it("Should revert during cycle 1.", async function() {
        const staker = registeredStakers[5]
        await expectRevert(
          this.askoStakingRewardPool.claim("0",{from:staker}),
          "Cannot claim for tokens staked before first cycle starts."
        )
        await expectRevert(
          this.askoStakingRewardPool.claim("1",{from:staker}),
          "Can only claim for previous cycles."
        )
        await expectRevert(
          this.askoStakingRewardPool.claim("2",{from:staker}),
          "Can only claim for previous cycles."
        )
      })
      //TODO: Add claim tests
    })
    describe("#calculatePayout", function(){
      it("Should be 0 for nonregistered", async function() {
        const staker = nonRegisteredStaker
        let payout = await this.askoStakingRewardPool.calculatePayout(staker,"1");
        expect("0").to.equal(payout.toString())
      })
    })
    describe("#calculatePayout", function(){
      it("Should be 0 for cycle 0", async function() {
        const staker = registeredStakers[4]
        let payout = await this.askoStakingRewardPool.calculatePayout(staker,"0");
        expect("0").to.equal(payout.toString())
      })
    })
    describe("#calculatePayout", function(){
      it("Should be totalReward * $ ownership for next cycle", async function() {
        const staker = registeredStakers[5]
        const cycleStakerPoolOwnership = await this.askoStakingRewardPool.cycleStakerPoolOwnership("2",staker)
        const cyclePoolTotal = await this.askoStakingRewardPool.cyclePoolTotal("2")
        const isStakerRegistered = await this.askoStakingRewardPool.isStakerRegistered(staker)
        const totalReward = await this.askoStakingRewardPool.cycleTotalReward("2")
        let payout = await this.askoStakingRewardPool.calculatePayout(staker,"2")
        let expectedPayout = (totalReward)
          .mul(cycleStakerPoolOwnership)
          .div(cyclePoolTotal)
        expect("0").to.not.equal(payout.toString())
        expect(expectedPayout.toString()).to.equal(payout.toString())
      })
    })
  })
})
