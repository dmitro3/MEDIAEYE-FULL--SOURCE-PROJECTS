import { ChainHexString } from '../ChangeChain';

export const queryFeaturedCollections = async (Moralis, chain, checkOwner) => {
  let result = [];
  if (checkOwner) {
    // display for owner of featured items only
    const Featured = Moralis.Object.extend('FeaturedCollections');
    const query = new Moralis.Query(Featured);
    query.equalTo('chainId', ChainHexString(chain));
    query.equalTo('featureType', 'collection');
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
      featuredType: 'collection',
      chainHex: ChainHexString(chain)
    });
  }

  let collectionAddresses = [];
  for (let i = 0; i < result.length; i++) {
    collectionAddresses.push(
      result[i].contractAddress ?? result[i].attributes?.contractAddress
    );
  }

  let collections = [];
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  for (let i = 0; i < collectionAddresses.length; i++) {
    const query2 = new Moralis.Query(Collection);
    query2.equalTo('collectionAddress', collectionAddresses[i]);
    collections.push(await query2.first());
  }
  return collections;
};
