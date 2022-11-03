import { default as cohortABI } from '../../abi/Cohort.json';
import { ContractAddress } from '../Addresses';
import Swal from 'sweetalert2';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @param amount is the amount to withdraw
 * @returns true if token allowance is greater than amount
 */
export const withdraw = async (Moralis, amount) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();
  const contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'withdraw',
    params: {
      amount: amount
    }
  };

  // rather than using wait() (doesn't seem to work with Moralis) call .then to handle result after await
  try {
    const transactionStatus = await Moralis.executeFunction(contract);
    const result = await transactionStatus.wait();
    return result;
  } catch (e) {
    return e;
  }
};
