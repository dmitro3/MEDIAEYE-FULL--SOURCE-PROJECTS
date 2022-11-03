import ERC from '../../../assets/img/token/34/ERC.png';
import BNB from '../../../assets/img/token/34/BNB.png';
import BUSD from '../../../assets/img/token/34/BUSD.png';
import ETH from '../../../assets/img/token/34/ETH.png';
import SOL from '../../../assets/img/token/34/solana.png';
import FLOW from '../../../assets/img/token/34/flow.png';
import EYE from '../../../assets/img/token/34/EYE.png';
import FTM from '../../../assets/img/token/34/FTM.png';
import WBNB from '../../../assets/img/token/34/WBNB.png';
import WETH from '../../../assets/img/token/34/WETH.png';
import WFTM from '../../../assets/img/token/34/WFTM.png';
import USDC from '../../../assets/img/token/34/USDC.png';
import USDT from '../../../assets/img/token/34/USDT.png';

import USER from '../../../assets/img/default/mediaeye-user-72.png';
import LOGO from '../../../assets/img/default/logo.png';
import LOGO2 from '../../../assets/img/default/logo2.png';
import Displayed from '../../../assets/img/default/displayed.png';
import Banner from '../../../assets/img/default/banner.png';
import Banner2 from '../../../assets/img/default/banner2.png';
import Private from '../../../assets/img/default/private.png';
import Public from '../../../assets/img/default/public.png';
import NFT from '../../../assets/img/default/mount.png';
import Tokens from '../../../assets/img/default/tokens.png';
import CardLogo from '../../../assets/img/default/card-logo.png';
import CardLogo2x from '../../../assets/img/default/card-logo2x.png';

export const GetNetworkIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'bsc':
      return BNB;
    case 'bnb':
      return BNB;
    case 'busd':
      return BUSD;
    case 'ETH':
      return ETH;
    case 'sol':
      return SOL;
    case 'flow':
      return FLOW;
    case 'eth':
      return ETH;
    case 'eye':
      return EYE;
    case 'ftm':
      return FTM;
    case 'wbnb':
      return WBNB;
    case 'weth':
      return WETH;
    case 'wftm':
      return WFTM;
    case 'usdc':
      return USDC;
    case 'usdt':
      return USDT;
    case 'usd':
      return USDC;
    default:
      return null;
  }
};

export const GetTokenIcon = (type) => {
  return ERC;
};

export const GetDefaultImages = (type) => {
  switch (type?.toLowerCase()) {
    case 'user':
      return USER;
    case 'logo2':
      return LOGO2;
    case 'logo':
      return LOGO;
    case 'display':
      return Displayed;
    case 'banner2':
      return Banner2;
    case 'banner':
      return Banner;
    case 'public':
      return Public;
    case 'private':
      return Private;
    case 'nft':
      return NFT;
    case 'token':
      return Tokens;
    case 'cardlogo':
      return CardLogo;
    case 'cardlogo2x':
      return CardLogo2x;


    default:
      return null;
  }
};