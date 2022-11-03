import { default as CollectionABI } from '../../abi/CollectionFactory.json';
import { ContractAddress } from '../Addresses';
import { EMPTY_FEAT } from '../Feature/EmptyFeat';
import { ZERO_ADDRESS } from '../Addresses';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { ethers } from 'ethers';

export const createERC721Collection = async (
  Moralis,
  owner,
  minters,
  mints,
  description,
  name,
  symbol,
  banner,
  logo,
  dispatch,
  featured,
  hidden,
  subscriptionSig,
  socialMedia,
  featureInformation
) => {
  if (
    !name ||
    name.length === 0 ||
    !symbol ||
    symbol.length === 0 ||
    logo === null
  ) {
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: 'Missing fields, ERC721 must have a name, symbol, and logo',
        textButton: 'OK',
        size: 'sm'
      })
    );

    return;
  }

  const chainHex = await Moralis.chainId;

  const ethersProvider = new ethers.providers.Web3Provider(Moralis.provider);
  const contract = new ethers.Contract(
    ContractAddress('COLLECTION_FACTORY', chainHex),
    CollectionABI,
    ethersProvider.getSigner()
  );

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
  } else {
    dispatch(
      toggleGeneralPopup({
        status: 'error',
        message: 'Logo must exist and be smaller than 64mb',
        textButton: 'OK',
        size: 'sm'
      })
    );
    return false;
  }

  // pass in extra fields to the contract
  let colData = {
    description: description,
    hidden: hidden,
    links: socialMedia
  };

  let ipfsImages = await Promise.all(promises);
  // add images to collection data
  for (let i = 0; i < ipfsImages.length; i++) {
    colData[`${promiseType[i]}`] = ipfsImages[i]._ipfs;
  }

  let payablePrice = 0;
  let featInfo;

  if (featureInformation['feature']) {
    featInfo = [
      featureInformation['feature'],
      featureInformation['paymentMethod'],
      featureInformation['numDays'],
      featureInformation['id'],
      featureInformation['tokenAddresses'],
      featureInformation['tokenIds'],
      featureInformation['price']
    ];
    if (featureInformation['paymentMethod'] === ZERO_ADDRESS) {
      payablePrice = featureInformation['price'];
    }
  } else {
    featInfo = EMPTY_FEAT;
  }
  mints = ['0x0000000000000000000000000000000000000000', [], []];

  try {
    const tx = await contract.createERC721Collection(
      owner,
      minters,
      name,
      symbol,
      mints,
      JSON.stringify(colData),
      subscriptionSig,
      featInfo,
      {
        value: payablePrice
      }
    );
    return await tx.wait();
  } catch (e) {
    console.log(e);
  }
};
