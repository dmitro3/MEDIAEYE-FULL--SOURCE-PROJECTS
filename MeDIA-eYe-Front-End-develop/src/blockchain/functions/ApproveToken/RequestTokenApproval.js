import { TokenAddress } from '../Addresses';
import { default as eyeABI } from '../../abi/EyeToken';
import { ethers } from 'ethers';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @param paymentMethod is the erc20 token address to be used as payment method
 * @param spender is the spender of the tokens
 * @returns
 */
export const requestTokenApproval = async (Moralis, paymentMethod, spender) => {
  let tokenABI = eyeABI;
  const chainHex = await Moralis.chainId;

  // get provider for ethers
  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const contract = new ethers.Contract(
    TokenAddress(paymentMethod, chainHex)
      ? TokenAddress(paymentMethod, chainHex)
      : paymentMethod,
    tokenABI,
    ethersProvider.getSigner()
  );

  // ethereum does not need token approval thus return true
  if (
    (paymentMethod === 'ETH' && chainHex === '0x1') ||
    (paymentMethod === 'BNB' && chainHex === '0x38') ||
    (paymentMethod === 'FTM' && chainHex === '0xfa') ||
    (paymentMethod === 'BNB' && chainHex === '0x61')
  )
    return true;

  try {
    const tx = await contract.approve(spender, ethers.constants.MaxUint256);
    const result = await tx.wait();
    return result;
  } catch (e) {
    return e;
  }
};
