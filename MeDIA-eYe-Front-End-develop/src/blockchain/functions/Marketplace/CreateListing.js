import { default as ListingABI } from '../../abi/MediaEyeListing.json';
import { ContractAddress } from '../Addresses';
import { ethers } from 'ethers';

export const createListing = async (Moralis, listingRequest) => {
  const chainHex = await Moralis.chainId;
  let contractAddress = ContractAddress('LISTING', chainHex);
  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
  const contract = new ethers.Contract(
    contractAddress,
    ListingABI,
    ethersProvider.getSigner()
  );

  try {
    const tx = await contract.createListing(listingRequest);
    return await tx.wait();
  } catch (e) {
    // console.log('metamask', e);

    return e;
  }
};
