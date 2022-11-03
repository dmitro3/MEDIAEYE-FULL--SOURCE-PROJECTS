import { default as abiForConverting } from '../../abi/MediaEyeFee';
import { ContractAddress, TokenName, ZERO_ADDRESS } from '../Addresses';
import Web3 from 'web3';

export const queryListingFloorByNft = async (Moralis, nftId) => {
  // enable web3 before executing functions
  const web3 = new Web3(Moralis.provider);

  const Listing = Moralis.Object.extend('MediaEyeListing');
  const listingQuery = new Moralis.Query(Listing);
  listingQuery.equalTo('size', 'single');
  listingQuery.equalTo('type', 'listing');
  listingQuery.equalTo('status', 'available');

  const ListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  const listingNftQuery = new Moralis.Query(ListingNFT);
  listingNftQuery.equalTo('nft', nftId);
  listingNftQuery.include('parent');
  listingNftQuery.matchesQuery('parent', listingQuery);
  const listingNfts = await listingNftQuery.find();

  // calculate floor price
  let floorPrice = 0;
  for (let i = 0; i < listingNfts.length; i++) {
    const listing = listingNfts[i].get('parent');
    const listingPayments = listing.get('listingPayments');
    const listingPriceType = listingPayments[0][0];
    let listingPrice = listingPayments[0][1];
    const chain = listing.get('chainId');

    // convert currency if needed
    if (listingPriceType !== ZERO_ADDRESS) {
      const addrForConverting = ContractAddress('FEE', chain);
      const priceFeed = new web3.eth.Contract(
        abiForConverting,
        addrForConverting
      );
      const isBSC = chain === '0x38';
      let units = 18;
      if (TokenName(listingPriceType.toLowerCase(), chain).startsWith('USDT')) {
        units = 8;
      }
      listingPrice = await priceFeed.methods
        .convertPrice(
          listingPrice,
          units, // 8 if usdt
          18,
          isBSC,
          true
        )
        .call();
    }

    // update floor price if needed
    if (floorPrice === 0 || listingPrice < floorPrice) {
      floorPrice = listingPrice;
    }
  }

  return String(floorPrice);
};
