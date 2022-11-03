import { default as AuctionABI } from '../../abi/MediaEyeAuction.json';
import { TokenName } from '../ApproveToken';
import { ethers } from 'ethers';
import { ContractAddress } from '../Addresses';

export const claimAuction = async (Moralis, claimRequest) => {
  const chainHex = await Moralis.chainId;
  let contractAddress = ContractAddress('AUCTION', chainHex);
  const listingContract = {
    abi: AuctionABI,
    contractAddress: contractAddress,
    functionName: 'sellerClaimBySig',
    params: { _auctionSignature: claimRequest }
  };

  try {
    const claimAuction = await Moralis.executeFunction(listingContract).then(
      (receipt) => {
        if (receipt.status) {
          return true;
        } else {
          return false;
        }
      }
    );
    return claimAuction;
  } catch (e) {
    return false;
  }
};
