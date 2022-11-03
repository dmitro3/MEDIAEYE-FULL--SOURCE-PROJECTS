import { default as OfferABI } from '../../abi/MediaEyeOffer.json';
import { ContractAddress } from '../Addresses';
import { ZERO_ADDRESS } from '../Addresses';
import { getOwnerAddresses } from '../Utils';

export const claimOffer = async (Moralis, offer) => {
  const currentUser = Moralis.User.current();
  const nft = offer?.attributes?.nft;
  if (!offer?.attributes || !nft?.attributes || !currentUser) {
    return;
  }
  // check owner
  const chainHex = await Moralis.chainId;
  const { ownerAddresses } = await getOwnerAddresses(
    Moralis,
    nft.attributes.collectionAddress,
    nft.attributes.tokenId,
    chainHex
  );
  const ownNFT = ownerAddresses.includes(currentUser.attributes.ethAddress);
  if (!ownNFT) return;

  // claim offer
  let contractAddress = ContractAddress('OFFER', chainHex);
  const nftInfo = [
    nft.attributes.collectionType === 'ERC721' ? 1 : 0,
    nft.attributes.collectionAddress,
    nft.attributes.tokenId,
    offer.attributes.supply
  ];
  const claimRequest = [
    nftInfo,
    offer.attributes.price,
    offer.attributes.offerer,
    offer.attributes.paymentMethod,
    offer.attributes.expiry,
    ZERO_ADDRESS,
    0,
    offer.attributes.v,
    Buffer.from(offer.attributes.r, 'hex'),
    Buffer.from(offer.attributes.s, 'hex')
  ];
  const offerContract = {
    abi: OfferABI,
    contractAddress: contractAddress,
    functionName: 'offerClaim',
    params: { _offerSignature: claimRequest }
  };

  try {
    const claimed = await Moralis.executeFunction(offerContract).then(
      (receipt) => {
        return receipt;
      }
    );
    return claimed;
  } catch (e) {
    return e;
  }
};
