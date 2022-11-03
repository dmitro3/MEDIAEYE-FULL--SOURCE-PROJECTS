export const TokenNameMap = (chainId, isWrapped) => {
  if (chainId === '0x38' || chainId === '0x61') {
    return isWrapped ? 'WBNB' : 'BNB';
  } else if (chainId === '0x1') {
    return isWrapped ? 'WETH' : 'ETH';
  } else if (chainId === '0xfa') {
    return isWrapped ? 'WFTM' : 'FTM';
  }
};
