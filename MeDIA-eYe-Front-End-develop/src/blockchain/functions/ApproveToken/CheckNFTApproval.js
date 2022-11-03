import { default as MediaEye1155ABI } from '../../abi/Factory1155';
import { default as MediaEye721ABI } from '../../abi/Factory721';
import { ContractAddress } from '../Addresses';
import { ethers } from 'ethers';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
/**
 * @param Moralis is the moralis sdk instance
 * @param accountAddress is the account to approve
 * @param collectionType is the string collectionType of an nft
 * @param collectionAddress is the string collectionAddress of an nft
 * @param listingType is the integer type of listing 0 for LISTING, 1 for AUCTION, 2 for OFFER, 3 for AIRDROP
 * @returns true if nft is approved for the operator and false otherwise
 */
export const checkNFTApproval = async (
  Moralis,
  accountAddress,
  collectionType,
  collectionAddress,
  listingType,
  dispatch
) => {
  let tokenABI = [];
  if (collectionType === 'ERC1155') {
    tokenABI = MediaEye1155ABI;
  } else if (collectionType === 'ERC721') {
    tokenABI = MediaEye721ABI;
  } else {
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: 'Collection Type unspecified for approval check',
        textButton: 'OK',
        size: 'sm'
      })
    );

    return;
  }

  const chainHex = await Moralis.chainId;

  let operator =
    listingType === 2
      ? ContractAddress('OFFER', chainHex)
      : listingType === 0
        ? ContractAddress('LISTING', chainHex)
        : listingType === 1
          ? ContractAddress('AUCTION', chainHex)
          : listingType === 3
            ? ContractAddress('AIRDROP', chainHex)
            : null;

  try {
    const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
    const contract = new ethers.Contract(
      collectionAddress,
      tokenABI,
      ethersProvider.getSigner()
    );
    return await contract.isApprovedForAll(accountAddress, operator);
  } catch (e) {
    console.log('testing', e);
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        title: 'Failed to check NFT approval status',
        message: e?.data?.message
          ? e.data.message
          : e.message
            ? e.message
            : 'Something went wrong. Try again',
        size: 'sm',
        textButton: 'OK'
      })
    );
  }
};
