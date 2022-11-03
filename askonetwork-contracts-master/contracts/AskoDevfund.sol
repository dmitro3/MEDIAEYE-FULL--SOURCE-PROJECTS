pragma solidity 0.5.16;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";


pragma solidity 0.5.16;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "./AskoStaking.sol";


contract AskoDevFund is Initializable {
    using SafeMath for uint;

    uint public releaseInterval;
    uint public releaseStart;
    uint public releaseAmount;

    IERC20 private askoToken;
    AskoStaking private askoStaking;

    address public authorizor;
    address public releaser;

    uint public totalAuthorized;
    uint public totalReleased;

    modifier onlyAfterStart {
        require(releaseStart != 0 && now > releaseStart, "Has not yet started.");
        _;
    }

    function initialize(
        uint _releaseAmount,
        uint _releaseInterval,
        uint _releaseStart,
        address _authorizor,
        address _releaser,
        IERC20 _askoToken,
        AskoStaking _askoStaking
    ) public initializer {

        releaseAmount = _releaseAmount;
        releaseInterval = _releaseInterval;
        releaseStart = _releaseStart;

        askoToken = _askoToken;
        askoStaking = _askoStaking;

        authorizor = _authorizor;
        releaser = _releaser;
    }

    function releaseToAddress(address receiver, uint amount) public returns(uint) {
        requireValidRelease(amount);
        totalReleased = totalReleased.add(amount);
        askoToken.transfer(receiver, amount);
    }

    function releaseToStakers(uint amount) public returns(uint) {
        requireValidRelease(amount);
        totalReleased = totalReleased.add(amount);
        askoStaking.distribute(amount);
    }

    function releaseToBurn(uint amount) public returns(uint) {
        requireValidRelease(amount);
        totalReleased = totalReleased.add(amount);
        askoToken.transfer(0x000000000000000000000000000000000000dEaD, amount);
    }

    function authorize(uint amount) public returns (uint) {
        require(msg.sender == authorizor, "Sender is not authorizor.");
        uint maxAuthorizable = getCurrentCycleCount().mul(releaseAmount);
        require(
            amount.add(totalAuthorized) <= maxAuthorizable,
            "Cannot authorize more than the maximum authorizable."
        );
        totalAuthorized = totalAuthorized.add(amount);
    }

    function getCurrentCycleCount() public view returns (uint) {
        if (now <= releaseStart) return 0;
        return now.sub(releaseStart).div(releaseInterval).add(1);
    }

    function requireValidRelease(uint amount) public view {
        require(msg.sender == releaser, "Sender is not releaser.");
        require(amount <= totalAuthorized, "Cannot release more than has been ever authorized.");
        require(amount <= totalAuthorized.sub(amount), "Cannot release more than available.");
    }

}
