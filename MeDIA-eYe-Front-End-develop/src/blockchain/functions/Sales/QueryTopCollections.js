import { ChainName } from '../ChangeChain';

export const queryTopCollections = async (Moralis, chain, days) => {
  // enable web3 before executing functions
  // await Moralis.enableWeb3();
  const Sale = Moralis.Object.extend('Sale');
  const query = new Moralis.Query(Sale);
  query.equalTo('chain', ChainName(chain));

  // restrict to the last x days
  if (days > 0) {
    let queryDate = new Date();
    queryDate.setDate(queryDate.getDate() - days);
    query.greaterThan('blockTime', queryDate);
  }
  const result = await query.find();
  const dict = {};
  // fill dict with sale count per collection
  for (let i in result) {
    const collectionAddress = result[i].attributes.collectionAddress;
    if (dict[collectionAddress]) {
      dict[collectionAddress] =
        dict[collectionAddress] + result[i].attributes.amount;
    } else {
      dict[collectionAddress] = result[i].attributes.amount;
    }
  }
  // convert to an array and sort for top 9
  let sortable = [];
  for (let value in dict) {
    sortable.push([value, dict[value]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  // if there are more than 10 collections in sortable take the top 9
  let topSize = Math.min(sortable.length, 9);
  let topCollections = [];
  const Collection = Moralis.Object.extend('MediaEyeCollection');

  for (let i = 0; i < topSize; i++) {
    const colQuery = new Moralis.Query(Collection);
    colQuery.equalTo('collectionAddress', sortable[i][0]);
    const result = await colQuery.first();
    topCollections.push(result);
  }

  return topCollections;
};
