pragma solidity 0.5.16;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";


pragma solidity 0.5.16;

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";


contract AskoPromoFund is Initializable {
    using SafeMath for uint;

    IERC20 private askoToken;
    address public authorizor;
    address public releaser;

    uint public totalAuthorized;
    uint public totalReleased;

    function initialize(
        address _authorizor,
        address _releaser,
        IERC20 _askoToken
    ) public initializer {
        askoToken = _askoToken;
        authorizor = _authorizor;
        releaser = _releaser;
    }

    function releaseToAddress(address receiver, uint amount) public returns(uint) {
        require(msg.sender == releaser, "Can only be called releaser.");
        require(amount <= totalAuthorized.sub(totalReleased), "Cannot release more than available.");
        totalReleased = totalReleased.add(amount);
        askoToken.transfer(receiver, amount);
    }

    function authorize(uint amount) public returns (uint) {
        require(msg.sender == authorizor, "Can only be called authorizor.");
        totalAuthorized = totalAuthorized.add(amount);
    }

}
