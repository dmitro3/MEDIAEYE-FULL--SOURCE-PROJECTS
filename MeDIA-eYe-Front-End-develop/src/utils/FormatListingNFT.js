export const formatListingNFT = (listing, nfts) => {
  let imgs = [];
  let tokenIds = [];
  let collectionAddresses = [];
  let titles = [];
  let descriptions = [];
  let fileTypes = [];
  for (let i = 0; i < nfts?.length; i++) {
    imgs.push(nfts[i].attributes.nft.attributes.image);
    tokenIds.push(nfts[i].attributes.nft.attributes.tokenId);
    fileTypes.push(nfts[i].attributes.nft.attributes.fileType);
    collectionAddresses.push(
      nfts[i].attributes.nft.attributes.collectionAddress
    );
    titles.push(nfts[i].attributes.nft.attributes.name);
    descriptions.push(nfts[i].attributes.nft.attributes.description);
  }

  return {
    chainId: nfts[0]?.attributes?.nft?.attributes?.chainId,
    id: nfts[0].attributes?.nft?.id,
    img: imgs,
    fileTypes: fileTypes,
    fullImage: imgs,
    isAuction: listing.attributes.type === 'auction',
    isSold: listing.attributes.status === 'sold',
    isBundle: listing.attributes.size === 'bundle',
    title: titles,
    seller: listing.attributes.seller,
    endTime: listing.attributes.endTime ? listing.attributes.endTime : 0,
    collectionAddress: collectionAddresses,
    tokenId: tokenIds,
    description: descriptions,
    listingId: listing.id,
    currentListing: listing,
    paymentMethods: listing.attributes.listingPayments,
    collectionType: nfts[0]?.attributes?.collectionType,
    totalTokens: nfts[0]?.attributes?.nft?.attributes?.totalTokens,
    quantity: nfts[0]?.attributes?.amount,
    charityPercent: listing.attributes.charityPercent
  };
};
