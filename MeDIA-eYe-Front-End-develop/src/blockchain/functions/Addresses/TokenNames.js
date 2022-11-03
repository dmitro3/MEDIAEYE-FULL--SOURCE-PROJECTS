export const TokenName = (tokenAddress, chainId) => {
  const address = tokenAddress?.toLowerCase();
  if (chainId === '0x38' || chainId === 'BSC' || chainId === 56) {
    switch (address) {
      case '0x0000000000000000000000000000000000000000':
        return 'BNB';
      case '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c':
        return 'WBNB';
      case '0xe9e7cea3dedca5984780bafc599bd69add087d56':
        return 'BUSD';
      case '0x9a257c90fa239fba07771ef7da2d554d148c2e89':
        return 'EYE';
      default:
        return null;
    }
  } else if (chainId === '0xfa' || chainId === 'FTM' || chainId === 250) {
    switch (address) {
      case '0x0000000000000000000000000000000000000000':
        return 'FTM';
      case '0x04068da6c83afcfa0e13ba15a6696662335d5b75':
        return 'USDC';
      case '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c':
        return 'WBNB';
      case '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83':
        return 'WFTM';
      default:
        return null;
    }
  } else if (
    chainId === '0x61' ||
    chainId === 'BSC TESTNET' ||
    chainId === 97
  ) {
    switch (address) {
      case '0x0000000000000000000000000000000000000000':
        return 'BNB';
      case '0x047c214c88b17f21300903f30ec9df8273af30c9':
        return 'WBNB';
      case '0xabdbcd6e2ed067c6c495f467b36ce21e1b678ad3':
        return 'BUSD';
      case '0x823ac45923b61fa0335d216a44583a52fe116b71':
        return 'EYE';
      default:
        return null;
    }
  }
  switch (address) {
    case '0x0000000000000000000000000000000000000000':
      return 'ETH';
    case '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c':
      return 'WBNB';
    case '0x2d315abb83a5613fd6ca3257060ede3d03aa2552':
      return 'EYE';
    case '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2':
      return 'WETH';
    case '0xd92e713d051c37ebb2561803a3b5fbabc4962431':
      return 'USDT_OLD2';
    case '0xdac17f958d2ee523a2206206994597c13d831ec7':
      //   return 'USDT_OLD';
      // case '0x82b9ed619f864c59102aea16ffd5bcc1d8ff27d8':
      return 'USDT';
    default:
      return 'ERROR';
  }
};

export const IsStableCoin = (tokenName) => {
  switch (tokenName) {
    case 'USDT':
    case 'USDC':
    case 'BUSD':
      return true;
    default:
      return false;
  }
};
