export const ContractAddress = (contractName, chainId) => {
  if (chainId === '0x38' || chainId === 'BSC') {
    switch (contractName) {
      case 'FEE':
        return '0xc65c5b97aacbd7fbbc87b93bb992c4693a70f822';
      case 'COLLECTION_FACTORY':
        return '0x4b42c2c3c5c98d38d444f73ab352c4aaa877133e';
      case 'LISTING':
        return '0xdfcd67a46066c7479f3d5f4b5b8fb00366b39fbf';
      case 'AUCTION':
        return '0xf881a4e0bd5851d8cbb7d4d0add13b905de7de37';
      case 'INFO':
        return '0x55b20eaf25c8ca009d0b085d92e136dab63077b8';
      case 'ERC721_MAIN':
        return '0xf407958c89d8d9dfe4f6c3e0d468f3da3ea8a650';
      case 'ERC1155_MAIN':
        return '0x487dfed85d3f01f1ab7c90a09d6070c43523a72c';
      case 'COHORT':
        return '0x92dd738dddd096058432d34abcc43ede0d8d1113';
      case 'OFFER':
        return '0xf607f54041610e153ebcb65f5e3d0f8d54c3c2c7';
      case 'AIRDROP':
        return '0x571d2fa72e7a1557a9721a0dae850fdc3b4f2ebb';
      default:
        return 'ERROR: BSC ContractName not found';
    }
  } else if (chainId === '0x4' || chainId === 'RINK') {
    switch (contractName) {
      case 'FEE':
        return '0xf1467c9fb0689c0ff43c112a87c819966a3c8d9e';
      case 'COLLECTION_FACTORY':
        return '0xe6ba8760bf48d5e7653177daf4dc18f2b775bccf';
      case 'LISTING':
        return '0x68312f7ef5408fe51efc454d970efc969d4fc5ad';
      case 'AUCTION':
        return '0x383e38021a67aae3190ebd8435ec4b5d875688c5';
      case 'INFO':
        return '0xf3afb445f5d97eaf7e8e6a61bcc971979a51f324';
      case 'ERC721_MAIN':
        return '0x7546643c34f3ddb3c6231a632a7ece636c56aa72';
      case 'ERC1155_MAIN':
        return '0x7cc0a0696f04c0aa9d5b43f03100b69a22f792d6';
      default:
        return 'ERROR: RINKEBY ContractName not found';
    }
  } else if (chainId === '0xfa' || chainId === 'FTM') {
    switch (contractName) {
      case 'FEE':
        return '0x9ec22e736f6b1f27ebf3c2d0b5696322c5c237ad';
      case 'COLLECTION_FACTORY':
        return '0x66dd281f52b8a10da149e4700c139a208ccdef98';
      case 'LISTING':
        return '0x7c76aab9f11927755e7a280c659c7c4628db1b03';
      case 'AUCTION':
        return '0x2ffd21df7d92154d1157b0a800ec9a5d65a862cf';
      case 'INFO':
        return '0x6f6f3bd34a8c5e7921ab0954026095e5c1a646c0';
      case 'ERC721_MAIN':
        return '0xc65c5b97aacbd7fbbc87b93bb992c4693a70f822';
      case 'ERC1155_MAIN':
        return '0x519ea701bbf5f789a9b1efc9c91e4c4e01b2dd5c';
      case 'OFFER':
        return '0xb13f957fb8e4b142553794eff7332e61eeb9599c';
      case 'AIRDROP':
        return '0x56d9c004acb4d5852483d9a7a1cd3ec1d44132cf';
      default:
        return 'ERROR: FTM ContractName not found';
    }
  } else if (chainId === '0x1' || chainId === 'ETH') {
    switch (contractName) {
      case 'COHORT':
        return '0x76a2D996891f520FeDD1A71DF926279896ee6A35';
      default:
        return 'ERROR: ETH ContractName not found';
    }
  } else if (chainId === '0x61' || chainId === 'BSC TESTNET') {
    switch (contractName) {
      case 'FEE':
        return '0x9eF8fCf9C50AEdce51793D5bE00f1cDDB0F761c1';
      case 'COLLECTION_FACTORY':
        return '0x61Cfa6b86d73d76b9AB444484824F282F4D4744A';
      case 'LISTING':
        return '0xdd2DD2ce528dEFDBe42174Dd87415E909529Ce09';
      case 'AUCTION':
        return '0xF37eF0551BF063279e0cDED0F9b7B32A11dAF2B4';
      case 'INFO':
        return '0x40cceAb30C12aEF6091917A53f3B993e21d946F8';
      case 'ERC721_MAIN':
        return '0xFCf2CA9ec20d1f20a380e6a200Aac90784F40b32';
      case 'ERC1155_MAIN':
        return '0x5D3BCe4a1E4477d19209696daC1F03F23C393776';
      case 'COHORT':
        return '0x92DD738dddd096058432D34AbCC43eDe0D8D1113';
      default:
        return 'ERROR: BSC TEST NET ContractName not found';
    }
  }
};
