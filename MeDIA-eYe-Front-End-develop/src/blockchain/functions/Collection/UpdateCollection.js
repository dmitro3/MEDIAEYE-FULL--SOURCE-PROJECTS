export const updateCollection = async (Moralis, collection, params) => {
  const currentUser = Moralis.User.current();
  // check for user owns collection
  if (collection.attributes.owner !== currentUser?.attributes?.ethAddress) {
    return false;
  }

  if (params?.name) collection.set('name', params.name);
  if (params?.description) collection.set('description', params.description);
  if (params?.symbol) collection.set('symbol', params.symbol);
  if (params?.links) collection.set('links', params.links);
  collection.set('hidden', params.hidden === true);

  if (params?.minters && currentUser.attributes.subscriptionLevel > 1)
    collection.set('minters', params?.minters);

  const logo = params?.logo;
  const banner = params?.banner;
  const featured = params?.featured;
  // create list of promises based on what data is being pushed to ipfs
  let promises = [];
  let promiseType = [];
  if (banner?.size < 64000000) {
    const bannerFile = new Moralis.File(banner.name, banner);
    const bannerRes = bannerFile.saveIPFS();
    promises.push(bannerRes);
    promiseType.push('banner');
  }
  if (featured?.size < 64000000) {
    const featuredFile = new Moralis.File(featured.name, featured);
    const featuredRes = featuredFile.saveIPFS();
    promises.push(featuredRes);
    promiseType.push('featured');
  }
  if (logo?.size < 64000000) {
    const logoFile = new Moralis.File(logo.name, logo);
    const logoRes = logoFile.saveIPFS();
    promises.push(logoRes);
    promiseType.push('logo');
  }

  let ipfsImages = await Promise.all(promises);
  // add images to collection data
  for (let i = 0; i < ipfsImages.length; i++) {
    collection.set(`${promiseType[i]}`, ipfsImages[i]._ipfs);
  }

  const result = await collection.save();
  return result;
};
