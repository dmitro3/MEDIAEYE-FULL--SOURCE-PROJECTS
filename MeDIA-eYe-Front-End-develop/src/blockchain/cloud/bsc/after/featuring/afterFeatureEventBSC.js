Moralis.Cloud.afterSave('EventBSCFeaturePaid', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------After Featuring Collection BSC--------------------------------'
  );

  // determine the type of feature (featuretype in featuredStruct)
  // 1: NFT 4: collection
  const featuredStruct = await request.object.get('featured');
  const startTime = await request.object.get('startTime');
  const endTime = await request.object.get('endTime');
  const featuredBy = await request.object.get('purchaser');
  const featureType = featuredStruct[2];
  const contractAddress = featuredStruct[3];
  const id = featuredStruct[6];
  const tokenIds = await request.object.get('tokenIds');
  const tokenAddresses = await request.object.get('tokenAddresses');

  const setCommon = (featuredObject) => {
    featureObject.set('chainId', '0x38');
    featureObject.set('featureId', id);
    featureObject.set('featuredBy', featuredBy);
    featureObject.set('featureType', DEFINITIONS[featureType]['name']);
    featureObject.set('startTime', Number(startTime));
    featureObject.set('endTime', Number(endTime));

    return featuredObject;
  };

  const setOverlappingTimes = (featuredObject) => {
    const objectStartTime = featuredObject.get('startTime');
    const objectEndTime = featuredObject.get('endTime');

    // 3 cases

    // case 1: startTime < objectStartTime < endTime < objectEndTime
    if (startTime < objectStartTime < endTime < objectEndTime) {
      const delta = endTime - objectStartTime;
      featuredObject.set('startTime', Number(startTime));
      featureObject.set('endTime', Number(objectEndTime + delta));
    }

    // case 2: endTime > objectEndTime  > startTime > objectStartTime
    else if (objectStartTime < startTime < objectEndTime < endTime) {
      const delta = objectEndTime - startTime;
      featureObject.set('endTime', Number(endTime + delta));
      // no need to alter the start time
    }

    // case 3: objectStartTime < startTime < endTime < objectEndTime
    else if (objectStartTime < startTime < endTime < objectEndTime) {
      const delta = endTime - startTime;
      featureObject.set('endTime', Number(objectEndTime + delta));
    }

    // case 4: startTime < objectStartTime < objectEndTime < endTime
    else {
      const delta = objectEndTime - objectStartTime;
      featureObject.set('startTime', Number(startTime));
      featureObject.set('endTime', Number(endTime + delta));
    }

    return featuredObject;
  };

  const DEFINITIONS = {
    1: { name: 'NFT', columns: ['tokenId', 'tokenAddress'] },
    4: { name: 'collection', columns: ['contractAddress'] }
  };

  let featureObject;

  switch (DEFINITIONS[featureType]['name']) {
    case 'NFT':
      const FeaturedNFTs = Moralis.Object.extend('FeaturedNFTs');

      const query = new Moralis.Query(FeaturedNFTs);
      query.equalTo('featuredBy', featuredBy);
      query.equalTo('featureType', DEFINITIONS[featureType]['name']);
      query.equalTo('chainId', '0x38');
      // check if start/end times overlap
      query.greaterThan('endTime', Number(startTime));
      query.lessThan('startTime', Number(endTime));
      query.descending('endTime');

      // may eventually need a query that will check all of the tokenAddresses and Ids
      query.equalTo('tokenAddress', tokenAddresses[0]);
      query.equalTo('tokenId', tokenIds[0]);
      featureObject = await query.first({ useMasterKey: true });
      if (featureObject.length !== 0) {
        featureObject = setOverlappingTimes(featureObject);
      } else {
        featureObject = new FeaturedNFTs();
        featureObject.set('tokenAddress', tokenAddresses[0]);
        featureObject.set('tokenId', tokenIds[0]);
        featureObject = setCommon(featureObject);
      }
      await featureObject.save(null, { useMasterKey: true });
      break;
    case 'collection':
      const FeaturedCollections = Moralis.Object.extend('FeaturedCollections');

      const query1 = new Moralis.Query(FeaturedCollections);
      query1.equalTo('featuredBy', featuredBy);
      query1.equalTo('featureType', DEFINITIONS[featureType]['name']);
      query1.equalTo('chainId', '0x38');
      // check if start/end times overlap
      query1.greaterThan('endTime', Number(startTime));
      query1.lessThan('startTime', Number(endTime));
      query1.descending('endTime');

      query1.equalTo('contractAddress', contractAddress);
      featureObject = await query1.first({ useMasterKey: true });
      if (featureObject.length !== 0) {
        featureObject = setOverlappingTimes(featureObject);
      } else {
        featureObject = new FeaturedCollections();
        featureObject.set('contractAddress', contractAddress);
        featureObject = setCommon(featureObject);
      }
      await featureObject.save(null, { useMasterKey: true });
      break;
    default:
      break;
  }
});
