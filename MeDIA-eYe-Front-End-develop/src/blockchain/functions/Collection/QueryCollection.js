export const queryCollection = async (Moralis, collectionAddress) => {
  // enable web3 before executing functions
  //await Moralis.enableWeb3();
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const query = new Moralis.Query(Collection);
  query.equalTo('collectionAddress', collectionAddress);

  const result = await query.first();
  return result;
};
