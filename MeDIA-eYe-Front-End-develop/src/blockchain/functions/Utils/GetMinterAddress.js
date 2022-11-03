import { ZERO_ADDRESS } from '../Addresses';
import { ChainName } from '../ChangeChain/ChainNames';

export const getMinterAddress = async (Moralis, address, tokenId, chainId) => {
  const PAGE_LIMIT = 100;
  try {
    const options = {
      address: address,
      chain: ChainName(chainId).toLowerCase(),
      limit: PAGE_LIMIT,
      token_id: tokenId
    };
    let res = await Moralis.Web3API.token.getWalletTokenIdTransfers(options);
    const totalTransfers = res.total;

    // TODO: handle getting last transaction using Moralis cursor
    if (totalTransfers > PAGE_LIMIT) {
      options.offset = totalTransfers - 1;
      res = await Moralis.Web3API.token.getWalletTokenIdTransfers(options);
    }
    const transfersNFT = res.result;
    const firstTransfer = transfersNFT[transfersNFT.length - 1];

    if (firstTransfer.from_address === ZERO_ADDRESS) {
      return firstTransfer.to_address;
    }
  } catch (e) {
    console.log(e);
  }
};
