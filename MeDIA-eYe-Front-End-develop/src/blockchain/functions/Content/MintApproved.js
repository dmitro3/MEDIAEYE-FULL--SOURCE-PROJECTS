import { default as Mint721ABI } from '../../abi/Factory721.json';
import { default as Mint1155ABI } from '../../abi/Factory1155.json';
import Swal from 'sweetalert2';
export const mintApproved = async (
  Moralis,
  activeToken,
  approvedFileId,
  imageIPFS,
  userAddress,
  amount,
  collectionAddress
) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();

  const chainId = await Moralis.getChainId();
  let mintContract = {};

  if (activeToken === 'ERC721') {
    let contractAddress = process.env.REACT_APP_721_MAIN_ADDRESS;
    if (chainId === 56) {
      contractAddress = process.env.REACT_APP_721_BSC_ADDRESS;
    }
    mintContract = {
      abi: Mint721ABI,
      contractAddress: contractAddress,
      functionName: 'mint',
      params: {
        _to: userAddress,
        _amount: 1,
        _tokenData: { test1: 'test1', test2: 'test2' },
        _mediaUri: imageIPFS
      }
    };
  } else if (activeToken === 'ERC1155') {
    let contractAddress = process.env.REACT_APP_1155_MAIN_ADDRESS;
    if (chainId === 56) {
      contractAddress = process.env.REACT_APP_1155_BSC_ADDRESS;
    }
    mintContract = {
      abi: Mint1155ABI,
      contractAddress: contractAddress,
      functionName: 'mint',
      params: {
        _to: userAddress,
        _data: '0x',
        _amount: amount,
        _tokenData: approvedFileId,
        _mediaUri: imageIPFS
      }
    };
  }
  // set to a user's collection
  if (collectionAddress !== 'none') {
    mintContract['contractAddress'] = collectionAddress;
  }
  try {
    // save metadata in a cloud function after mint is executed
    const transactionStatus = await Moralis.executeFunction(mintContract).then(
      (receipt) => {
        if (receipt.status) {
          return true;
        } else {
          return false;
        }
      }
    );
    return transactionStatus;
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Metamask error!',
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
  }
};
