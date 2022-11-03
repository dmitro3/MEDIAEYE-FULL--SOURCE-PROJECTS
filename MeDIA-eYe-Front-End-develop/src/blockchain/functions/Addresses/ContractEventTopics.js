export const EventTopic = (eventType) => {
  switch (eventType) {
    case 'TRANSFER':
      return '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
    case 'CANCEL':
      return '0x411aee90354c51b1b04cd563fcab2617142a9d50da19232d888547c8a1b7fd8a';
    case 'OFFER':
      return '0x915d368e1dece53c28b543bab613e04b09a95721c45ffd491ec15bc35ae78539';
    case 'SALE':
      return '0x61905234b7ced1e034ebd0b31b8f9b762a18f06bfdba53df383d5be7f77d9ba8';
    case 'BID':
      return '0x1140a8097baf500f2d493ac1fa4ef9cbb45d4f19ab70ec114c3cef35022665e2';
    case 'LISTING':
      return '0x329e020cc2905277069aa10772a66193c48e91b38ea61a1e401203d3da699e5b';
    case 'AUCTION':
      return '0xe01a3e0747f95fefaaa30c939669671ed49c52ade2694bfc6d6ece5a1473d371';
    default:
      return null;
  }
};
