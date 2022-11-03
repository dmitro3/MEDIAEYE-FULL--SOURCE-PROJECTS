import { default as FeeABI } from '../../abi/MediaEyeFee';
import { ContractAddress } from '../Addresses/ContractAddresses';
import ChangeChainRequest from '../../functions/ChangeChain/ChangeChainRequest';
import { TokenDecimal } from '../../functions/Addresses/TokenDecimals';

export const convertPrice = async (Moralis, params) => {
  const moralisChain = await Moralis.chainId;
  if (moralisChain && params.chainId !== moralisChain) {
    ChangeChainRequest(params.chainId);
    return;
  }

  // boolean, false for ftm/eth or true for bsc
  const invertedAggregator =
    params.chainId === '0x38' || params.chainId === '0x61' ? true : false;

  const convertFunction = {
    abi: FeeABI,
    contractAddress: ContractAddress('FEE', params.chainId),
    functionName: 'convertPrice',
    params: {
      _baseAmount: params.price,
      _baseDecimals: params.baseToken ? TokenDecimal(params.baseToken) : TokenDecimal(params.token),
      _queryDecimals: TokenDecimal(params.token),
      _invertedAggregator: invertedAggregator,
      _convertToNative: params.native
    }
  };

  try {
    const convertPrice = await Moralis.executeFunction(convertFunction);
    return convertPrice;
  } catch (e) {
    console.log(e);
  }
};
