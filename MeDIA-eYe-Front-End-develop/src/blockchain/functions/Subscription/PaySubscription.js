import { TokenAddress } from '../Addresses';
import { default as FeeABI } from '../../abi/MediaEyeFee';
import { ethers } from 'ethers';
import { ContractAddress } from '../Addresses/ContractAddresses';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @param duration is the duration of subscription 0 or 1 = (30 or 90)
 * @param paymentMethod is the erc20 token address to be used as payment method
 * @param tokenAmount is the amount of token paid in wei
 * @param level is the subscription level
 * @returns
 */
export const paySubscription = async (
  Moralis,
  duration,
  paymentMethod,
  tokenAmount,
  level
) => {
  if (
    !(
      paymentMethod === 'ETH' ||
      paymentMethod === 'BNB' ||
      paymentMethod === 'FTM'
    )
  ) {
    tokenAmount = 0;
  }

  // convert provider to ethers
  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
  const chainHex = await Moralis.chainId;

  const contract = new ethers.Contract(
    ContractAddress('FEE', chainHex),
    FeeABI,
    ethersProvider.getSigner()
  );

  let tx = null;
  // choose function based on level
  if (level === 1) {
    tx = await contract.paySubscriptionLevelOneFee(
      TokenAddress(paymentMethod, chainHex),
      duration,
      { value: tokenAmount }
    );
  } else {
    tx = await contract.paySubscriptionLevelTwoFee(
      TokenAddress(paymentMethod, chainHex),
      duration,
      { value: tokenAmount }
    );
  }

  try {
    const result = await tx.wait();
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
};
