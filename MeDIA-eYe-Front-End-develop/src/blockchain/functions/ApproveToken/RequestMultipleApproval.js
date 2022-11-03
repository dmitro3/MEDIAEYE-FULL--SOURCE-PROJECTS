import { default as MediaEyeApproval } from '../../abi/MediaEyeApproval';
import Swal from 'sweetalert2';

/**
 * @returns
 */
export const requestMultipleApproval = async (Moralis, notApproved) => {
  let operators = [
    process.env.REACT_APP_LISTING_ADDRESS,
    process.env.REACT_APP_AUCTION_ADDRESS
  ];

  let tokenABI = MediaEyeApproval;

  let approved = [];
  let tokens = notApproved.map((product) => {
    approved.push(true);
    return product.attributes.nft.attributes.collectionAddress;
  });
  // enable web3 before executing functions
  // await Moralis.enableWeb3();

  const tokenContract = {
    abi: tokenABI,
    contractAddress: process.env.REACT_APP_APPROVAL_ADDRESS,
    functionName: 'setApprovalForAllMultiple',
    params: {
      _tokens: tokens,
      _operators: operators,
      _approved: approved
    }
  };
  // rather than using wait() (doesn't seem to work with Moralis) call .then to handle result after await
  const result = await Moralis.executeFunction(tokenContract).then(
    (receipt) => {
      if (receipt.status) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: `Token Approved! ${receipt.transactionHash}`,
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
    }
  );
  return result;
};
