import { default as cohortABI } from '../../abi/Cohort.json';
import { ethers } from 'ethers';
import { ContractAddress } from '../Addresses';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns amount of reward for specified token
 */
export const getAPR = async (Moralis) => {
  // enable web3 before executing functions
  //const web3 = await Moralis.enableWeb3();
  let contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'stakedTokenYearlyReturn'
  };

  // rather than using wait() (doesn't seem to work with Moralis) call .then to handle result after await
  try {
    const aprAmount = await Moralis.executeFunction(contract);
    const bigApr = ethers.BigNumber.from(aprAmount);
    const percentage = Number(ethers.utils.formatEther(bigApr)) * 100;
    return +percentage.toFixed(4);
  } catch (e) {
    console.log(e);
  }
};
