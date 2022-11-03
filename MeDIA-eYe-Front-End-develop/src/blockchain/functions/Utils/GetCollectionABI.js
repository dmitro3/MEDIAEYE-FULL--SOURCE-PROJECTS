import { default as MediaEye1155ABI } from '../../abi/Factory1155.json';
import { default as MediaEye721ABI } from '../../abi/Factory721.json';

export const getCollectionABI = (collectionType) => {
  if (collectionType === 'ERC1155') {
    return MediaEye1155ABI;
  } else if (collectionType === 'ERC721') {
    return MediaEye721ABI;
  } else {
    return [];
  }
};
