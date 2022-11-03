Moralis.Cloud.afterSave('EventBSCAirdropStart', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) {
    return;
  }

  // temporary fix
  const saved = request.object.get('saved');
  if (saved) return;
  // update event table to indicate that save has been triggered
  request.object.set('saved', true);
  request.object.save();

  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------After Airdrop Start BSC--------------------------------'
  );

  const airdropTypes = ['ERC20', 'ERC721', 'ERC1155'];
  // event data
  const airdropInfo = await request.object.get('airdropInfo');
  const airdropId = airdropInfo[0];
  const airdropType = airdropTypes[airdropInfo[1]];
  const promoCode = airdropInfo[2];
  const contractAddress = airdropInfo[3];
  const owner = airdropInfo[4];
  const startTime = airdropInfo[5];
  const endTime = airdropInfo[6];
  const tokenIds = airdropInfo[7];
  const maxTokenAmounts = airdropInfo[8];
  const featured = airdropInfo[9];
  const objectId = airdropInfo[10];

  // check if airdrop exists
  const Airdrop = Moralis.Object.extend('Airdrop');
  const airQuery = new Moralis.Query(Airdrop);
  airQuery.equalTo('objectId', objectId);
  const airdrop = await airQuery.first();

  airdrop.set('airdropId', airdropId);
  airdrop.set('airdropType', airdropType);
  airdrop.set('promoCode', promoCode);
  airdrop.set('owner', owner);
  // TODO: remove start and end time
  airdrop.set('startTime', startTime);
  airdrop.set('endTime', endTime);
  airdrop.set('tokenIds', tokenIds);
  // handle airdrop time periods
  const whitelistTime =
    Number(startTime) -
    Number(airdrop?.attributes?.duration) * 24 * 60 * 60 * 1000;
  const leftoversTime =
    Number(startTime) +
    Number(airdrop?.attributes?.duration) * 24 * 60 * 60 * 1000;
  const endedTime =
    leftoversTime + Number(airdrop?.attributes?.duration) * 24 * 60 * 60 * 1000;
  airdrop.set('phaseTimes', {
    whitelisting: whitelistTime,
    claiming: startTime,
    leftovers: leftoversTime,
    ended: endedTime
  });

  try {
    // query user with eth address
    const User = Moralis.Object.extend('_User');
    const query = new Moralis.Query(User);
    query.equalTo('ethAddress', owner.toLowerCase());
    const ownerUser = await query.first({ useMasterKey: true });

    // set airdrop to be writeable only by user
    let acl = new Moralis.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    acl.setWriteAccess(ownerUser.id, true);

    await airdrop.setACL(acl);
  } catch (e) {
    logger.info('ACL Error: ' + e);
  }
  airdrop.set('chainId', '0x38');
  airdrop.set('valid', true);
  await airdrop.save({ useMasterKey: true });
});
