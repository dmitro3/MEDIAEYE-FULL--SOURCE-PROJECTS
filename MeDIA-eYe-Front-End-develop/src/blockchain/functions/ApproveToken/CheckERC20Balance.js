import { default as eyeABI } from '../../abi/EyeToken';
import { ethers } from 'ethers';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @param tokenAddress is the erc20 token address to be used as payment method
 * @returns balance
 */
export const checkERC20Balance = async (Moralis, tokenAddress, isNative) => {
  try {
    const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

    if (isNative) {
      return await ethersProvider.getBalance(
        await ethersProvider.getSigner().getAddress()
      );
    }
    const contract = new ethers.Contract(
      tokenAddress,
      eyeABI,
      ethersProvider.getSigner()
    );
    const balance = await contract.balanceOf(
      await ethersProvider.getSigner().getAddress()
    );

    return balance;
  } catch (e) {
  }
};
