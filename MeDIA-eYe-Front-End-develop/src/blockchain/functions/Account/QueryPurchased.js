export const queryPurchased = async (Moralis, userAddress, page) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const NFTs = Moralis.Object.extend('UserNFT');
  const query = new Moralis.Query(NFTs);
  query.equalTo('owner', userAddress);
  query.include('nft');
  const result = await query.find();
  let resultNotMinter = [];
  for (let i in result) {
    // if the owner is the same as minter omit from result
    if (
      result[i]?.attributes?.nft?.attributes?.minter !==
      result[i]?.attributes?.owner
    ) {
      resultNotMinter.push(result[i]);
    }
  }
  return resultNotMinter;
};
