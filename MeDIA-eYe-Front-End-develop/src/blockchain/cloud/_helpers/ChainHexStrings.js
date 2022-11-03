function ChainHexString(chainName) {
  switch (chainName?.toLowerCase()) {
    case 'eth':
      return '0x1';
    case 'bsc':
      return '0x38';
    case 'bsc testnet':
      return '0x61';
    case 'ftm':
      return '0xfa';
    default:
      return null;
  }
}
