import { default as ListingABI } from '../../abi/MediaEyeListing.json';
import { ContractAddress, TokenName } from '../Addresses';
import { ethers } from 'ethers';
import { zeroAddress } from 'ethereumjs-util';

export const buyListing = async (Moralis, listingRequest) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();
  const chainHex = await Moralis.chainId;
  let contractAddress = ContractAddress('LISTING', chainHex);
  // handle payableAmount field only for the native Token address
  let payableEth = '0';
  if (listingRequest._paymentMethod[0].toLowerCase() === zeroAddress()) {
    // token amount in wei / eth
    payableEth = ethers.utils.formatEther(listingRequest._paymentMethod[1]);
  }

  const listingContract = {
    abi: ListingABI,
    contractAddress: contractAddress,
    functionName: 'buyTokens',
    msgValue: Moralis.Units.ETH(payableEth),
    params: listingRequest
  };

  try {
    const buyListing = await Moralis.executeFunction(listingContract).then(
      async (receipt) => {
        const result = await receipt.wait();
        return result;
      }
    );

    return buyListing;
  } catch (e) {
    return e;
  }
};
