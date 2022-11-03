export const queryCollections = async (Moralis, userAddress, page) => {
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const query = new Moralis.Query(Collection);
  query.equalTo('owner', userAddress);
  // do not query collections where address is not yet loaded in
  // this can happen since we precreate the object to pass in its id to after collection cloud functions
  query.notEqualTo('collectionAddress', null);
  const result = await query.find();
  return result;
};
