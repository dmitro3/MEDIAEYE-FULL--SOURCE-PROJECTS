import { TokenAddress } from '../ApproveToken';
import { default as FeeABI } from '../../abi/MediaEyeFee.json';
import { ContractAddress } from '../Addresses';
import Swal from 'sweetalert2';
// import { EMPTY_SIG } from '../Subscription/EmptySig';
import { EMPTY_FEAT } from '../Feature/EmptyFeat';
import { ZERO_ADDRESS } from '../Addresses';

export const featureNFT = async (
  Moralis,
  paymentMethod,
  tokenAddresses,
  tokenIds,
  featureInformation
) => {
  // enable web3 before executing functions
  // const web3 = await Moralis.enableWeb3();

  let payablePrice = 0;
  let featInfo;
  if (featureInformation['featureType']) {
    featInfo = [
      featureInformation['startTime'],
      featureInformation['numDays'],
      featureInformation['featureType'],
      featureInformation['contractAddress'],
      featureInformation['listingId'],
      featureInformation['auctionId'],
      featureInformation['id'],
      featureInformation['featuredBy'],
      featureInformation['price']
    ];
    if (paymentMethod == ZERO_ADDRESS) {
      payablePrice = featureInformation['price'];
    }
  } else {
    featInfo = EMPTY_FEAT;
  }

  const chainHex = await Moralis.chainId;

  const featureNFTContract = {
    abi: FeeABI,
    contractAddress: ContractAddress('FEE', chainHex),
    functionName: 'payFeatureFee',
    msgValue: payablePrice,
    params: {
      _paymentMethod: paymentMethod,
      _tokenAddresses: tokenAddresses,
      _tokenIds: tokenIds,
      _featured: featInfo
    }
  };

  try {
    const featureNFT = await Moralis.executeFunction(featureNFTContract).then(
      (receipt) => {
        if (receipt.status) {
          return true;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Feature NFT Failed!',
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
          return false;
        }
      }
    );
    return featureNFT;
  } catch (e) {
    Swal.fire({
      icon: 'error',
      title: 'Metamask Rejection!',
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
    return false;
  }
};
