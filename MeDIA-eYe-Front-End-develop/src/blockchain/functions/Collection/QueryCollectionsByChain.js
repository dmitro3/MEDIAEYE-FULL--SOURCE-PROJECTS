/**
 *
 * @param Moralis
 * @param params contains the parameters for the query
 * @param params.chain is a hex string of the current chainId
 * @param [params.userAddress] is address of the owner, if needs to be specified
 * @param [params.notImported] is true if we want to show only mediaeye collections
 * @param [params.skip] is the number of items to skip by (for pagination)
 * @param [params.limit] is the number of items to limit by (for pagination)
 * @returns list of collections
 */
export const queryCollectionsByChain = async (Moralis, params) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const query = new Moralis.Query(Collection);
  query.descending('createdAt');
  if (params.skip) query.skip(params.skip);
  if (params.limit) query.limit(params.limit);
  if (params.userAddress) query.equalTo('owner', params.userAddress);
  // if (params.notImported) query.notEqualTo('imported', params.notImported);
  if (params.hidden !== undefined) query.equalTo('hidden', params.hidden);
  query.notEqualTo('collectionAddress', null);
  query.equalTo('chainId', params.chain);
  const result = await query.find();
  return result;
};
