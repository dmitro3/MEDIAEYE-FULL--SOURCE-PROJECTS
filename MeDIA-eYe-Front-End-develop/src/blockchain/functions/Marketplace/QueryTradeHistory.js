import { ethers } from 'ethers';
import { default as ListingABI } from '../../abi/MediaEyeListing.json';
import { default as AuctionABI } from '../../abi/MediaEyeAuction.json';
import {
  ContractAddress,
  EventTopic,
  TokenName,
  ZERO_ADDRESS
} from '../Addresses';
import { ChainHexString } from '../ChangeChain/ChainHexStrings';
import { RpcEndpointUrl } from '../Utils';
import Web3 from 'web3';

const getTxReceipt = async (Moralis, hash, chain) => {
  try {
    let ethersProvider;
    if (!Moralis.provider) {
      const url = RpcEndpointUrl(chain);
      ethersProvider = new ethers.providers.JsonRpcProvider(url);
    } else {
      ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
    }
    const tx = await ethersProvider.getTransactionReceipt(hash);
    return tx;
  } catch (e) {
    console.log(e);
  }
};

const findPriceFromData = (tx, chainId) => {
  let priorityAddress;
  const tokenAmounts = {};
  for (let i = 0; i < tx?.logs?.length; i++) {
    if (
      tx.logs[i].topics.includes(EventTopic('TRANSFER')) &&
      tx.logs[i].data !== '0x'
    ) {
      const addPrice = ethers.BigNumber.from(tx.logs[i].data);
      const address = tx.logs[i].address.toLowerCase();
      tokenAmounts[address]
        ? (tokenAmounts[address] = tokenAmounts[address].add(addPrice))
        : (tokenAmounts[address] = addPrice);

      // keep track of which token to prioritize display
      // wrapped > stable > eye
      if (!priorityAddress) priorityAddress = address;
      else if (priorityAddress !== address) {
        const name = TokenName(address, chainId);
        const priorityToken = TokenName(priorityAddress, chainId);
        const isWrapped = name === 'WBNB' || name === 'WETH' || name === 'WFTM';
        const isStable = name === 'BUSD' || name === 'USDC' || name === 'USDT';
        if (isWrapped || (isStable && priorityToken === 'EYE'))
          priorityAddress = address;
      }
    }
  }
  return priorityAddress
    ? {
        typeAddress: priorityAddress,
        amount: tokenAmounts[priorityAddress]
      }
    : null;
};

const getUserInfo = async (Moralis, userAddress) => {
  const params = { address: userAddress };
  const user = await Moralis.Cloud.run('queryUser', params);
  return user?.attributes?.defaultUsername === false
    ? user.attributes.username
    : null;
};

const getSellerFromLogs = async (Moralis, tx, chain) => {
  try {
    for (let i = 0; i < tx?.logs?.length; i++) {
      if (tx.logs[i].topics.includes(EventTopic('SALE'))) {
        let ethersProvider;
        if (!Moralis.provider) {
          const url = RpcEndpointUrl(chain);
          ethersProvider = new ethers.providers.JsonRpcProvider(url);
        } else {
          ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
        }
        const contract = new ethers.Contract(
          ContractAddress('LISTING', chain),
          ListingABI,
          ethersProvider.getSigner()
        );
        const log = contract.interface.parseLog(tx.logs[i]);
        const sellerAddress = log?.args[2]?.toLowerCase();
        return sellerAddress;
      }
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

const getBidAddressesFromLogs = async (Moralis, tx, chain) => {
  try {
    for (let i = 0; i < tx?.logs?.length; i++) {
      if (tx.logs[i].topics.includes(EventTopic('BID'))) {
        let ethersProvider;
        if (!Moralis.provider) {
          const url = RpcEndpointUrl(chain);
          ethersProvider = new ethers.providers.JsonRpcProvider(url);
        } else {
          ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
        }
        const contract = new ethers.Contract(
          ContractAddress('AUCTION', chain),
          AuctionABI,
          ethersProvider.getSigner()
        );
        const log = contract.interface.parseLog(tx.logs[i]);
        const winnerAddress = log?.args[1]?.toLowerCase();
        const sellerAddress = log?.args[2]?.toLowerCase();
        return { winnerAddress, sellerAddress };
      }
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

const getListPriceFromLogs = async (Moralis, tx, chain) => {
  try {
    for (let i = 0; i < tx?.logs?.length; i++) {
      if (tx.logs[i].topics.includes(EventTopic('LISTING'))) {
        let ethersProvider;
        if (!Moralis.provider) {
          const url = RpcEndpointUrl(chain);
          ethersProvider = new ethers.providers.JsonRpcProvider(url);
        } else {
          ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
        }
        const contract = new ethers.Contract(
          ContractAddress('LISTING', chain),
          ListingABI,
          ethersProvider.getSigner()
        );
        const log = contract.interface.parseLog(tx.logs[i]);
        const paymentMethod =
          log?.args?.listingPayments[0]?.paymentMethod?.toLowerCase();
        const price = ethers.BigNumber.from(
          log?.args?.listingPayments[0]?.price
        );
        return { paymentMethod, price };
      }
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

const getAuctionPriceFromLogs = async (Moralis, tx, chain) => {
  try {
    for (let i = 0; i < tx?.logs?.length; i++) {
      if (tx.logs[i].topics.includes(EventTopic('AUCTION'))) {
        let ethersProvider;
        if (!Moralis.provider) {
          const url = RpcEndpointUrl(chain);
          ethersProvider = new ethers.providers.JsonRpcProvider(url);
        } else {
          ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
        }
        const contract = new ethers.Contract(
          ContractAddress('AUCTION', chain),
          AuctionABI,
          ethersProvider.getSigner()
        );
        const log = contract.interface.parseLog(tx.logs[i]);
        const paymentMethod =
          log?.args?.auctionPayments[0]?.paymentMethod?.toLowerCase();
        const price = ethers.BigNumber.from(
          log?.args?.auctionPayments[0]?.initialPrice
        );
        return { paymentMethod, price };
      }
    }
    return null;
  } catch (e) {
    console.log(e);
  }
};

export const queryTradeHistory = async (
  Web3Api,
  Moralis,
  collectionAddress,
  tokenId,
  chainId
) => {
  const chain = ChainHexString(chainId);
  const options = {
    address: collectionAddress,
    token_id: tokenId,
    chain: chain
  };
  const result = await Web3Api.token.getWalletTokenIdTransfers(options);

  let activityList = [];
  for (let i = 0; i < result?.result.length; i++) {
    const transfer = result.result[i];
    const activityInfo = {
      event: null,
      price: { amount: null, type: null },
      quantity: transfer?.amount ?? null,
      from: { name: null, address: null },
      to: { name: null, address: null },
      date: Date.parse(transfer?.block_timestamp)
    };

    // TRANSFER EVENT TYPE
    if (transfer?.from_address === ZERO_ADDRESS) {
      // -------------MINTING-------------
      activityInfo.event = 'mint';
      activityInfo.to.address = transfer?.to_address;
      activityInfo.to.name = await getUserInfo(Moralis, transfer?.to_address);
    } else if (transfer?.to_address === ContractAddress('LISTING', chain)) {
      // -------------LISTING MADE-------------
      activityInfo.event = 'create listing';
      activityInfo.from.address = transfer?.from_address;
      activityInfo.from.name = await getUserInfo(
        Moralis,
        transfer?.from_address
      );
      const tx = await getTxReceipt(Moralis, transfer?.transaction_hash, chain);
      const { price, paymentMethod } = await getListPriceFromLogs(
        Moralis,
        tx,
        chain
      );
      activityInfo.price.amount = price ?? null;
      activityInfo.price.type = paymentMethod ?? null;
    } else if (transfer?.to_address === ContractAddress('AUCTION', chain)) {
      // -------------AUCTION MADE-------------
      activityInfo.event = 'create auction';
      activityInfo.from.address = transfer?.from_address;
      activityInfo.from.name = await getUserInfo(
        Moralis,
        transfer?.from_address
      );
      const tx = await getTxReceipt(Moralis, transfer?.transaction_hash, chain);
      const { price, paymentMethod } = await getAuctionPriceFromLogs(
        Moralis,
        tx,
        chain
      );
      activityInfo.price.amount = price ?? null;
      activityInfo.price.type = paymentMethod ?? null;
    } else if (transfer?.from_address === ContractAddress('AUCTION', chain)) {
      // -------------AUCTION CLAIM-------------
      activityInfo.event = 'claim auction';
      const tx = await getTxReceipt(Moralis, transfer?.transaction_hash, chain);
      const price = findPriceFromData(tx, chain);
      const { winnerAddress, sellerAddress } = await getBidAddressesFromLogs(
        Moralis,
        tx,
        chain
      );
      activityInfo.to.address = winnerAddress;
      activityInfo.to.name = await getUserInfo(Moralis, winnerAddress);
      activityInfo.from.address = sellerAddress;
      activityInfo.from.name = await getUserInfo(Moralis, sellerAddress);
      activityInfo.price.amount = price?.amount ?? null;
      activityInfo.price.type = price?.typeAddress ?? null;
    } else if (transfer?.from_address === ContractAddress('LISTING', chain)) {
      // -------------LISTING SALE/CANCEL-------------
      activityInfo.event = 'sale';
      activityInfo.to.address = transfer?.to_address;
      activityInfo.to.name = await getUserInfo(Moralis, transfer?.to_address);
      const tx = await getTxReceipt(Moralis, transfer?.transaction_hash, chain);

      // check value for if native spent
      if (transfer?.value !== '0') {
        // -------------LISTING SALE (native currency)-------------
        // get native price
        activityInfo.price.amount = transfer?.value;
        activityInfo.price.type = ZERO_ADDRESS;
        const fromAddress = await getSellerFromLogs(Moralis, tx, chain);
        activityInfo.from.address = fromAddress;
        activityInfo.from.name = await getUserInfo(Moralis, fromAddress);
      } else {
        // check if listing is type cancelled
        let isCancelled = false;
        for (let i = 0; i < tx?.logs?.length; i++) {
          if (tx.logs[i].topics.includes(EventTopic('CANCEL'))) {
            isCancelled = true;
          }
        }

        if (isCancelled) {
          // -------------LISTING CANCELLED-------------
          activityInfo.event = 'cancel listing';
          activityInfo.from.address = transfer?.to_address;
          activityInfo.from.name = activityInfo.to.name;
          activityInfo.to.address = null;
          activityInfo.to.name = null;
        } else {
          // -------------LISTING SALE (nonnative currency)-------------
          // set payment method and price amount
          const price = findPriceFromData(tx, chain);
          activityInfo.price.amount = price?.amount ?? null;
          activityInfo.price.type = price?.typeAddress ?? null;
          const fromAddress = await getSellerFromLogs(Moralis, tx, chain);
          activityInfo.from.address = fromAddress;
          activityInfo.from.name = await getUserInfo(Moralis, fromAddress);
        }
      }
    } else {
      // -------------OFFER CLAIM-------------
      const tx = await getTxReceipt(Moralis, transfer?.transaction_hash, chain);
      let isOffer = false;
      for (let i = 0; i < tx?.logs?.length; i++) {
        if (tx.logs[i].topics.includes(EventTopic('OFFER'))) {
          isOffer = true;
        }
      }
      if (isOffer) {
        activityInfo.event = 'claim offer';
        const price = findPriceFromData(tx, chain);
        activityInfo.price.amount = price?.amount ?? null;
        activityInfo.price.type = price?.typeAddress ?? null;
        activityInfo.to.address = transfer?.to_address;
        activityInfo.to.name = await getUserInfo(Moralis, transfer?.to_address);
        activityInfo.from.address = transfer?.from_address;
        activityInfo.from.name = await getUserInfo(
          Moralis,
          transfer?.from_address
        );
      } else {
        // -------------TRANSFER-------------
        // else generic transfer type by default
        activityInfo.event = 'transfer';
        activityInfo.from.name = await getUserInfo(
          Moralis,
          transfer?.from_address
        );
        activityInfo.from.address = transfer?.from_address;
        activityInfo.to.name = await getUserInfo(Moralis, transfer?.to_address);
        activityInfo.to.address = transfer?.to_address;
      }
    }

    activityList.push(activityInfo);
  }

  return activityList;
};
