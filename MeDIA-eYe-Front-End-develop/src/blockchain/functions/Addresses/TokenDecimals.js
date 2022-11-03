import { ethers } from 'ethers';
import { TokenName } from './TokenNames';

export const TokenDecimalConvert = (tokenAmount, fromDecimal, toDecimal) => {
  tokenAmount = TokenDecimalFormat(tokenAmount, fromDecimal);
  return ethers.utils.parseUnits(tokenAmount, toDecimal);
};

export const TokenDecimalFormat = (tokenAmount, decimals) => {
  return ethers.utils.formatUnits(tokenAmount, decimals);
};

export const TokenDecimalParse = (tokenAmount, decimals) => {
  return ethers.utils.parseUnits(tokenAmount, decimals);
};

export const TokenDecimal = (tokenName) => {
  tokenName = tokenName.toUpperCase();
  if (tokenName === 'USDT' || tokenName === 'USDC') {
    return 6;
  } else {
    return 18;
  }
};

export const TokenAddressDecimal = (tokenAddress, chainId) => {
  const tokenName = TokenName(tokenAddress, chainId);
  if (tokenName === 'USDT' || tokenName === 'USDC') {
    return 6;
  } else {
    return 18;
  }
};
