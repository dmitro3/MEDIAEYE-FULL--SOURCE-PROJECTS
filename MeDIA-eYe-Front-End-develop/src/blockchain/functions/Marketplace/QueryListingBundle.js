import { ChainHexString } from '../ChangeChain/ChainHexStrings';

export const queryListingBundle = async (Moralis, id, chain) => {
  try {
    const Listings = Moralis.Object.extend('MediaEyeListing');
    const query = new Moralis.Query(Listings);
    query.equalTo('objectId', id);
    query.equalTo('chainId', ChainHexString(chain));
    const result = await query.first();
    const NFTs = Moralis.Object.extend('MediaEyeListingNFT');
    const listing = new Listings();
    listing.set('id', result.id);
    const query2 = new Moralis.Query(NFTs);
    query2.equalTo('parent', listing);
    query2.include('nft');
    const bundledListingNFTs = await query2.find();
    return [result, bundledListingNFTs];
  } catch (e) {
    console.log(e);
  }
};
