import { queryNFT } from '../Account';

export const queryListingsByNFT = async (
  Moralis,
  collectionAddress,
  tokenId,
  page
) => {
  // enable web3 before executing functions
  const nft = await queryNFT(Moralis, {
    colAddress: collectionAddress,
    tokenId: tokenId
  });
  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const check_nft = new NFT();
  check_nft.id = nft.id;
  const ListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  const query = new Moralis.Query(ListingNFT);
  query.equalTo('nft', check_nft);
  query.include('parent');
  query.descending('startTime');
  const result = await query.find();
  let nfts = [];
  let results = [];
  result.map((listingNFT) => {
    if (
      listingNFT?.attributes?.parent?.attributes?.size === 'single' &&
      listingNFT?.attributes.parent?.attributes?.status === 'available'
    ) {
      results.push(listingNFT?.attributes?.parent);
      nfts.push(listingNFT);
    }
  });
  return [results, nfts];
};
