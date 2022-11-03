import { TokenAddress } from '../Addresses';
import { default as AirdropABI } from '../../abi/Airdrop.json';
import { ethers } from 'ethers';
import { ContractAddress } from '../Addresses/ContractAddresses';
import { ChainName } from '../ChangeChain';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns
 */
export const priceAirdrop = async (Moralis, priceReq) => {
  try {
    const chainId = priceReq.chainId;
    // convert provider to ethers
    const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

    const contract = new ethers.Contract(
      ContractAddress('AIRDROP', chainId),
      AirdropABI,
      ethersProvider.getSigner()
    );

    let eyePrice;
    let eyeTotalPrice;
    if (ChainName(chainId).toLowerCase() != 'ftm') {
      eyePrice = await contract.paymentMethodAmounts(
        TokenAddress('EYE', chainId)
      );
      eyeTotalPrice = eyePrice.airdropPricePerDay.mul(priceReq.activeDays);
    }

    const baseUSDRes = await contract.baseUSDTokenAmounts();
    const USDpricePerDay = baseUSDRes.airdropPricePerDay;

    const stablePrice = USDpricePerDay.mul(priceReq.activeDays);
    // boolean, false for ftm/eth or true for bsc
    const invertedAggregator = chainId === '0x38' ? true : false;

    const convertedRes = await contract.convertPrice(
      stablePrice,
      baseUSDRes['tokenDecimals'],
      18,
      invertedAggregator,
      true
    );

    return {
      nativePrice: convertedRes.mul('105').div('100'),
      stablePrice: stablePrice,
      eyePrice: eyeTotalPrice
    };
  } catch (e) {
    return e;
  }
};
