require('dotenv').config();

export const ChainName = (chainHex) => {
  const chain = chainHex?.toUpperCase();

  if (chain === process.env.REACT_APP_BSC_CHAIN_NAME) {
    return chain;
  }

  if (chain === 'ETH' || chain === 'FTM') {
    return chain;
  }

  switch (chainHex?.toLowerCase()) {
    case '0x1':
      return 'ETH';
    case '0x4':
      return 'ETH';
    case process.env.REACT_APP_BSC_CHAIN_ID:
      return process.env.REACT_APP_BSC_CHAIN_NAME;
    case '0xfa':
      return 'FTM';

    default:
      return null;
  }
};
export const ChainScanerLink = (chainHex) => {
  switch (chainHex?.toLowerCase()) {
    case '0x1':
      return 'https://etherscan.io';
    case '0x4':
      return 'https://etherscan.io';
    case 'eth':
      return 'https://etherscan.io';
    case process.env.REACT_APP_BSC_CHAIN_ID:
      if (process.env.REACT_APP_BSC_CHAIN_ID === '0x38') {
        return 'https://bscscan.com';
      } else {
        return 'https://bscscan.com';
      }
    case process.env.REACT_APP_BSC_CHAIN_NAME.toLowerCase():
      if (process.env.REACT_APP_BSC_CHAIN_NAME === 'bsc testnet') {
        return 'https://bscscan.com';
      } else {
        return 'https://bscscan.com';
      }
    case '0xfa':
      return 'https://ftmscan.com';
    case 'ftm':
      return 'https://ftmscan.com';
    default:
      return null;
  }
};

export const ExplorerTokenURL = (chainHex, contractAddress, tokenId) => {
  switch (chainHex?.toLowerCase()) {
    case '0x1':
      return 'https://etherscan.io';
    case '0x4':
      return 'https://etherscan.io';
    case process.env.REACT_APP_BSC_CHAIN_ID:
      if (process.env.REACT_APP_BSC_CHAIN_ID === '0x38') {
        return `https://bscscan.com/token/${contractAddress}?a=${tokenId}`;
      } else {
        return `https://testnet.bscscan.com/token/${contractAddress}?a=${tokenId}`;
      }
    case '0xfa':
      return `https://ftmscan.com/token/${contractAddress}?a=${tokenId}`;
  }
};
