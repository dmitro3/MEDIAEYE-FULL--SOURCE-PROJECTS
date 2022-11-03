Moralis.Cloud.afterSave('CollectionOneOneFiveFiveEvent', async (request) => {
  const collectionAddress = await request.object.get('addr');
  const tokenData = await request.object.get('tokenData');
  const collectionId = JSON.parse(tokenData).collectionId;

  // save collection address into collection object
  const Collection = Moralis.Object.extend('MediaEyeCollection');
  const query = new Moralis.Query(Collection);
  query.equalTo('objectId', collectionId);
  const collectionResult = await query.first();
  collectionResult.set('collectionAddress', collectionAddress);
  await collectionResult.save();
});
