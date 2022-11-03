import { TokenAddress } from '../Addresses';
import { default as eyeABI } from '../../abi/EyeToken';
import { ethers } from 'ethers';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @param paymentMethod is the erc20 token address to be used as payment method
 * @param owner is the address of caller
 * @param amount is the amount to allow
 * @param spender is the spender (contract) of the owner's coins
 * @returns true if token allowance is greater than amount
 */
export const checkAllowance = async (
  Moralis,
  paymentMethod,
  owner,
  amount,
  spender,
  tokenAddress
) => {
  // allowance should be the same universal erc20 spec abi for all contracts
  let tokenABI = eyeABI;
  if (
    paymentMethod === 'ETH' ||
    paymentMethod === 'BNB' ||
    paymentMethod === 'FTM'
  ) {
    // native token of a chain does not need token approval thus return true
    return true;
  }

  const chainHex = await Moralis.chainId;
  // convert provider to ethers
  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const contract = new ethers.Contract(
    tokenAddress ? tokenAddress : TokenAddress(paymentMethod, chainHex),
    tokenABI,
    ethersProvider.getSigner()
  );

  const allowance = await contract.allowance(owner, spender);

  try {
    if (Number(allowance.toString()) >= Number(amount)) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
};
