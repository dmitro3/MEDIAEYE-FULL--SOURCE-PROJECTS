import { ChainHexString } from '../ChangeChain/ChainHexStrings';

export const queryFavourites = async (Moralis, chainHex, params) => {
  try {
    if (params?.userId) {
      const LikesNFT = Moralis.Object.extend('LikesNFT');
      const likesQuery = new Moralis.Query(LikesNFT);
      const User = Moralis.Object.extend('User');
      const user = new User();
      user.id = params.userId;
      likesQuery.equalTo('user', user);
      if (chainHex) likesQuery.equalTo('chainHex', ChainHexString(chainHex));
      const likesNfts = await likesQuery.find();

      // get nft objects
      let results = [];
      for (let i = 0; i < likesNfts.length; i++) {
        const collectionAddress = likesNfts[i].get('tokenAddress');
        const tokenId = likesNfts[i].get('tokenId');
        const chainId = likesNfts[i].get('chainHex');

        const NFT = Moralis.Object.extend('MediaEyeNFT');
        const nftQuery = new Moralis.Query(NFT);
        nftQuery.equalTo('collectionAddress', collectionAddress);
        nftQuery.equalTo('tokenId', tokenId);
        nftQuery.equalTo('chainId', chainId);
        results.push(nftQuery.first());
      }
      const nfts = await Promise.all(results);
      return nfts;
    }
  } catch (e) {
    console.log(e);
  }
};
