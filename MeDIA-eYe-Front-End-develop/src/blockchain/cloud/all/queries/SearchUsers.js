Moralis.Cloud.define('SearchUsers', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------Search Users--------------------------------'
  );
  const searchText = request.params.searchText;
  const User = Moralis.Object.extend('User');
  const queryUsernames = new Moralis.Query(User);
  queryUsernames.equalTo('defaultUsername', false);
  queryUsernames.startsWith('username', searchText);

  const queryAddresses = new Moralis.Query(User);
  queryAddresses.startsWith('ethAddress', searchText.toLowerCase());
  const mainQuery = Moralis.Query.or(queryUsernames, queryAddresses).limit(8);
  const results = await mainQuery.find({ useMasterKey: true });

  return results.map((result) => {
    return {
      id: result.id,
      attributes: {
        username: result.attributes.username,
        ethAddress: result.attributes.ethAddress,
        subscriptionStart: result.attributes.subscriptionStart,
        subscriptionEnd: result.attributes.subscriptionEnd,
        subscriptionLevel: result.attributes.subscriptionLevel,
        defaultUsername: result.attributes.defaultUsername,
        headerImage: result.attributes.headerImage,
        profileImage: result.attributes.profileImage
      }
    };
  });
});
