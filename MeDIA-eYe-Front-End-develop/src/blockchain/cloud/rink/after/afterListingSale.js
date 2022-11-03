Moralis.Cloud.afterSave('ListingSaleEvent', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info(
    '--------------------------------LISTING SALE--------------------------------'
  );
  // only run once the contract call is confirmed
  const confirmed = request.object.get('confirmed');
  if (confirmed) {
    return;
  }
  logger.info(JSON.stringify(request.object));

  // get sale object data
  const buyer = await request.object.get('buyer');
  const listingId = await request.object.get('listingId');
  const saleAmount = await request.object.get('saleAmount');

  // update listing with amount of nfts left in the listing
  const MediaEyeListing = Moralis.Object.extend('MediaEyeListing');
  const MediaEyeListingNFT = Moralis.Object.extend('MediaEyeListingNFT');
  const query = new Moralis.Query(MediaEyeListing);
  query.equalTo('listingId', listingId);
  query.equalTo('type', 'listing');
  const listing = await query.first();

  const query2 = new Moralis.Query(MediaEyeListingNFT);
  query2.equalTo('parent', listing);
  query2.include('nft');
  const listingNFTs = await query2.find();
  for (let i = 0; i < listingNFTs.length; i++) {
    const amount = listingNFTs[i].get('amount');
    const currentAmount = Number(amount) - Number(saleAmount);
    // if bundle, consume all nfts from the listing, else if a single just remove the amount bought from listing
    if (listingNFTs.length > 1) {
      listingNFTs[i].set('amount', 0);
    } else {
      listingNFTs[i].set('amount', Number(currentAmount));
    }
    // if all nfts are sold set status of listing to sold
    // TODO move current amount check outside
    if (currentAmount === 0) {
      listing.set('status', 'sold');
      await listing.save();
    }
    // update listing
    await listingNFTs[i].save({ useMasterKey: true });

    const nft = listingNFTs[i].get('nft');
    // get userNft
    const UserNFT = Moralis.Object.extend('UserNFT');
    const userQuery = new Moralis.Query(UserNFT);
    userQuery.equalTo('owner', buyer);
    userQuery.equalTo('nft', nft);
    const userNft = await userQuery.first();
    // if no userNft found make a new one
    if (!userNft) {
      const newUser = new UserNFT();
      if (listingNFTs.length > 1) {
        newUser.set('amount', Number(amount));
      } else {
        newUser.set('amount', Number(saleAmount));
      }
      newUser.set('owner', buyer);
      newUser.set('nft', nft);
      await newUser.save({ useMasterKey: true });
    } else {
      // update buyer with nfts to UserNFT object
      if (listingNFTs.length > 1) {
        userNft.set('amount', userNft.amount + Number(amount));
      } else {
        userNft.set('amount', userNft.amount + Number(saleAmount));
      }
      await userNft.save({ useMasterKey: true });
    }

    // create sale object  for buyer and seller
    const Sale = Moralis.Object.extend('Sale');
    const tokenId = nft.get('tokenId');
    const collectionAddress = nft.get('collectionAddress');
    const seller = await request.object.get('seller');
    const paymentMethod = await request.object.get('paymentMethod');
    const pricePer = await request.object.get('pricePer');
    const totalPrice = await request.object.get('totalPrice');
    const blockTime = await request.object.get('block_timestamp');

    // tokenid, collectionaddress, amount sold/bought, seller/buyer, time of transaction, price of sale total, price per unit, chain, currency, listingId
    const newSale = new Sale();
    newSale.set(
      'amount',
      listingNFTs.length > 1 ? Number(amount) : Number(saleAmount)
    );
    newSale.set('tokenId', tokenId);
    newSale.set('collectionAddress', collectionAddress);
    newSale.set('seller', seller);
    newSale.set('buyer', buyer);
    newSale.set('chain', 'ETH');
    newSale.set('currency', 'ETH');
    newSale.set('listingId', listingId);
    newSale.set('listing', listing);
    newSale.set('nft', nft);
    newSale.set('paymentMethod', paymentMethod);
    newSale.set(
      'pricePer',
      Math.floor(pricePer / listingNFTs.length).toString()
    );
    newSale.set(
      'totalPrice',
      Math.floor(totalPrice / listingNFTs.length).toString()
    );
    newSale.set('blockTime', blockTime);
    await newSale.save();

    // track user's spending per month
    const UserSpending = Moralis.Object.extend('UserSpending');
    const User = Moralis.Object.extend('User');

    // check if entry for BUYER exists
    const buyerQuery = new Moralis.Query(User);
    buyerQuery.equalTo('ethAddress', buyer);
    const buyerUser = await buyerQuery.first({ useMasterKey: true });

    let userSpendingQuery = new Moralis.Query(UserSpending);
    userSpendingQuery.equalTo('user', buyerUser);
    userSpendingQuery.equalTo('chain', '0x4');
    // get current month id (format: "YYYYMM")
    const now = new Date();
    const currMonth = ('0' + (now.getMonth() + 1)).slice(-2);
    const monthId = String(now.getFullYear()) + currMonth;
    userSpendingQuery.equalTo('monthId', monthId);

    let userSpending = await userSpendingQuery.first();
    let soldPrice = Math.floor(totalPrice / listingNFTs.length);
    // convert to native if needed
    if (paymentMethod !== '0x0000000000000000000000000000000000000000') {
      const params = {
        chainHex: '0x4',
        price: soldPrice,
        tokenAddress: paymentMethod,
        toNative: true
      };
      soldPrice = await Moralis.Cloud.run('convertPriceHelper', params);
    }
    let totalSoldPrice = Number(soldPrice); // for adding any extra amount
    let newUserSpending;

    if (userSpending !== undefined) {
      // if user has preexisting record, add to amount
      const prevSpent = Number(userSpending.get('volume'));
      totalSoldPrice += prevSpent;
      userSpending.set('volume', String(totalSoldPrice));
      await userSpending.save();
    } else {
      newUserSpending = new UserSpending();
      newUserSpending.set('user', buyerUser);
      newUserSpending.set('chain', '0x4');
      newUserSpending.set('monthId', monthId);
      newUserSpending.set('volume', String(totalSoldPrice));
      await newUserSpending.save();
    }

    // check if entry for SELLER exists
    const sellerQuery = new Moralis.Query(User);
    sellerQuery.equalTo('ethAddress', seller);
    const sellerUser = await sellerQuery.first({ useMasterKey: true });

    userSpendingQuery = new Moralis.Query(UserSpending);
    userSpendingQuery.equalTo('user', sellerUser);
    userSpendingQuery.equalTo('chain', '0x4');
    // get current month id (format: "YYYYMM")
    userSpendingQuery.equalTo('monthId', monthId);

    userSpending = await userSpendingQuery.first();
    totalSoldPrice = Number(soldPrice); // for adding any extra amount

    if (userSpending !== undefined) {
      // if user has preexisting record, add to amount
      const prevSpent = Number(userSpending.get('volume'));
      totalSoldPrice += prevSpent;
      userSpending.set('volume', String(totalSoldPrice));
      await userSpending.save();
    } else {
      newUserSpending = new UserSpending();
      newUserSpending.set('user', sellerUser);
      newUserSpending.set('chain', '0x4');
      newUserSpending.set('monthId', monthId);
      newUserSpending.set('volume', String(totalSoldPrice));
      await newUserSpending.save();
    }
  }
});
