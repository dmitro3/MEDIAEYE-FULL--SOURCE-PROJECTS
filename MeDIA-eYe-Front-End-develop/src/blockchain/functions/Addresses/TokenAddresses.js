require('dotenv').config();

export const TokenAddress = (tokenName, chainId) => {
  tokenName = tokenName.toUpperCase();
  if (chainId === '0x38' || chainId === 'BSC' || chainId === 56) {
    switch (tokenName) {
      case 'BNB':
        return '0x0000000000000000000000000000000000000000';
      case 'WBNB':
        return '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';
      case 'BUSD':
        return '0xe9e7cea3dedca5984780bafc599bd69add087d56';
      case 'EYE':
        return '0x9a257c90fa239fba07771ef7da2d554d148c2e89';
      default:
        return null;
    }
  } else if (chainId === '0x1' || chainId === 'ETH' || chainId === 1) {
    switch (tokenName) {
      case 'ETH':
        return '0x0000000000000000000000000000000000000000';
      case 'WETH':
        return '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
      // case 'USDT':
      //   return '0xdac17f958d2ee523a2206206994597c13d831ec7';
      // case 'EYE':
      //   return '0x9a257c90fa239fba07771ef7da2d554d148c2e89';
      case 'EYE':
        return '0x2d315abb83a5613fd6ca3257060ede3d03aa2552';
      // case 'WETH':
      //   return '0xd8f6ba6fa69ba197e41d3811ff9c1600557a6590';
      case 'USDT':
        return '0xdac17f958d2ee523a2206206994597c13d831ec7';
      // case 'USDT_OLD2':
      //   return '0xd92e713d051c37ebb2561803a3b5fbabc4962431';
      case 'TESTEYE':
        return '0x84248fd2327A091e8e5e5D918DbD6EF7233Adf11';
      // case 'USDT':
      //   return '0x82b9ed619f864c59102aea16ffd5bcc1d8ff27d8';
      case 'TEST2':
        return '0xD8F6Ba6fa69Ba197E41D3811ff9C1600557A6590';
      case 'TEST3':
        return '0xA904A2707deaEC0867b301cf8911aF1582eE42EA';
      default:
        return null;
    }
  } else if (chainId === '0xfa' || chainId === 'FTM' || chainId === 250) {
    switch (tokenName) {
      case 'FTM':
        return '0x0000000000000000000000000000000000000000';
      case 'WFTM':
        return '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83';
      case 'USDC':
        return '0x04068da6c83afcfa0e13ba15a6696662335d5b75';
      case 'EYE':
        return '0x9a257c90fa239fba07771ef7da2d554d148c2e89';
      default:
        return null;
    }
  } else if (
    chainId === '0x61' ||
    chainId === 'BSC TESTNET' ||
    chainId === 97
  ) {
    switch (tokenName) {
      case 'BNB':
        return '0x0000000000000000000000000000000000000000';
      case 'WBNB':
        return '0x047c214c88b17f21300903f30ec9df8273af30c9';
      case 'BUSD':
        return '0xabdbcd6e2ed067c6c495f467b36ce21e1b678ad3';
      case 'EYE':
        return '0x823ac45923b61fa0335d216a44583a52fe116b71';
      default:
        return null;
    }
  }

  switch (tokenName) {
    case 'ETH':
      return '0x0000000000000000000000000000000000000000';
    case 'REAL-EYE':
      return '0x9a257c90fa239fba07771ef7da2d554d148c2e89';
    case 'EYE':
      return '0x2d315abb83a5613fd6ca3257060ede3d03aa2552';
    case 'WETH':
      return '0xd8f6ba6fa69ba197e41d3811ff9c1600557a6590';
    case 'USDT_OLD':
      return '0xdac17f958d2ee523a2206206994597c13d831ec7';
    case 'USDT_OLD2':
      return '0xd92e713d051c37ebb2561803a3b5fbabc4962431';
    case 'TESTEYE':
      return '0x84248fd2327A091e8e5e5D918DbD6EF7233Adf11';
    case 'USDT':
      return '0x82b9ed619f864c59102aea16ffd5bcc1d8ff27d8';
    case 'TEST2':
      return '0xD8F6Ba6fa69Ba197E41D3811ff9C1600557A6590';
    case 'TEST3':
      return '0xA904A2707deaEC0867b301cf8911aF1582eE42EA';
    default:
      return null;
  }
};
