import { default as cohortABI } from '../../abi/Cohort.json';
import { ContractAddress } from '../Addresses';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @param amount is the amount to deposit
 * @returns true if token allowance is greater than amount
 */
export const getDeposited = async (Moralis, userAddress) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();
  const contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'supplyAmount',
    params: {
      '': userAddress
    }
  };

  // rather than using wait() (doesn't seem to work with Moralis) call .then to handle result after await
  try {
    const depositedAmount = await Moralis.executeFunction(contract);
    return depositedAmount;
  } catch (e) {
    console.log(e);
  }
};
