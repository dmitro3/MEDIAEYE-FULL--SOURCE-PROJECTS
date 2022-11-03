const { accounts, contract, web3 } = require("@openzeppelin/test-environment")
const { expectRevert, time, BN, ether, balance } = require("@openzeppelin/test-helpers")
const {expect} = require("chai")
const config = require("../config")

const AskoToken = contract.fromArtifact("AskoToken")
const AskoStaking = contract.fromArtifact("AskoStaking")

const SECONDS_PER_DAY = 86400

const owner = accounts[0]
const stakers = [accounts[1],accounts[2],accounts[3],accounts[4]]
const nonStakerAccount = accounts[5]
const distributionAccount = accounts[6]

describe("AskoStaking", function() {
  before(async function() {
    const tokenParams = config.AskoToken
    const stakingParams = config.AskoStaking


    await time.advanceBlock()
    const latest = await time.latest()

    this.askoToken = await AskoToken.new()
    this.askoStaking = await AskoStaking.new()

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

    await this.askoStaking.setStartTime(latest.add(new BN(SECONDS_PER_DAY*1)),{from:owner})

    await Promise.all([
      this.askoToken.mint(stakers[0],ether('25'),{from: owner}),
      this.askoToken.mint(stakers[1],ether('25'),{from: owner}),
      this.askoToken.mint(stakers[2],ether('25'),{from: owner}),
      this.askoToken.mint(stakers[3],ether('25'),{from: owner}),
      this.askoToken.mint(nonStakerAccount,ether('25'),{from: owner}),
      this.askoToken.mint(distributionAccount,ether('25'),{from: owner}),
    ])
  })

  describe("Stateles", function() {
    describe("#findTaxAmount", function(){
      it("Should return taxBP/10000 of value passed.", async function() {
        const taxBP = config.AskoStaking.stakingTaxBP
        const tax = await this.askoStaking.findTaxAmount(ether("1"),new BN(taxBP))
        const expectedTax = ether("1").mul(new BN(taxBP)).div(new BN(10000))
        expect(tax.toString()).to.equal(expectedTax.toString())
      })
    })
  })

  describe("State: Staking Inactive", function() {
    describe("#stake", function(){
      it("Should revert", async function() {
        const staker = stakers[0]
        await expectRevert(
          this.askoStaking.stake(ether("1"),{from:staker}),
          "Staking not yet started."
        )
      })
    })
    describe("#unstake", function(){
      it("Should revert", async function() {
        const staker = stakers[0]
        await expectRevert(
          this.askoStaking.unstake(ether("1"),{from:staker}),
          "Staking not yet started."
        )
      })
    })
    describe("#withdraw", function(){
      it("Should revert", async function() {
        const staker = stakers[0]
        await expectRevert(
          this.askoStaking.withdraw(ether("1"),{from:staker}),
          "Staking not yet started."
        )
      })
    })
    describe("#reinvest", function(){
      it("Should revert", async function() {
        const staker = stakers[0]
        await expectRevert(
          this.askoStaking.reinvest(ether("1"),{from:staker}),
          "Staking not yet started."
        )
      })
    })
  })


  describe("State: Staking Active", function() {
    before(async function() {
      await time.advanceBlock()
      let latest = await time.latest()
      await time.increase(SECONDS_PER_DAY*30)
    })

    describe("#stake", function(){
      it("Should revert if less than 1 token", async function() {
        const staker = stakers[0]
        await expectRevert(
          this.askoStaking.stake(ether("1").sub(new BN(1)),{from:staker}),
          "Must stake at least one ASKO."
        )
        await expectRevert(
          this.askoStaking.stake(0,{from:staker}),
          "Must stake at least one ASKO."
        )
        await expectRevert(
          this.askoStaking.stake(new BN(1),{from:staker}),
          "Must stake at least one ASKO."
        )
      })
      it("Should increase totalStakers by 1", async function() {
        const staker = stakers[0]
        const initialTotalStakers = await this.askoStaking.totalStakers()
        await this.askoStaking.stake(ether("2"),{from:staker})
        const finalTotalStakers = await this.askoStaking.totalStakers()
        expect(finalTotalStakers.toString())
          .to.equal(initialTotalStakers.add(new BN(1)).toString())
      })
      it("Should revert if staking more tokens than held", async function() {
        const staker = stakers[0]
        const balance = await this.askoToken.balanceOf(staker)
        expect(balance.toString()).to.not.equal(new BN(0),{from:staker})
        await expectRevert(
          this.askoStaking.stake(balance.add(new BN(1)),{from:staker}),
          "Cannot stake more ASKO than you hold unstaked."
        )
        await expectRevert(
          this.askoStaking.stake(balance.add(ether("1000000000")),{from:staker}),
          "Cannot stake more ASKO than you hold unstaked."
        )
      })
      it("Should decrease stakers balance by value", async function() {
        const staker = stakers[0]
        const value = ether("2.1")
        const initialStakersTokens = await this.askoToken.balanceOf(staker)
        await this.askoStaking.stake(value,{from:staker})
        const finalStakersTokens = await this.askoToken.balanceOf(staker)
        expect(finalStakersTokens.toString())
          .to.equal(initialStakersTokens.sub(value).toString())
      })
      it("Should not change totalStakers", async function() {
        const staker = stakers[0]
        const initialTotalStakers = await this.askoStaking.totalStakers()
        await this.askoStaking.stake(ether("2"),{from:staker})
        const finalTotalStakers = await this.askoStaking.totalStakers()
        expect(finalTotalStakers.toString())
          .to.equal(initialTotalStakers.toString())
      })
      it("Should increase totalStaked by value minus tax", async function() {
        const staker = stakers[0]
        const value = ether("2.1")
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        const initialTotalStaked = await this.askoStaking.totalStaked()
        await this.askoStaking.stake(value,{from:staker})
        const finalTotalStaked = await this.askoStaking.totalStaked()
        expect(finalTotalStaked.toString())
          .to.equal(initialTotalStaked.add(value).sub(tax).toString())
      })
      it("Should increase sender's staked amount by value minus tax", async function() {
        const staker = stakers[0]
        const value = ether("2.1")
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        const initialStakerBalance = await this.askoStaking.stakeValue(staker)
        await this.askoStaking.stake(value,{from:staker})
        const finalStakerBalance = await this.askoStaking.stakeValue(staker)
        expect(finalStakerBalance.toString())
          .to.equal(initialStakerBalance.add(value).sub(tax).toString())
      })
      it("For single staker, dividends+stakeValue[staker] should be contract balance.", async function() {
        const staker = stakers[0]
        const balance = await this.askoToken.balanceOf(this.askoStaking.address)
        const stake = await this.askoStaking.stakeValue(staker)
        const divis = await this.askoStaking.dividendsOf(staker)
        expect(stake.add(divis).toString())
          .to.equal(balance.sub(new BN(1)).toString())
      })
      it("When second staker doubles total staked, first stakers dividends should increase by half of tax.", async function() {
        const stakerFirst = stakers[0]
        const stakerSecond = stakers[1]
        const totalStaked = await this.askoStaking.totalStaked()
        const initialDivis = await this.askoStaking.dividendsOf(stakerFirst)
        const value = totalStaked.mul(new BN(10000)).div((new BN(10000)).sub(new BN(config.AskoStaking.stakingTaxBP)))
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        await this.askoStaking.stake(value,{from:stakerSecond})
        const finalDivis = await this.askoStaking.dividendsOf(stakerFirst)
        const stakerSecondDivis = await this.askoStaking.dividendsOf(stakerSecond)
        expect(finalDivis.sub(initialDivis).toString())
          .to.equal(tax.div(new BN(2)).toString())
        expect(stakerSecondDivis.toString())
          .to.equal(tax.div(new BN(2)).sub(new BN(1)).toString())
      })
      it("When third staker increases total staked by 50%, others stakers dividends should increase by third of tax.", async function() {
        const staker1 = stakers[0]
        const staker2 = stakers[1]
        const staker3 = stakers[2]
        const totalStaked = await this.askoStaking.totalStaked()
        const initialDivisStaker1 = await this.askoStaking.dividendsOf(staker1)
        const initialDivisStaker2 = await this.askoStaking.dividendsOf(staker2)
        const value = totalStaked.div(new BN(2)).mul(new BN(10000)).div((new BN(10000)).sub(new BN(config.AskoStaking.stakingTaxBP)))
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        await this.askoStaking.stake(value,{from:staker3})
        const finalDivisStaker1 = await this.askoStaking.dividendsOf(staker1)
        const finalDivisStaker2 = await this.askoStaking.dividendsOf(staker2)
        const finalDivisStaker3 = await this.askoStaking.dividendsOf(staker3)
        expect(finalDivisStaker1.sub(initialDivisStaker1).toString())
          .to.equal(tax.div(new BN(3)).toString())
        expect(finalDivisStaker2.sub(initialDivisStaker2).toString())
          .to.equal(tax.div(new BN(3)).toString())
        expect(finalDivisStaker3.toString())
          .to.equal(tax.div(new BN(3)).sub(new BN(1)).toString())
      })
    })

    describe("#unstake", function(){
      it("Should revert if less than 1 token", async function() {
        const staker = stakers[0]
        await expectRevert(
          this.askoStaking.unstake(ether("1").sub(new BN(1)),{from:staker}),
          "Must unstake at least one ASKO."
        )
        await expectRevert(
          this.askoStaking.unstake(0,{from:staker}),
          "Must unstake at least one ASKO."
        )
        await expectRevert(
          this.askoStaking.unstake(new BN(1),{from:staker}),
          "Must unstake at least one ASKO."
        )
      })
      it("Should revert if unstaking more tokens than staked", async function() {
        const staker = stakers[0]
        const balance = await this.askoStaking.stakeValue(staker)
        expect(balance.toString()).to.not.equal(new BN(0),{from:staker})
        await expectRevert(
          this.askoStaking.unstake(balance.add(new BN(1)),{from:staker}),
          "Cannot unstake more ASKO than you have staked."
        )
        await expectRevert(
          this.askoStaking.unstake(balance.add(ether("1000000000")),{from:staker}),
          "Cannot unstake more ASKO than you have staked."
        )
      })
      it("Should decrease totalStaked balance by value", async function() {
        const staker = stakers[0]
        const value = ether("1")
        const initialTotalStaked = await this.askoStaking.totalStaked()
        await this.askoStaking.unstake(value,{from:staker})
        const finalTotalStaked = await this.askoStaking.totalStaked()
        expect(finalTotalStaked.toString())
          .to.equal(initialTotalStaked.sub(value).toString())
      })
      it("Should increase stakers balance by value minus tax", async function() {
        const staker = stakers[0]
        const value = ether("1")
        const tax = await this.askoStaking.findTaxAmount(value,new BN(config.AskoStaking.unstakingTaxBP))
        const initialStakerBalance = await this.askoToken.balanceOf(staker)
        await this.askoStaking.unstake(value,{from:staker})
        const finalStakerBalance = await this.askoToken.balanceOf(staker)
        expect(finalStakerBalance.toString())
          .to.equal(initialStakerBalance.add(value).sub(tax).toString())
      })
      it("Should decrease sender's staked amount by value", async function() {
        const staker = stakers[0]
        const value = ether("1")
        const initialStakerBalance = await this.askoStaking.stakeValue(staker)
        await this.askoStaking.unstake(value,{from:staker})
        const finalStakerBalance = await this.askoStaking.stakeValue(staker)
        const staker1DivisQ = await this.askoStaking.dividendsOf(stakers[0])
        expect(finalStakerBalance.toString())
          .to.equal(initialStakerBalance.sub(value).toString())
      })
      describe("Unstake All", function() {
        it("Should decrease totalStakers by 1 & Should increase stakers dividends by %owned * tax",async function() {
          const staker = stakers[0]
          const totalStaked = await this.askoStaking.totalStaked()
          const initialStakerDivis = await this.askoStaking.dividendsOf(staker)
          const stakerValue = await this.askoStaking.stakeValue(staker)
          const initialTotalStakers = await this.askoStaking.totalStakers()
          const tax = await this.askoStaking.findTaxAmount(stakerValue,new BN(config.AskoStaking.unstakingTaxBP))
          await this.askoStaking.unstake(stakerValue,{from:staker})
          const finalTotalStakers = await this.askoStaking.totalStakers()
          const finalStakerDivis = await this.askoStaking.dividendsOf(staker)
          expect(finalTotalStakers.toString())
            .to.equal(initialTotalStakers.sub(new BN(1)).toString())
          expect(finalStakerDivis.sub(initialStakerDivis).toString())
            .to.equal(stakerValue.mul(tax).div(stakerValue).toString())
        })


      })
      it("Should increase other stakers dividends by tax/totalStaked * stakeValue", async function() {
        const staker = stakers[1]
        const unstaker = stakers[2]
        const value = ether("1")
        const tax = await this.askoStaking.findTaxAmount(value,new BN(config.AskoStaking.unstakingTaxBP))
        const stakerShares = await this.askoStaking.stakeValue(staker)
        const initialStakerDivis = await this.askoStaking.dividendsOf(staker)
        await this.askoStaking.unstake(ether("1"),{from:unstaker})
        const finalStakerDivis = await this.askoStaking.dividendsOf(staker)
        const totalStaked = await this.askoStaking.totalStaked()
        expect(tax.mul(stakerShares).div(totalStaked).toString())
          .to.equal(finalStakerDivis.sub(initialStakerDivis).toString())
      })
    })

    describe("#distribution", function(){
      before(async function() {
        await this.askoStaking.stake(ether("1"),{from:stakers[0]})
        await this.askoStaking.stake(ether("1.5"),{from:stakers[1]})
        await this.askoStaking.stake(ether("1.2"),{from:stakers[2]})
        await this.askoStaking.stake(ether("9.1"),{from:stakers[3]})
      })
      it("Should revert if distributing more than sender's balance", async function() {
        const balance = await this.askoToken.balanceOf(distributionAccount)
        await expectRevert(
          this.askoStaking.distribute(balance.add(new BN(1)),{from: distributionAccount}),
          "Cannot distribute more ASKO than you hold unstaked."
        )
      })
      it("Should increase totalDistributions by value", async function(){
        const value = ether("1")
        const totalDistributionsInitial = await this.askoStaking.totalDistributions()
        await this.askoStaking.distribute(value,{from: distributionAccount})
        const totalDistributionsFinal = await this.askoStaking.totalDistributions()
        expect(totalDistributionsFinal.toString())
          .to.equal(totalDistributionsInitial.add(value).toString())
      })
      it("Should increase other stakers dividends by distribution/totalStaked * stakeValue", async function() {
        const staker = stakers[1]
        const value = ether("1")
        const stakerShares = await this.askoStaking.stakeValue(staker)
        const initialStakerDivis = await this.askoStaking.dividendsOf(staker)
        await this.askoStaking.distribute(value,{from:distributionAccount})
        const finalStakerDivis = await this.askoStaking.dividendsOf(staker)
        const totalStaked = await this.askoStaking.totalStaked()
        expect(value.mul(stakerShares).div(totalStaked).toString())
          .to.equal(finalStakerDivis.sub(initialStakerDivis).sub(new BN(1)).toString())
      })
    })
    describe("#withdraw", function(){
      it("Should revert if withdrawing more than sender's dividends", async function() {
        const staker = stakers[0]
        const balance = await this.askoStaking.dividendsOf(staker)
        await expectRevert(
          this.askoStaking.withdraw(balance.add(new BN(1)),{from: staker}),
          "Cannot withdraw more dividends than you have earned."
        )
      })
      it("Should increase senders balance by value.", async function() {
        const value = ether("0.1")
        const staker = stakers[0]
        const balanceInitial = await this.askoToken.balanceOf(staker)
        this.askoStaking.withdraw(value,{from: staker})
        const balanceFinal = await this.askoToken.balanceOf(staker)
        expect(balanceFinal.sub(balanceInitial).toString())
          .to.equal(value.toString())
      })
      it("Should decrease senders dividends by value.", async function() {
        const value = ether("0.1")
        const staker = stakers[3]
        const divisInitial = await this.askoStaking.dividendsOf(staker)
        this.askoStaking.withdraw(value,{from: staker})
        const divisFinal = await this.askoStaking.dividendsOf(staker)
        expect(divisInitial.sub(divisFinal).toString())
          .to.equal(value.toString())
      })
    })

    describe("#reinvest", function(){
      it("Should revert if staking more tokens than in dividends", async function() {
        const staker = stakers[1]
        const divis = await this.askoStaking.dividendsOf(staker)
        expect(divis.toString()).to.not.equal(new BN(0),{from:staker})
        await expectRevert(
          this.askoStaking.reinvest(divis.add(new BN(1)),{from:staker}),
          "Cannot reinvest more dividends than you have earned."
        )
        await expectRevert(
          this.askoStaking.reinvest(divis.add(ether("1000000000")),{from:staker}),
          "Cannot reinvest more dividends than you have earned."
        )
      })
      it("Should decrease stakers dividends by value but add tax/totalStaked * stakeValue.", async function() {
        const staker = stakers[1]
        const value = ether("0.1")
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        const initialStakerDivis = await this.askoStaking.dividendsOf(staker)
        await this.askoStaking.reinvest(value,{from:staker})
        const finalStakerDivis = await this.askoStaking.dividendsOf(staker)
        const totalStaked = await this.askoStaking.totalStaked()
        const stakerShares = await this.askoStaking.stakeValue(staker)
        expect(initialStakerDivis.sub(finalStakerDivis).toString())
          .to.equal(value.sub(tax.mul(stakerShares).div(totalStaked)).toString())
      })
      it("Should increase totalStaked by value minus tax", async function() {
        const staker = stakers[1]
        const value = ether("0.1")
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        const initialTotalStaked = await this.askoStaking.totalStaked()
        await this.askoStaking.reinvest(value,{from:staker})
        const finalTotalStaked = await this.askoStaking.totalStaked()
        expect(finalTotalStaked.toString())
          .to.equal(initialTotalStaked.add(value).sub(tax).toString())
      })
      it("Should increase sender's staked amount by value minus tax", async function() {
        const staker = stakers[1]
        const value = ether("0.01")
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        const initialStakerBalance = await this.askoStaking.stakeValue(staker)
        await this.askoStaking.reinvest(value,{from:staker})
        const finalStakerBalance = await this.askoStaking.stakeValue(staker)
        expect(finalStakerBalance.toString())
          .to.equal(initialStakerBalance.add(value).sub(tax).toString())
      })
      it("Should increase other stakers dividends by tax/totalStaked * stakeValue", async function() {
        const reinvester = stakers[1]
        const staker = stakers[2]
        const value = ether("0.1")
        const tax = await this.askoStaking.findTaxAmount(value,config.AskoStaking.stakingTaxBP)
        const stakerShares = await this.askoStaking.stakeValue(staker)
        const initialStakerDivis = await this.askoStaking.dividendsOf(staker)
        await this.askoStaking.reinvest(value,{from:reinvester})
        const finalStakerDivis = await this.askoStaking.dividendsOf(staker)
        const totalStaked = await this.askoStaking.totalStaked()
        expect(tax.mul(stakerShares).div(totalStaked).toString())
          .to.equal(finalStakerDivis.sub(initialStakerDivis).toString())
      })
    })
  })
})
