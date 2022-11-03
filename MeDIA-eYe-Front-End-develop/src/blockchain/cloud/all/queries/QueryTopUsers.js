Moralis.Cloud.define('queryTopUsers', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------QUERY TOP USERS--------------------------------'
  );
  const chain = request.params.chain;

  const UserSpending = Moralis.Object.extend('UserSpending');
  const query = new Moralis.Query(UserSpending);

  // get current month id (format: "YYYYMM")
  const now = new Date();
  const currMonth = ('0' + (now.getMonth() + 1)).slice(-2);
  const monthId = String(now.getFullYear()) + currMonth;

  // get chain id
  let chainHex = '';
  // retrieve hexadecimal number for chainId
  if (chain === 'BNB' || chain === 'BSC' || chain === '0x38') {
    chainHex = '0x38';
  } else if (chain === 'FTM' || chain === 250 || chain === '0xfa') {
    chainHex = '0xfa';
  } else {
    chainHex = '0x1';
  }

  query.equalTo('monthId', monthId);
  query.equalTo('chain', chainHex);
  query.descending('volume');
  query.limit(10);
  query.include('user');
  const userSpendings = await query.find({ useMasterKey: true });
  console.log(userSpendings);

  let resultArray = [];
  for (let i = 0; i < userSpendings.length; i++) {
    const user = {
      id: userSpendings[i].attributes.user.id,
      attributes: {
        username: userSpendings[i].attributes.user.attributes.username,
        ethAddress: userSpendings[i].attributes.user.attributes.ethAddress,
        subscriptionStart:
          userSpendings[i].attributes.user.attributes.subscriptionStart,
        subscriptionEnd: userSpendings[i].attributes.bscriptionEnd,
        subscriptionLevel:
          userSpendings[i].attributes.user.attributes.subscriptionLevel,
        defaultUsername:
          userSpendings[i].attributes.user.attributes.defaultUsername,
        headerImage: userSpendings[i].attributes.user.attributes.headerImage,
        profileImage: userSpendings[i].attributes.user.attributes.profileImage,
        bio: userSpendings[i].attributes.user.attributes.bio
      }
    };

    const result = {
      attributes: {
        user: user,
        volume: userSpendings[i].attributes.volume,
        monthId: userSpendings[i].attributes.monthId,
        chain: userSpendings[i].attributes.chain
      }
    };

    resultArray.push(result);
  }

  return resultArray;
});
