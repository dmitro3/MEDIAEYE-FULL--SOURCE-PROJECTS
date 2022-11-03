import { TokenAddress, ZERO_ADDRESS } from '../Addresses';
import { default as AirdropABI } from '../../abi/Airdrop.json';
import { ethers } from 'ethers';
import { ContractAddress } from '../Addresses/ContractAddresses';
import Swal from 'sweetalert2';
import { priceAirdrop } from './PriceAirdrop';

/**
 *
 * @param Moralis is the moralis sdk instance
 * @returns
 */
export const BuyAirdrop = async (Moralis, airdropReq) => {

  // convert provider to ethers
  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
  const chainHex = await Moralis.chainId;

  const contract = new ethers.Contract(
    ContractAddress('AIRDROP', chainHex),
    AirdropABI,
    ethersProvider.getSigner()
  );

  // precreate airdrop object and fill possible fields
  // create nft object in database
  const Airdrop = Moralis.Object.extend('Airdrop');
  // handle for multiple tokenIds event, create multiple nfts

  let airdrop = new Airdrop();
  airdrop.set('accessibility', airdropReq.accessibility);
  airdrop.set('additionalInfo', airdropReq.additionalInfo);
  airdrop.set('description', airdropReq.description);
  airdrop.set('duration', airdropReq.activeDays);
  airdrop.set('embedMedia', airdropReq.embedMedia);
  airdrop.set('links', airdropReq.links);
  airdrop.set('name', airdropReq.name);
  airdrop.set(
    'participantAllocation',
    String(airdropReq.participantAllocation)
  );
  airdrop.set('tasks', airdropReq.tasks);
  airdrop.set('token', {
    name: airdropReq.selectedToken.name,
    symbol: airdropReq.selectedToken.symbol,
    decimals: airdropReq.selectedToken.decimals,
    tokenAddress: airdropReq.selectedToken.token_address
  });
  airdropReq?.airdropType === 'Token'
    ? airdrop.set('token', {
        name: airdropReq.selectedToken.name,
        symbol: airdropReq.selectedToken.symbol,
        decimals: airdropReq.selectedToken.decimals,
        tokenAddress: airdropReq.selectedToken.token_address
      })
    : airdrop.set('token', {
        tokenAddress: airdropReq.selectedToken.token_address,
        tokenId: airdropReq.selectedToken.token_id
      });
  airdrop.set('totalAllocation', String(airdropReq.totalAllocation));
  airdrop.set('valid', false);

  // save images with Moralis IPFS
  // create list of promises based on what data is being pushed to ipfs
  let promises = [];
  let promiseType = [];
  let banner = airdropReq.banner;
  let logo = airdropReq.logo;

  if (banner?.size < 64000000) {
    const bannerFile = new Moralis.File(banner.name, banner);
    const bannerRes = bannerFile.saveIPFS();
    promises.push(bannerRes);
    promiseType.push('banner');
  }
  if (logo?.size < 64000000) {
    const logoFile = new Moralis.File(logo.name, logo);
    const logoRes = logoFile.saveIPFS();
    promises.push(logoRes);
    promiseType.push('logo');
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Logo must exist and be smaller than 64mb',
      customClass: {
        popup:
          localStorage.getItem('darkTheme') == 'true'
            ? 'dark_swal_popup'
            : 'swal_popup',
        title:
          localStorage.getItem('darkTheme') == 'true'
            ? 'dark_swal_popup_title'
            : 'swal_popup_title',
        htmlContainer:
          localStorage.getItem('darkTheme') == 'true'
            ? 'dark_swal_popup_text'
            : 'swal_popup_text',
        confirmButton: 'swal_popup_button'
      }
    });
    return;
  }

  let ipfsImages = await Promise.all(promises);
  // add images to collection data
  for (let i = 0; i < ipfsImages.length; i++) {
    airdrop.set(promiseType[i], ipfsImages[i]._ipfs);
  }

  await airdrop.save();

  let priceEstimate = await priceAirdrop(Moralis, {
    activeDays: airdropReq?.activeDays,
    chainId: chainHex
  });

  try {
    let tx = await contract.startAirdrop(
      airdropReq?.airdropType === 'NFT' ? 2 : 0,
      false, // promo
      airdropReq?.selectedToken?.token_address,
      '0x0000000000000000000000000000000000000000000000000000000000000000', //merkle
      Math.trunc(airdropReq.claimDate),
      airdropReq.activeDays,
      airdropReq?.selectedToken?.token_id
        ? [airdropReq?.selectedToken?.token_id]
        : [0], // if airdrop is erc1155 enter correct tokenId
      [airdropReq.totalAllocation],
      TokenAddress(airdropReq.activeToken, chainHex),
      false, // feature,
      airdrop.id, // extra data
      { value: priceEstimate?.nativePrice }
    );
    const result = await tx.wait();

    return result;
  } catch (e) {
    return e;
  }
};
