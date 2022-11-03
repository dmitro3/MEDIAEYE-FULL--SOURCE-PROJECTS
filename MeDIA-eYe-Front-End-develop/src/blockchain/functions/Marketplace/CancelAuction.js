import { default as AuctionABI } from '../../abi/MediaEyeAuction.json';
import { ContractAddress } from '../Addresses';
import { ethers } from 'ethers';

export const cancelAuction = async (Moralis, auctionId) => {
  const chainHex = await Moralis.chainId;
  let contractAddress = ContractAddress('AUCTION', chainHex);

  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const contract = new ethers.Contract(
    contractAddress,
    AuctionABI,
    ethersProvider.getSigner()
  );

  try {
    const tx = await contract.cancelOrUpdateAuction(auctionId);
    return await tx.wait();
  } catch (e) {
    return e;
  }
};
