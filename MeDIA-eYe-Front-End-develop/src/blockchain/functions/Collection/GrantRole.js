import { default as MediaEye1155ABI } from '../../abi/Factory1155';
import { default as MediaEye721ABI } from '../../abi/Factory721';
import { ContractAddress } from '../Addresses';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { EMPTY_SIG } from '../Subscription/EmptySig';
import CrossChainSig from '../../functions/Subscription/CrossChainSig';
import Web3 from 'web3';
/**
 *
 * @param Moralis is the moralis sdk instance
 * @param collectionType is the string collectionType of an nft
 * @param collectionAddress is the string collectionAddress of an nft
 * @param listingType is the integer type of listing 0 for LISTING, 1 for AUCTION
 * @returns
 */
export const grantRole = async (Moralis, collectionAddress, minter) => {
  let tokenABI = MediaEye1155ABI; // currently the same ABI for ERC721 and ERC1155
  const MINTER_ROLE = process.env.REACT_APP_MINTER_ROLE;
  // enable web3 before executing functions
  //const web3 = await Moralis.enableWeb3();
  const web3 = new Web3(Moralis.provider);
  const chainHex = await Moralis.chainId;

  const user = Moralis.User.current();

  // get subscription sig
  const subscriptionSig = await CrossChainSig(user, chainHex);
  let ethersProvider = new ethers.providers.Web3Provider(web3.currentProvider);

  const contract = new ethers.Contract(
    collectionAddress,
    tokenABI,
    ethersProvider.getSigner()
  );
  try {
    const tx = await contract.grantRoleBySig(
      MINTER_ROLE,
      minter.address,
      subscriptionSig
    );

    const result = await tx.wait();
    if (result.status) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: `Role Granted! ${result.transactionHash}`,
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
        title: 'Grant Role Failed',
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
  } catch (e) {
    console.log(e);
  }
};
