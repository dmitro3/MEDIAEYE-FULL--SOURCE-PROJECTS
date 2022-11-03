/**
 * helper function to format nft object to pass to ExploreBlock card
 */
export const formatNFTDisplay = (nft) => {
  return {
    id: nft?.id,
    collectionAddress: [nft?.attributes?.collectionAddress],
    collectionType: nft?.attributes?.collectionType,
    description: [nft?.attributes?.description],
    title: [nft?.attributes?.name],
    img: [nft?.attributes.image],
    seller: nft?.attributes?.minter,
    chainId: nft?.attributes?.chainId,
    tokenId: [nft?.attributes?.tokenId],
    size: 'single',
    isBundle: false,
    quantity: nft?.attributes?.totalTokens,
    totalTokens: nft?.attributes?.totalTokens
  };
};
