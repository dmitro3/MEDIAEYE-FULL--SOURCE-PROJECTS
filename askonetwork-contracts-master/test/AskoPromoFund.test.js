const { accounts, contract, web3 } = require("@openzeppelin/test-environment")
const { expectRevert, time, BN, ether, balance } = require("@openzeppelin/test-helpers")
const {expect} = require("chai")
const config = require("../config")

const AskoToken = contract.fromArtifact("AskoToken")
const AskoStaking = contract.fromArtifact("AskoStaking")
const AskoPromoFund = contract.fromArtifact("AskoPromoFund")

const owner = accounts[0]
const authorizor = accounts[1]
const releaser =  accounts[2]
const unauthorized = accounts[3]
const receiver = accounts[4]

describe("AskoPromoFund", function() {
  before(async function() {
    const tokenParams = config.AskoToken
    const stakingParams = config.AskoStaking
    const promoParams = config.AskoPromoFund

    this.askoToken = await AskoToken.new()
    this.askoStaking = await AskoStaking.new()
    this.askoPromoFund = await AskoPromoFund.new()

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
    await this.askoPromoFund.initialize(
      authorizor,
      releaser,
      this.askoToken.address
    )

    this.askoToken.mint(this.askoPromoFund.address,promoParams.size,{from:owner})

  })
  describe("State: No Authorization", function() {
    describe("#releaseToAddress", function(){
      it("Should revert when called by releaser", async function() {
        await expectRevert(
          this.askoPromoFund.releaseToAddress(receiver,"100",{from:releaser}),
         "Cannot release more than available."
        )
      })
      it("Should revert when called by nonreleaser", async function() {
        await expectRevert(
          this.askoPromoFund.releaseToAddress(receiver,"100",{from:unauthorized}),
         "Can only be called releaser."
        )
      })
    })
  })
  describe("State: Authorized", function() {
    describe("#authorize", function (){
      it("Should revert when called by unauthorized", async function() {
        await expectRevert(
          this.askoPromoFund.authorize(ether("100"),{from:unauthorized}),
         "Can only be called authorizor."
        )
      })
      it("Should increase totalAuthorized by amount.", async function() {
        const value = ether("100")
        const totalAuthorizedInitial = await this.askoPromoFund.totalAuthorized();
        await this.askoPromoFund.authorize(value,{from:authorizor})
        const totalAuthorizedFinal = await this.askoPromoFund.totalAuthorized();
        expect(totalAuthorizedFinal.sub(totalAuthorizedInitial).toString())
          .to.equal(value.toString())
      })
    })
    describe("#releaseToAddress", function(){
      it("Should revert when called by nonreleaser", async function() {
        await expectRevert(
          this.askoPromoFund.releaseToAddress(receiver,ether("20"),{from:unauthorized}),
         "Can only be called releaser."
        )
      })
      it("Should revert if value too high.", async function() {
        await expectRevert(
          this.askoPromoFund.releaseToAddress(receiver,ether("120"),{from:releaser}),
         "Cannot release more than available."
        )
      })
      describe("On success", function() {
        before(async function() {
          await this.askoPromoFund.releaseToAddress(receiver,ether("50"),{from:releaser})
        })
        it("Should have increased receiver balance by value.", async function() {
          const bal = await this.askoToken.balanceOf(receiver);
          expect(ether("50").toString()).to.equal(bal.toString())
        })
        it("Should have increased totalReleased by value.", async function() {
          const totalReleased = await this.askoPromoFund.totalReleased();
          expect(ether("50").toString()).to.equal(totalReleased.toString())
        })
        it("Should revert if value too high.", async function() {
          await expectRevert(
            this.askoPromoFund.releaseToAddress(receiver,ether("60"),{from:releaser}),
           "Cannot release more than available."
          )
        })
        it("Should increase receiver balance again by value.", async function() {
          await this.askoPromoFund.releaseToAddress(receiver,ether("50"),{from:releaser})
          const bal = await this.askoToken.balanceOf(receiver);
          expect(ether("100").toString()).to.equal(bal.toString())
        })
      })
    })
  })
})
