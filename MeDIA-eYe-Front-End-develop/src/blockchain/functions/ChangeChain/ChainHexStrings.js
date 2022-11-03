require('dotenv').config();

export const ChainHexString = (chainName) => {
  if (!chainName) return null;
  const chain = chainName?.toLowerCase();

  if (chain === process.env.REACT_APP_BSC_CHAIN_ID) {
    return chain;
  }

  if (chain === '0x1' || chain === '0x4' || chain === '0xfa') {
    return chain;
  }

  switch (chain) {
    case 'eth':
      return '0x1';
    case 'rink':
      return '0x4';
    case process.env.REACT_APP_BSC_CHAIN_NAME.toLowerCase():
      return process.env.REACT_APP_BSC_CHAIN_ID;
    case 'ftm':
      return '0xfa';
    default:
      return null;
  }
};
