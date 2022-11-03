Moralis.Cloud.define(
  'RegisterAirdrop',
  async (req) => {
    const logger = Moralis.Cloud.getLogger();
    logger.info(
      '-------------------------------- Register Airdrop --------------------------------'
    );

    const airdropId = req.params.airdropId;
    const address = req.params.address;

    const Airdrop = Moralis.Object.extend('Airdrop');
    const query = new Moralis.Query(Airdrop);
    query.equalTo('objectId', airdropId);
    let airdrop = await query.first();

    logger.info(JSON.stringify(airdrop));

    if (airdrop) {
      // check if user is already a participant
      if (airdrop?.attributes?.participants?.includes(address)) {
        return {
          code: 141,
          error: 'Address already whitelisted'
        };
      }
      logger.info('reach ', airdrop?.attributes?.participants);
      let newParticipants = airdrop?.attributes?.participants;
      newParticipants.push('testy');
      for (let i = 0; i < newParticipants.length; i++) {
        logger.info('reaching', newParticipants[i]);
      }
      logger.info('reach2', JSON.stringify(newParticipants));
      airdrop.set('participants', newParticipants);
      logger.info('reach3');
      await airdrop.save({ useMasterKey: true });
      logger.info('reach4');
      return true;
    } else {
      return {
        code: 404,
        error: 'Airdrop not found'
      };
    }
  },
  {
    fields: {
      address: {
        required: true,
        type: String,
        error: 'Address is required'
      }
    }
  }
);
