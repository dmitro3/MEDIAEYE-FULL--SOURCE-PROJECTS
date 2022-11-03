import { default as ListingABI } from '../../abi/MediaEyeListing.json';
import { ContractAddress } from '../Addresses';
import Swal from 'sweetalert2';
import { ethers } from 'ethers';

export const cancelListing = async (Moralis, listingId) => {
  //const web3 = await Moralis.enableWeb3();
  const chainHex = await Moralis.chainId;
  let contractAddress = ContractAddress('LISTING', chainHex);

  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const contract = new ethers.Contract(
    contractAddress,
    ListingABI,
    ethersProvider.getSigner()
  );

  try {
    const tx = await contract.cancelListing(listingId);
    return await tx.wait();
  } catch (e) {
    return e;
  }
};
