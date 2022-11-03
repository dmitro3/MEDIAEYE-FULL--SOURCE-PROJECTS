import { default as cohortABI } from '../../abi/Cohort.json';
import { ContractAddress } from '../Addresses';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns amount of reward for specified token
 */
export const getReward = async (Moralis, userAddress, rewardType) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  //const web3 = new Web3(Moralis.provider);
  let contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'getUserClaimableRewards',
    params: {
      user: userAddress,
      rewardTokenIndex: rewardType.toString()
    }
  };

  try {
    const rewardAmount = await Moralis.executeFunction(contract);
    if (rewardAmount > 0) {
      return rewardAmount;
    } else {
      return 0;
    }
  } catch (e) {
    console.log(e);
  }
};
