import { default as cohortABI } from '../../abi/Cohort.json';
import { ContractAddress } from '../Addresses';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns true if token allowance is greater than amount
 */
export const claimRewards = async (Moralis, togglePopup) => {
  // enable web3 before executing functions
  //const web3 = await Moralis.enableWeb3();

  const contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),

    functionName: 'claimRewards'
  };

  // rather than using wait() (doesn't seem to work with Moralis) call .then to handle result after await
  try {
    const transactionStatus = await Moralis.executeFunction(contract).then(
      async (receipt) => {
        const result = await receipt.wait();
        return result;
      }
    );
    return transactionStatus;
  } catch (e) {
    // console.log(e);
    // togglePopup(5);
    return e;
  }
};
