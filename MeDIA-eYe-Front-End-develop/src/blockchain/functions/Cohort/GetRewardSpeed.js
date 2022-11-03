import { default as cohortABI } from '../../abi/Cohort.json';
import { ethers } from 'ethers';
import { getTotalDeposited } from '.';
import { ContractAddress } from '../Addresses';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns amount of reward for specified token
 */
export const getRewardSpeed = async (Moralis, rewardType) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();
  let contract = {
    abi: cohortABI,
    contractAddress: ContractAddress('COHORT', await Moralis.chainId),
    functionName: 'rewardSpeeds',
    params: {
      rewardIndex: rewardType.toString()
    }
  };

  try {
    const total = await getTotalDeposited(Moralis);
    const rewardSpeed = await Moralis.executeFunction(contract);
    const bigAmount = ethers.BigNumber.from(rewardSpeed);

    let converted = bigAmount.mul(31536000);
    converted = converted.mul(1000);

    if (Number(total) !== 0) {
      converted = converted.div(total).toNumber();
    } else {
      converted = Number(ethers.utils.formatEther(converted));
    }

    return +converted.toFixed(4);
  } catch (e) {
    console.log(e);
  }
};
