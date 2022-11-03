import { default as MediaEye1155ABI } from '../../abi/Factory1155.json';
import { default as MediaEye721ABI } from '../../abi/Factory721.json';
import { ContractAddress } from '../Addresses';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @param collectionType is the string collectionType of an nft
 * @param collectionAddress is the string collectionAddress of an nft
 * @param listingType is the integer type of listing 0 for LISTING, 1 for AUCTION, 2 for OFFER, 3 for AIRDROP
 * @returns
 */
export const requestNFTApproval = async (
  Moralis,
  collectionType,
  collectionAddress,
  listingType
) => {
  let tokenABI = [];
  if (collectionType === 'ERC1155') {
    tokenABI = MediaEye1155ABI;
  } else if (collectionType === 'ERC721') {
    tokenABI = MediaEye721ABI;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Collection Type unspecified for approval',
      customClass: {
        popup:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup'
            : 'swal_popup',
        title:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_title'
            : 'swal_popup_title',
        htmlContainer:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_text'
            : 'swal_popup_text',
        confirmButton: 'swal_popup_button'
      }
    });
    return;
  }

  // enable web3 before executing functions
  //const web3 = await Moralis.enableWeb3();
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

  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const contract = new ethers.Contract(
    collectionAddress,
    tokenABI,
    ethersProvider.getSigner()
  );

  const tx = await contract.setApprovalForAll(operator, true);
  const result = await tx.wait();
  return result;
  if (result.status) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: `Token Approved! ${result.transactionHash}`,
      customClass: {
        popup:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup'
            : 'swal_popup',
        title:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_title'
            : 'swal_popup_title',
        htmlContainer:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_text'
            : 'swal_popup_text',
        confirmButton: 'swal_popup_button'
      }
    });
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Token Approve Failed',
      customClass: {
        popup:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup'
            : 'swal_popup',
        title:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_title'
            : 'swal_popup_title',
        htmlContainer:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_text'
            : 'swal_popup_text',
        confirmButton: 'swal_popup_button'
      }
    });
    return false;
  }
};
