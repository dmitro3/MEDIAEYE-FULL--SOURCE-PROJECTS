import { default as CollectionABI } from '../../abi/CollectionFactory.json';
import { ContractAddress } from '../Addresses';
import Swal from 'sweetalert2';
import { EMPTY_FEAT } from '../Feature/EmptyFeat';
import { ZERO_ADDRESS } from '../Addresses';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { ethers } from 'ethers';

export const createERC1155Collection = async (
  Moralis,
  owner,
  minters,
  mints,
  description,
  name,
  banner,
  logo,
  dispatch,
  featured,
  hidden,
  subscriptionSig,
  socialMedia,
  featureInformation
) => {
  if (!name || name.length === 0 || logo === null) {
    Swal.fire({
      icon: 'error',
      title: 'Missing fields, ERC1155 must have a name, and logo.',
      customClass: {
        popup:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup'
            : 'swal_popup',
        title:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_title'
            : 'swal_popup_title',
        htmlContainer:
          localStorage.getItem('darkTheme') === 'true'
            ? 'dark_swal_popup_text'
            : 'swal_popup_text',
        confirmButton: 'swal_popup_button'
      }
    });
    return false;
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
    name: name,
    links: socialMedia
  };

  let ipfsImages = await Promise.all(promises);
  // add images to collection data
  for (let i = 0; i < ipfsImages.length; i++) {
    colData[`${promiseType[i]}`] = ipfsImages[i]._ipfs;
  }

  // const emptySig = EMPTY_SIG;
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
  mints = ['0x0000000000000000000000000000000000000000', [], 0, [], []];

  let createReq = {
    _owner: owner,
    _minters: minters,
    _mints: mints,
    _tokenData: JSON.stringify(colData),
    _subscriptionSignature: subscriptionSig,
    _featureCollection: featInfo,

    value: payablePrice
  };
  try {
    const tx = await contract.createERC1155Collection(
      owner,
      minters,
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
