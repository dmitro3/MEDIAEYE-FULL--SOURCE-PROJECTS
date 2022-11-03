const { accounts, contract, web3 } = require("@openzeppelin/test-environment")
const { expectRevert, time, BN, ether, balance } = require("@openzeppelin/test-helpers")
const {expect} = require("chai")
const config = require("../config")

const AskoToken = contract.fromArtifact("AskoToken")
const AskoStaking = contract.fromArtifact("AskoStaking")
const AskoDevFund = contract.fromArtifact("AskoDevFund")

SECONDS_PER_DAY = 86400

const owner = accounts[0]
const authorizor = accounts[1]
const releaser =  accounts[2]
const unauthorized = accounts[3]
const receiver = accounts[4]

describe("AskoDevFund", function() {
  before(async function() {
    const tokenParams = config.AskoToken
    const stakingParams = config.AskoStaking
    const devfundParams = config.AskoDevFund

    this.askoToken = await AskoToken.new()
    this.askoStaking = await AskoStaking.new()
    this.askoDevFund = await AskoDevFund.new()

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
    await time.advanceBlock()
    let latest = await time.latest()

    await this.askoDevFund.initialize(
      devfundParams.releaseAmount,
      devfundParams.releaseInterval,
      latest.toNumber() + 86400,
      authorizor,
      releaser,
      this.askoToken.address,
      this.askoStaking.address
    )

    this.askoToken.mint(this.askoDevFund.address,devfundParams.size,{from:owner})

  })
  describe("State: Cycle 0", function() {
    describe("#getCurrentCycleCount", function(){
      it("Should be 0", async function() {
        const cycle = await this.askoDevFund.getCurrentCycleCount()
        expect("0").to.equal(cycle.toString())
      })
    })
    describe("#releaseToAddress", function(){
      it("Should revert when called by releaser", async function() {
        await expectRevert(
          this.askoDevFund.releaseToAddress(receiver,"100",{from:releaser}),
         "Cannot release more than has been ever authorized."
        )
      })
      it("Should revert when called by unauthorized", async function() {
        await expectRevert(
          this.askoDevFund.releaseToAddress(receiver,"100",{from:unauthorized}),
         "Sender is not releaser."
        )
      })
    })
    describe("#authorize", function (){
      it("Should revert when called by unauthorized", async function() {
        await expectRevert(
          this.askoDevFund.authorize(ether("100"),{from:unauthorized}),
         "Sender is not authorizor."
        )
      })
      it("Should revert when authorizing any amount", async function() {
        await expectRevert(
          this.askoDevFund.authorize("1",{from:authorizor}),
         "Cannot authorize more than the maximum authorizable."
        )
      })
    })
  })

  describe("State: Authorized, Cycle 1", function() {
    before(async function() {
      await time.increase(SECONDS_PER_DAY*30)
      await time.advanceBlock()
    })
    describe("#getCurrentCycleCount", function(){
      it("Should be 1", async function() {
        const cycle = await this.askoDevFund.getCurrentCycleCount()
        expect("1").to.equal(cycle.toString())
      })
    })
    describe("#authorize", function (){
      it("Should revert when called by unauthorized", async function() {
        await expectRevert(
          this.askoDevFund.authorize(ether("100"),{from:unauthorized}),
         "Sender is not authorizor."
        )
      })
      it("Should increase totalAuthorized by amount.", async function() {
        const value = ether("100")
        const totalAuthorizedInitial = await this.askoDevFund.totalAuthorized();
        await this.askoDevFund.authorize(value,{from:authorizor})
        const totalAuthorizedFinal = await this.askoDevFund.totalAuthorized();
        expect(totalAuthorizedFinal.sub(totalAuthorizedInitial).toString())
          .to.equal(value.toString())
      })
    })
    describe("#releaseToAddress", function(){
      it("Should revert when called by nonreleaser", async function() {
        await expectRevert(
          this.askoDevFund.releaseToAddress(receiver,ether("20"),{from:unauthorized}),
         "Sender is not releaser."
        )
      })
      it("Should revert if value too high.", async function() {
        await expectRevert(
          this.askoDevFund.releaseToAddress(receiver,ether("120"),{from:releaser}),
         "Cannot release more than has been ever authorized."
        )
      })
      describe("On success", function() {
        before(async function() {
          await this.askoDevFund.releaseToAddress(receiver,ether("50"),{from:releaser})
        })
        it("Should have increased receiver balance by value.", async function() {
          const bal = await this.askoToken.balanceOf(receiver);
          expect(ether("50").toString()).to.equal(bal.toString())
        })
        it("Should have increased totalReleased by value.", async function() {
          const totalReleased = await this.askoDevFund.totalReleased();
          expect(ether("50").toString()).to.equal(totalReleased.toString())
        })
        it("Should revert if value too high.", async function() {
          await expectRevert(
            this.askoDevFund.releaseToAddress(receiver,ether("60"),{from:releaser}),
           "Cannot release more than available."
          )
        })
        it("Should increase receiver balance again by value.", async function() {
          await this.askoDevFund.releaseToAddress(receiver,ether("50"),{from:releaser})
          const bal = await this.askoToken.balanceOf(receiver);
          expect(ether("100").toString()).to.equal(bal.toString())
        })
      })
    })
  })
})
