Moralis.Cloud.define('queryTopSales', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------QUERY TOP SALES--------------------------------'
  );
  const type = request.params.type;
  const days = request.params.days;

  const Sale = Moralis.Object.extend('Sale');
  const query = new Moralis.Query(Sale);

  // restrict to the last x days
  let queryDate = new Date();
  queryDate.setDate(queryDate.getDate() - days);
  query.greaterThan('blockTime', queryDate);
  const result = await query.find();
  const dict = {};
  // fill dict with sale count per seller/buyer
  for (let i in result) {
    let saleUser = '';
    if (type === 'sellers') {
      saleUser = result[i].attributes.seller;
    } else {
      saleUser = result[i].attributes.buyer;
    }

    if (dict[saleUser]) {
      dict[saleUser] = dict[saleUser] + result[i].attributes.amount;
    } else {
      dict[saleUser] = result[i].attributes.amount;
    }
  }
  // convert to an array and sort for top 10
  let sortable = [];
  for (let value in dict) {
    sortable.push([value, dict[value]]);
  }
  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });
  // if there are more than 10 users in sortable take the top 10
  let topSize = Math.min(sortable.length, 10);
  let topUsers = [];
  const User = Moralis.Object.extend('User');

  for (let i = 0; i < topSize; i++) {
    const userQuery = new Moralis.Query(User);
    userQuery.equalTo('ethAddress', sortable[i][0]);
    const result = await userQuery.first({ useMasterKey: true });
    topUsers.push(result);
  }
  return topUsers;
});
