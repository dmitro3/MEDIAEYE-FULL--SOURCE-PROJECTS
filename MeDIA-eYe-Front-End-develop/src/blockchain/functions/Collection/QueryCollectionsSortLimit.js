/**
 *
 * @param Moralis
 * @param {string} chain is a hex string of the current chainId
 * @param {string} sort is which attribute to sort by
 * @param {boolean} isAscending is true if sort by ascending, otherwise descending
 * @param {number} limit is how many new collections to query
 * @returns
 */
export const queryCollectionsSortLimit = async (
  Moralis,
  chain,
  sort,
  isAscending,
  limit
) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const query = new Moralis.Query(Collection);
  query.notEqualTo('collectionAddress', null);
  query.equalTo('chainId', chain);
  if (isAscending) query.descending(sort);
  else query.descending(sort);
  query.limit(limit);
  const result = await query.find();
  return result;
};
