Moralis.Cloud.afterSave('EventBSCCollectionRoleTest', async (request) => {
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (!confirmed) return;

  // temporary fix
  const saved = request.object.get('saved');
  if (saved) return;
  // update event table to indicate that save has been triggered
  request.object.set('saved', true);
  request.object.save();

  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------After Collection Role BSC--------------------------------'
  );

  const role = request.object.get('role');
  const colAddress = request.object.get('address');
  const account = request.object.get('account');
  const isGranted = request.object.get('isGranted');

  // check if role is valid
  if (
    role !==
    '0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6'
  ) {
    logger.info('Does not match bytes for minter role');
    return;
  }

  // check if collection exists
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const colQuery = new Moralis.Query(Collection);
  colQuery.equalTo('collectionAddress', colAddress);
  const col = await colQuery.first();
  if (col) {
    // edit collection
    let minters = col.attributes.minters;
    // check if already a minter
    if (minters.includes(account)) {
      logger.info('User is already a minter.');
      return;
    }
    minters.push(account);
    col.set('minters', minters);
    col.save();
  }
});
