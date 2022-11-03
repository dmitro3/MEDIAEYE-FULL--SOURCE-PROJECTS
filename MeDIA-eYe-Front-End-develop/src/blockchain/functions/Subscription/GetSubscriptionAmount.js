import { TokenAddress } from '../Addresses';
import { default as FeeABI } from '../../abi/MediaEyeFee';
import { ContractAddress } from '../Addresses/ContractAddresses';
import { ethers } from 'ethers';
import { TokenDecimal, TokenDecimalParse } from '../Addresses/TokenDecimals';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @param paymentMethod is the erc20 token address to be used as payment method
 * @param subscriptionLevel is an integer value the subscription level to subscribe to
 * @param activeDay is the duration of subscription (30 or 90)
 * @returns
 */
export const getSubscriptionAmount = async (
  Moralis,
  paymentMethod,
  subscriptionLevel,
  activeDay
) => {
  // error handling for bad formatting of day and subscription level
  if (
    !(activeDay === 30 || activeDay === 90) ||
    !(subscriptionLevel === 1 || subscriptionLevel === 2)
  ) {
    console.error('BAD INPUT');
    return;
  }
  const chainHex = await Moralis.chainId;

  let paymentMethodAmounts;

  // if token is stablecoin return paymentMethodAmount values
  if (paymentMethod === 'EYE') {
    const feeContractEye = {
      abi: FeeABI,
      contractAddress: ContractAddress('FEE', chainHex),
      functionName: 'paymentMethodAmounts',
      params: {
        tokenAddress: TokenAddress(paymentMethod, chainHex)
      }
    };

    paymentMethodAmounts = await Moralis.executeFunction(feeContractEye);
  } else {
    const feeContract = {
      abi: FeeABI,
      contractAddress: ContractAddress('FEE', chainHex),
      functionName: 'baseUSDTokenAmounts',
      params: {
        '': TokenAddress(paymentMethod, chainHex)
      }
    };
    paymentMethodAmounts = await Moralis.executeFunction(feeContract);
  }

  let price = [];
  if (subscriptionLevel === 1) {
    // return subscription level 1 for 30 days amount else assume for 90 days
    price =
      activeDay === 30
        ? paymentMethodAmounts['subscribeOneAmount']
        : paymentMethodAmounts['subscribeOne90Amount'];
  } else {
    // assume subscription level 2
    price =
      activeDay === 30
        ? paymentMethodAmounts['subscribeTwoAmount']
        : paymentMethodAmounts['subscribeTwo90Amount'];
  }

  // if token is stablecoin return paymentMethodAmount values
  if (
    paymentMethod === 'USDT' ||
    paymentMethod === 'BUSD' ||
    paymentMethod === 'EYE' ||
    paymentMethod === 'USDC'
  ) {
    return price;
  }
  // othewise convert

  const convertFunction = {
    abi: FeeABI,
    contractAddress: ContractAddress('FEE', chainHex),
    functionName: 'convertPrice',
    params: {
      _baseAmount: price,
      _baseDecimals: paymentMethodAmounts['tokenDecimals'],
      _queryDecimals: 18,
      _invertedAggregator:
        chainHex === '0x38' || chainHex === '0x61' ? true : false,
      _convertToNative: true
    }
  };

  let convertPrice = await Moralis.executeFunction(convertFunction);

  // add 5% to price for slippage only for native token
  convertPrice = convertPrice.mul('105').div('100');
  return convertPrice;
};
