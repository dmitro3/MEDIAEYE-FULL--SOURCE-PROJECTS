Moralis.Cloud.define(
  'queryUser',
  async (request) => {
    const logger = Moralis.Cloud.getLogger();
    logger.info(
      '--------------------------------QUERY USER--------------------------------'
    );
    const address = request.params.address;
    const User = Moralis.Object.extend('User');
    const query = new Moralis.Query(User);
    query.equalTo('ethAddress', address);
    let result = await query.first({ useMasterKey: true });
    logger.info(result);
    if (!result) {
      return;
    }
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
        profileImage: result.attributes.profileImage,
        bio: result.attributes.bio
      }
    };
  },
  {
    fields: {
      address: {
        required: true,
        type: String,
        error: 'Params must contain address to queryUser'
      }
    }
  }
);
