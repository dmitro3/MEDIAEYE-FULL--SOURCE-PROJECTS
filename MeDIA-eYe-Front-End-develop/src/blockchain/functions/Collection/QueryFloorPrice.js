import { TokenName, ZERO_ADDRESS } from '../Addresses';
import { convertPrice } from '../Utils';

export const queryFloorPrice = async (Moralis, collectionAddress, chain) => {
  // enable web3 before executing functions
  // const web3 = new Web3(Moralis.provider);

  // // alternative method needs to add collectionAddress col to listings table
  // const Listing = Moralis.Object.extend('MediaEyeListing');
  // const query = new Moralis.Query(Listing);
  // query.equalTo('collectionAddress', collectionAddress); // -> only single listings and auctions
  // query.equalTo('type', 'listing');
  // query.equalTo('status', 'available');

  const Listing = Moralis.Object.extend('MediaEyeListing');
  const query = new Moralis.Query(Listing);

  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const innerInnerQuery = new Moralis.Query(NFT);
  innerInnerQuery.equalTo('collectionAddress', collectionAddress);

  const ListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  const innerQuery = new Moralis.Query(ListingNFT);
  innerQuery.matchesQuery('nft', innerInnerQuery);

  query.equalTo('type', 'listing');
  query.equalTo('size', 'single');
  query.equalTo('status', 'available');
  query.matchesQuery('nfts', innerQuery);

  const listings = await query.find();

  // calculate floor price
  let floorPrice = 0;
  for (let i = 0; i < listings.length; i++) {
    const listing = listings[i];
    const listingPayments = listing.get('listingPayments');
    const listingPriceType = listingPayments[0][0];
    let listingPrice = listingPayments[0][1];

    // convert currency if needed
    if (listingPriceType !== ZERO_ADDRESS) {
      const params = {
        chainId: chain,
        price: listingPrice,
        token: TokenName(listingPriceType.toLowerCase(), chain),
        native: true
      };
      listingPrice = await convertPrice(Moralis, params);
    }

    // update floor price if needed
    if (floorPrice === 0 || listingPrice < floorPrice) {
      floorPrice = listingPrice;
    }
  }

  return String(floorPrice);
};
