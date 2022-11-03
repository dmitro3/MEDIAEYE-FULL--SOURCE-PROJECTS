export const RpcEndpointUrl = (chainId) => {
  if (chainId === '0x38' || chainId === 'BSC' || chainId === 56) {
    return 'https://rpc.ankr.com/bsc';
  } else if (chainId === '0xfa' || chainId === 'FTM' || chainId === 250) {
    return 'https://rpc.ankr.com/fantom';
  } else if (
    chainId === '0x61' ||
    chainId === 'BSC TESTNET' ||
    chainId === 97
  ) {
    return 'https://rpc.ankr.com/bsc_testnet_chapel';
  } else if (chainId === '0x1' || chainId === 'ETH' || chainId === 1) {
    return 'https://rpc.ankr.com/eth';
  }
};
