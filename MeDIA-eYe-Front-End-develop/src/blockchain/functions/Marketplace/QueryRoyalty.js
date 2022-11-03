import { default as infoABI } from '../../abi/MediaEyeInfo.json';
import { ContractAddress } from '../Addresses';

export const queryRoyalty = async (Moralis, collectionAddress, tokenId) => {
  // enable web3 before executing functions
  const web3 = await Moralis.enableWeb3();
  let contractAddress = ContractAddress('INFO', web3.currentProvider.chainId);
  const infoContract = {
    abi: infoABI,
    contractAddress: contractAddress,
    functionName: 'getRoyalty',
    params: {
      _nftTokenAddress: collectionAddress,
      _nftTokenId: tokenId
    }
  };
  try {
    const [royaltyOwner, royaltyPercent] = await Moralis.executeFunction(
      infoContract
    );
    return royaltyPercent / 100;
  } catch (e) {
    return false;
  }
};
