Moralis.Cloud.define('queryFeatured', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------QUERY FEATURED TYPES--------------------------------'
  );
  const limit = request.params.limit;
  const featuredType = request.params.featuredType;
  const chainHex = request.params.chainHex;
  const currentUnixTimestamp = Math.round(new Date().getTime() / 1000);
  const pipeline = [
    {
      match: {
        featureType: featuredType,
        chainId: chainHex,
        startTime: { $lte: currentUnixTimestamp },
        endTime: { $gte: currentUnixTimestamp }
      }
    },
    // picks random 10 or specified amount
    { sample: { size: limit ?? 10 } }
  ];

  let query;
  if (featuredType === 'collection') {
    query = new Moralis.Query('FeaturedCollections');
  } else if (featuredType === 'Event') {
    query = new Moralis.Query('FeaturedEvents');
  } else if (featuredType === 'Airdrop') {
    query = new Moralis.Query('FeaturedAirdrops');
  } else {
    query = new Moralis.Query('FeaturedNFTs');
  }

  const result = await query.aggregate(pipeline, { useMasterKey: true });

  return result;
});
