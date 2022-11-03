import { ChainHexString } from '../ChangeChain';

export const queryFeaturedNFTListings = async (Moralis, chain, checkOwner) => {
  let result = [];
  if (checkOwner) {
    // display for owner of featured items only
    const Featured = Moralis.Object.extend('FeaturedNFTs');
    const query = new Moralis.Query(Featured);
    query.equalTo('chainId', ChainHexString(chain));
    query.equalTo('featureType', 'NFT');
    query.descending('startTime');

    const currentUser = Moralis.User.current();
    query.equalTo('featuredBy', currentUser.attributes.ethAddress);

    const currentUnixTimestamp = Math.round(new Date().getTime() / 1000);
    query.lessThanOrEqualTo('startTime', currentUnixTimestamp);
    query.greaterThanOrEqualTo('endTime', currentUnixTimestamp);

    result = await query.find();
  } else {
    // display random sample 10 for public
    result = await Moralis.Cloud.run('queryFeatured', {
      limit: 10,
      featuredType: 'NFT',
      chainHex: ChainHexString(chain)
    });
  }

  let NFTInfo = [];
  for (let i = 0; i < result.length; i++) {
    const object = result[i];
    NFTInfo.push({
      tokenAddress: object.tokenAddress ?? object.attributes?.tokenAddress,
      tokenId: object.tokenId ?? object.attributes?.tokenId,
      chainId: object.chainId ?? object.attributes?.chainId
    });
  }

  let listings = [];
  let nfts = [];
  for (let i = 0; i < NFTInfo.length; i++) {
    // nft constraints
    const NFT = Moralis.Object.extend('MediaEyeNFT');
    const innerQuery = new Moralis.Query(NFT);
    innerQuery.equalTo('collectionAddress', NFTInfo[i].tokenAddress);
    innerQuery.equalTo('tokenId', NFTInfo[i].tokenId);
    innerQuery.equalTo('chainId', NFTInfo[i].chainId);
    // listing constraints
    const Listing = Moralis.Object.extend('MediaEyeListing');
    const parentQuery = new Moralis.Query(Listing);
    parentQuery.equalTo('status', 'available');
    // query listingnfts
    const ListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
    const query = new Moralis.Query(ListingNFT);
    query.matchesQuery('nft', innerQuery);
    query.matchesQuery('parent', parentQuery);
    query.include('parent');
    query.include('nft');
    query.descending('startTime');
    const result = await query.first();
    if (result) {
      listings.push(result.get('parent'));
      nfts.push([result]);
    }
  }
  return [listings, nfts];
};
