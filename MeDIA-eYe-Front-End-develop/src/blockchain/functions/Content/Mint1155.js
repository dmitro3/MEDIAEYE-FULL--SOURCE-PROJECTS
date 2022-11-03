import { default as Mint1155ABI } from '../../abi/MediaEyeMint1155.json';
import { ContractAddress } from '../Addresses';
import Swal from 'sweetalert2';

export const mint1155 = async (
  Moralis,
  activeToken,
  content,
  unlockableContent,
  userAddress,
  collectionAddress
) => {
  const chainHex = await Moralis.chainId;

  // save unlockableContent if any
  if (unlockableContent && unlockableContent !== '') {
    const UnlockableContent = Moralis.Object.extend('UnlockableContent');
    let newUnlockableContent = new UnlockableContent();
    newUnlockableContent.set('content', unlockableContent);
    newUnlockableContent.set('confirmed', false);
    newUnlockableContent = await newUnlockableContent.save();
    content['unlockableContentId'] = newUnlockableContent.id;
  }

  let mintContract = {};
  if (activeToken === 'ERC1155') {
    let contractAddress = ContractAddress('ERC1155_MAIN', chainHex);
    mintContract = {
      abi: Mint1155ABI,
      contractAddress: contractAddress,
      functionName: 'mint',
      params: {
        _to: userAddress,
        _data: '0x',
        _amount: content.amount,
        _tokenData: JSON.stringify(content),
        _metadataURI: content.metadata
      }
    };
  }
  // set to a user's collection
  if (collectionAddress !== 'none') {
    mintContract['contractAddress'] = collectionAddress;
  }

  try {
    // save metadata in a cloud function after mint is executed
    const tx = await Moralis.executeFunction(mintContract).then((receipt) => {
      return receipt;
    });
    const result = await tx.wait();
    return result;
  } catch (e) {
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
  }
};
