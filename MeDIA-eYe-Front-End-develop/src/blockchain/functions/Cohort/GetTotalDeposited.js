import { default as cohortABI } from '../../abi/Cohort.json';
import { ContractAddress } from '../Addresses';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns true if token allowance is greater than amount
 */
export const getTotalDeposited = async (Moralis) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();
  const contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'totalSupplies'
  };

  try {
    const total = await Moralis.executeFunction(contract);
    return total;
  } catch (e) {
    console.log(e);
  }
};
