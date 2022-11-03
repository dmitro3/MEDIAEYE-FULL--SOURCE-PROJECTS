import { default as cohortABI } from '../../abi/Cohort.json';
import { ethers } from 'ethers';
import { ContractAddress } from '../Addresses';

/**
 * @param Moralis is the moralis sdk instance
 * @param amount is the amount to deposit
 * @returns result the transaction object from ethers after calling contract
 */
export const deposit = async (Moralis, amount) => {
  // get provider for ethers
  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const contract = new ethers.Contract(
    ContractAddress('COHORT', await Moralis.chainId),
    cohortABI,
    ethersProvider.getSigner()
  );

  try {
    const tx = await contract.deposit(amount);
    const result = await tx.wait();
    return result;
  } catch (e) {
    return e;
  }
};
