import { default as cohortABI } from '../../abi/Cohort.json';
import { ContractAddress } from '../Addresses';

/**
 * @param Moralis is the moralis sdk instance
 * @returns true if token allowance is greater than amount
 */
export const withdrawAll = async (Moralis) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();
  const contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'exit'
  };

  try {
    const transactionStatus = await Moralis.executeFunction(contract);
    const result = await transactionStatus.wait();
    return result;
  } catch (e) {
    return e;
  }
};
