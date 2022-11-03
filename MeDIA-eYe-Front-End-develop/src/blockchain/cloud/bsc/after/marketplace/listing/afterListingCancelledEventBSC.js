Moralis.Cloud.afterSave('EventBSCListingCancelled', async (request) => {
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
    '--------------------------------LISTING CANCELLED BSC--------------------------------'
  );

  // get listing id
  const listingId = request.object.get('listingId');
  // find listing in database
  const Listing = Moralis.Object.extend('MediaEyeListing');

  const query = new Moralis.Query(Listing);
  query.equalTo('listingId', listingId);
  query.equalTo('chainId', '0x38');
  query.equalTo('type', 'listing');
  query.equalTo('status', 'available');
  const listing = await query.first();

  // set listing status to cancelled
  listing.set('status', 'cancelled');
  await listing.save();
});
