import { TokenAddress, ContractAddress, IsStableCoin } from '../Addresses';
import { default as FeeABI } from '../../abi/MediaEyeFee.json';
import { ethers } from 'ethers';
import { ZERO_ADDRESS } from '../Addresses';
import FEATURETYPE from '../../../utils/featureConstants';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @param paymentMethod is the erc20 token address to be used as payment method
 * @param tokenAddresses is the list of token addresses to feature
 * @param tokenIds is the list of corresponding token ids with the token addresses
 * @param startTime is the time to start featuring
 * @param duration is the number of days to feature for: 3, 5, or 7
 * @param featureType integer representing what type of feature this is:
 *                    0 single NFT
 *                    1 group of NFTs
 *                    2 collection 721
 *                    3 collection 1155
 *                    4 listing
 *                    5 auction
 *                    6 airdrop
 *                    7 event
 * @param collectionAddress contract address to be featured. Used when featuring a collection. 0 address if listing or NFT
 * @param listingId listing id to be featured. Used only when featuring listings
 * @param auctionId auction id to be featured. Used only when featuring auctions
 * @param price is the amount of token paid in wei
 * @param user the address of the user making this transaction
 * @returns
 */
export const payFeature = async (
  Moralis,
  paymentMethod,
  tokenAddresses,
  tokenIds,
  startTime,
  duration,
  featureType,
  collectionAddress,
  listingId,
  auctionId,
  price,
  user
) => {
  // check length of tokenIds and tokenAddresses make sure equal
  // handle payableAmount field only for the native token addresses
  let payableEth = 0;
  if (['bnb', 'ftm', 'eth'].includes(paymentMethod.toLowerCase())) {
    // token amount in wei / eth
    payableEth = price.totalPrice;
  }

  const chainHex = Moralis.chainId;

  if (IsStableCoin(paymentMethod)) {
    price = price.USDTotalPrice;
  } else if (paymentMethod === 'EYE') {
    price = price.eyeTotalPrice;
  } else {
    price = price.totalPrice;
  }

  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);

  const feeContract = new ethers.Contract(
    ContractAddress('FEE', chainHex),
    FeeABI,
    ethersProvider.getSigner()
  );

  let tx = null;

  switch (featureType) {
    case FEATURETYPE.SingleNFT:
      try {
        tx = await feeContract.payFeatureFee(
          TokenAddress(paymentMethod, chainHex),
          tokenAddresses,
          tokenIds,
          [
            startTime,
            duration,
            featureType,
            ZERO_ADDRESS,
            0,
            0,
            0,
            user,
            price
          ],
          { value: payableEth }
        );
      } catch (error) {
      }
      break;
    case FEATURETYPE.GroupNFT:
      try {
        tx = await feeContract.payFeatureFee(
          TokenAddress(paymentMethod, chainHex),
          tokenAddresses,
          tokenIds,
          [
            startTime,
            duration,
            featureType,
            ZERO_ADDRESS,
            0,
            0,
            0,
            user,
            price
          ],
          { value: payableEth }
        );
      } catch (error) {
        console.log(error);
      }
      break;
    case FEATURETYPE.Collection1155:
    case FEATURETYPE.Collection721:
      try {
        tx = await feeContract.payFeatureFee(
          TokenAddress(paymentMethod, chainHex),
          [],
          [],
          [
            startTime,
            duration,
            featureType,
            collectionAddress,
            listingId,
            auctionId,
            0,
            user,
            price
          ],
          { value: payableEth }
        );
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      break;
  }

  try {
    const result = await tx.wait();
    if (result) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};
