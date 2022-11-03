import { ContractAddress } from '../Addresses';
import { ChainName } from '../ChangeChain/ChainNames';
import { queryListingsByNFT } from '../Marketplace';

export const getOwnerAddresses = async (Moralis, address, tokenId, chainId) => {
  const PAGE_LIMIT = 100;
  try {
    let ownerAddresses = [];
    let tokenAmounts = [];
    let cursor = null;
    let total = 0;
    let totalPage = 0;

    const options = {
      address: address,
      chain: ChainName(chainId).toLowerCase(),
      cursor: cursor,
      limit: PAGE_LIMIT,
      token_id: tokenId
    };
    do {
      const res = await Moralis.Web3API.token.getTokenIdOwners(options);
      totalPage = (res.page + 1) * res.page_size;
      total = res.total;
      for (const owner of res.result) {
        ownerAddresses.push(owner.owner_of);
        tokenAmounts.push(owner.amount);
      }
      cursor = res.cursor;
    } while (cursor != '' && cursor != null && totalPage < total);

    // if owner contains listing/auction address then query listing/auction for seller's address
    if (
      ownerAddresses.includes(ContractAddress('AUCTION', chainId)) ||
      ownerAddresses.includes(ContractAddress('LISTING', chainId))
    ) {
      // remove auction/listing from owner address list
      ownerAddresses = ownerAddresses.filter((value, index) => {
        const validCheck =
          value !==
          (ContractAddress('AUCTION', chainId) ||
            ContractAddress('LISTING', chainId));
        // remove from tokenamounts too if check doesnt pass
        if (validCheck === false) tokenAmounts = tokenAmounts.splice(index);
        return validCheck;
      });

      const [listings, nfts] = await queryListingsByNFT(
        Moralis,
        address,
        tokenId
      );
      // add all listing owners to address list
      listings.map((listing, i) => {
        if (!ownerAddresses.includes(listing.attributes.seller)) {
          ownerAddresses.push(listing.attributes.seller);
          tokenAmounts.push(nfts[i].attributes.amount);
        }
      });
    }
    return { ownerAddresses, tokenAmounts };
  } catch (e) {
    console.log(e);
  }
};
