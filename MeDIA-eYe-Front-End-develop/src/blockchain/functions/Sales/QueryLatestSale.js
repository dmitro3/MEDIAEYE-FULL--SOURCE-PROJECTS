export const queryLatestSale = async (Moralis, nftId) => {
  const Sale = Moralis.Object.extend('Sale');
  const query = new Moralis.Query(Sale);

  const NFT = Moralis.Object.extend('MediaEyeNFT');
  const nft = new NFT();
  nft.id = nftId;
  query.equalTo('nft', nft);

  query.descending('createdAt');

  const result = await query.first();
  return result;
};
