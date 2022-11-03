/**
 *
 * @param Moralis
 * @param params.unlockableContentId is id of unlockable content to retrieve
 * @param params.nftId is id of nft it belongs to
 * @returns {string} unlockable content
 */
export const getUnlockableContent = async (Moralis, params) => {
  // check if user owns nft
  const currentUser = Moralis.User.current();
  let userNft;
  if (currentUser) {
    const UserNFT = Moralis.Object.extend('UserNFT');
    const nftQuery = new Moralis.Query(UserNFT);
    const MediaEyeNFT = Moralis.Object.extend('MediaEyeNFT');
    const nft = new MediaEyeNFT();
    nft.id = params.nftId;
    nftQuery.equalTo('nft', nft);
    nftQuery.equalTo('owner', currentUser.attributes.ethAddress);
    userNft = await nftQuery.first();
  }

  if (!userNft) return;

  const UnlockableContent = Moralis.Object.extend('UnlockableContent');
  const query = new Moralis.Query(UnlockableContent);
  query.equalTo('objectId', params.unlockableContentId);

  const result = await query.first();
  return result?.attributes?.content;
};
