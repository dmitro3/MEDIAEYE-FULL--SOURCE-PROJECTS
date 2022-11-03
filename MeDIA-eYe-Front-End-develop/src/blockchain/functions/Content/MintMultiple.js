import { default as Mint1155ABI } from '../../abi/Factory1155.json';
import { default as Mint721ABI } from '../../abi/Factory721.json';
import { ContractAddress } from '../Addresses';
import Swal from 'sweetalert2';

export const mintMultiple = async (
  Moralis,
  activeToken,
  contentList,
  unlockableContentList,
  hashs,
  userAddress,
  amounts,
  collectionAddress
) => {
  // enable web3 before executing functions
  const chainHex = await Moralis.chainId;
  let stringList = contentList.map(async (content, i) => {
    // save unlockableContent if any
    if (unlockableContentList[i] && unlockableContentList[i] !== '') {
      const UnlockableContent = Moralis.Object.extend('UnlockableContent');
      let newUnlockableContent = new UnlockableContent();
      newUnlockableContent.set('content', unlockableContentList[i]);
      newUnlockableContent.set('confirmed', false);
      newUnlockableContent = await newUnlockableContent.save();
      content['unlockableContentId'] = newUnlockableContent.id;
    }

    return JSON.stringify(content);
  });

  let mintContract = [];
  if (activeToken === 'ERC1155') {
    mintContract = {
      abi: Mint1155ABI,
      contractAddress: ContractAddress('ERC1155_MAIN', chainHex),
      functionName: 'mintBatch',
      params: {
        _to: userAddress,
        _data: '0x',
        _amounts: amounts,
        _tokenDatum: stringList,
        _metadataURIs: hashs
      }
    };
  } else {
    mintContract = {
      abi: Mint721ABI,
      contractAddress: ContractAddress('ERC721_MAIN', chainHex),
      functionName: 'mint',
      params: {
        _to: userAddress,
        _tokenDatum: stringList,
        _metadataURIs: hashs
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
  }
};
