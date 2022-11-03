import { TokenAddress } from '../Addresses';
import { default as FeeABI } from '../../abi/MediaEyeFee.json';
import { ContractAddress } from '../Addresses/ContractAddresses';
import { ethers } from 'ethers';
import Web3 from 'web3';

export const getFeaturePrice = async (Moralis, currentChain, numberOfDays) => {
  const chainHex = Moralis.chainId;

  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const feeContract = new ethers.Contract(
    ContractAddress('FEE', chainHex),
    FeeABI,
    ethersProvider
  );

  // grab payment info anyway since you will need it
  let eyePrice = '0';
  let eyeTotalPrice = '0';
  if (currentChain.toLowerCase() != 'ftm') {
    eyePrice = await feeContract.paymentMethodAmounts(
      TokenAddress('EYE', chainHex)
    );
    eyeTotalPrice = eyePrice.featureAmountPerDay.mul(numberOfDays);
  }
  const baseUSDResponse = await feeContract.baseUSDTokenAmounts();
  const USDpricePerDay = baseUSDResponse.featureAmountPerDay;

  const totalPrice = USDpricePerDay.mul(numberOfDays);
  // boolean, false for ftm/eth or true for bsc
  const invertedAggregator =
    chainHex === '0x38' || chainHex === '0x61' ? true : false;

  const conversionResponse = await feeContract.convertPrice(
    totalPrice,
    baseUSDResponse['tokenDecimals'],
    18,
    invertedAggregator,
    true
  );

  return {
    totalPrice: conversionResponse.mul('105').div('100'),
    USDTotalPrice: totalPrice,
    eyeTotalPrice: eyeTotalPrice
  };
};
