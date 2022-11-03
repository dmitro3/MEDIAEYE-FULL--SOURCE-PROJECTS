export const queryMinted = async (Moralis, userAddress, page) => {
  // enable web3 before executing functions
  await Moralis.enableWeb3();
  const NFTs = Moralis.Object.extend('MediaEyeNFT');
  const query = new Moralis.Query(NFTs);
  query.equalTo('minter', userAddress);
  const result = await query.find();
  return result;
};
