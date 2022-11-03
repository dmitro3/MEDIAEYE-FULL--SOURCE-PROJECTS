import { getCollectionABI } from '../Utils/';
import { ethers } from 'ethers';
import { toggleGeneralPopup, closeGeneralPopup } from '../../../store/app/appSlice';
import { ChainScanerLink } from '../ChangeChain/ChainNames';
const getContract = async (Moralis, collectionAddress, ABI) => {
  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
  const contract = new ethers.Contract(
    collectionAddress,
    ABI,
    ethersProvider.getSigner()
  );
  return contract;
};
const burnERC721 = async (Moralis, collectionAddress, ABI, id) => {
  const contract = await getContract(Moralis, collectionAddress, ABI);
  const tx = await contract.burn(id);
  const result = await tx.wait();
  return result;
};

const burnERC1155 = async (Moralis, collectionAddress, ABI, id, amount) => {
  const contract = await getContract(Moralis, collectionAddress, ABI);

  const tx = await contract.burnBatch([id], [amount]);
  const result = await tx.wait();
  return result;
};

export const burnToken = async (
  dispatch,
  Moralis,
  collectionType,
  collectionAddress,
  id,
  chainId,
  amount = 1
) => {
  dispatch(
    toggleGeneralPopup({
      status: 'loading',
      message: 'Processing...',
      size: 'xs'
    })
  );

  const ABI = getCollectionABI(collectionType);
  if (ABI.length === 0) {
    dispatch(closeGeneralPopup());
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: 'Collection Type unspecified for burn',
        size: 'sm',
        textButton: 'OK'
      })
    );
    return 0;
  }

  try {
    let result = collectionType === 'ERC721' ? await burnERC721(Moralis, collectionAddress, ABI, id) : await burnERC1155(Moralis, collectionAddress, ABI, id, amount);
    dispatch(closeGeneralPopup());
    if (result.status) {
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          title: `${amount <= 1 ? amount + ' Token Burned!' : amount + ' Tokens Burned!'} Successful`,
          message: 'For more details view:',
          size: 'sm',
          copyText: result.transactionHash,
          copyTextLink: ChainScanerLink(chainId) + '/tx/' + result.transactionHash,
          textButton: 'OK',
          autoClose: 'false'
        })
      );
      return amount;
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          title: 'Token Burn Failed',
          message: result?.data?.message ? result.data.message : result.message ? result.message : 'Something went wrong. Try again',
          size: 'sm',
          textButton: 'OK'
        })
      );
      return 0;
    }
  } catch (error) {
    dispatch(closeGeneralPopup());
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        title: 'Token Burn Failed',
        message: error?.message ? error.message : 'Something went wrong. Try again',
        size: 'sm',
        textButton: 'OK'
      })
    );
  }
};
