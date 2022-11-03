import { default as cohortABI } from '../../abi/Cohort.json';
import { ChainName } from '../ChangeChain/ChainNames';
import { ContractAddress } from '../Addresses';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @param rewardType is the index of the remaining token
 * @returns amount of remaining token for specified token
 */
export const getRemaining = async (Moralis, rewardType) => {
  // enable web3 before executing functions
  //const web3 = await Moralis.enableWeb3();
  let contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'getRemainingTokens',
    params: {
      rewardTokenIndex: rewardType.toString()
    }
  };

  // rather than using wait() (doesn't seem to work with Moralis) call .then to handle result after await
  try {
    const rewardAmount = await Moralis.executeFunction(contract);
    return rewardAmount;
  } catch (e) {
    console.log(e);
  }
};
