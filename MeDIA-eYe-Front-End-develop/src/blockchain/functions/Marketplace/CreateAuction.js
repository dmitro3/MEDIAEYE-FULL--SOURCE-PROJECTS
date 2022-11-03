import { default as AuctionABI } from '../../abi/MediaEyeAuction.json';
import { ContractAddress } from '../Addresses';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';

export const createAuction = async (Moralis, auctionRequest) => {
  const chainHex = await Moralis.chainId;
  let contractAddress = ContractAddress('AUCTION', chainHex);

  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const contract = new ethers.Contract(
    contractAddress,
    AuctionABI,
    ethersProvider.getSigner()
  );

  try {
    const tx = await contract.startAuction(auctionRequest);
    const result = await tx.wait();
    return result;
  } catch (e) {
    //console.log(e);
    return e;
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
    return false;
  }
};
