import { default as infoABI } from '../../abi/MediaEyeInfo.json';
import { ContractAddress } from '../Addresses';

export const querySoldStatus = async (Moralis, collectionAddress, tokenId) => {
  const chainHex = await Moralis.chainId;
  let contractAddress = ContractAddress('INFO', chainHex);

  const infoContract = {
    abi: infoABI,
    contractAddress: contractAddress,
    functionName: 'getSoldStatus',
    params: {
      _nftTokenAddress: collectionAddress,
      _nftTokenId: tokenId
    }
  };
  try {
    const isSold = await Moralis.executeFunction(infoContract);
    return isSold;
  } catch (e) {
    return false;
  }
};
