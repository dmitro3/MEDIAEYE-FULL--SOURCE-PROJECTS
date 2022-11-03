import { default as cohortABI } from '../../abi/Cohort.json';
import { ethers } from 'ethers';
import { ContractAddress } from '../Addresses';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns amount of reward for specified token
 */
export const getUserShare = async (Moralis, user) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();
  let contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'getUserDepositedFraction',
    params: {
      user: user
    }
  };

  try {
    const amount = await Moralis.executeFunction(contract);

    const bigAmount = ethers.BigNumber.from(amount);
    const percent = Number(ethers.utils.formatEther(bigAmount)) * 100;

    return +percent.toFixed(4);
  } catch (e) {
    console.log(e);
  }
};
