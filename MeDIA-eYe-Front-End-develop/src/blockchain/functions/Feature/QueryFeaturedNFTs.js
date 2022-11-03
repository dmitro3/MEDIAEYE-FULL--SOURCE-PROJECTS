export const queryFeaturedNFTs = async (Moralis) => {
  // enable web3 before executing functions
  //await Moralis.enableWeb3();
  const Featured = Moralis.Object.extend('FeaturedNFTs');
  const query = new Moralis.Query(Featured);
  query.equalTo('featureType', 'NFT');
  query.descending('startTime');

  const currentUnixTimestamp = Math.round(new Date().getTime() / 1000);
  query.lessThanOrEqualTo('startTime', currentUnixTimestamp);
  query.greaterThanOrEqualTo('endTime', currentUnixTimestamp);

  const result = await query.find();

  let NFTInfo = [];
  for (let i = 0; i < result.length; i++) {
    const object = result[i];
    NFTInfo.push({
      tokenAddress: object.get('tokenAddress'),
      tokenId: object.get('tokenId')
    });
  }

  let nfts = [];
  const NFT = Moralis.Object.extend('MediaEyeNFT');
  for (let i = 0; i < NFTInfo.length; i++) {
    const query2 = new Moralis.Query(NFT);
    query2.equalTo('collectionAddress', NFTInfo[i].tokenAddress);
    query2.equalTo('tokenId', NFTInfo[i].tokenId);
    let nftquery2 = await query2.first();
    if (nftquery2) {
      nfts.push(nftquery2);
    }

  }
  return nfts;
};
