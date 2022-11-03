function ContractAddress(contractName, chainId) {
  if (chainId === '0x38' || chainId === 'BSC') {
    switch (contractName) {
      case 'FEE':
        return '0xC65c5B97AaCbd7fBbc87b93BB992c4693a70f822';
      case 'COLLECTION_FACTORY':
        return '0x4B42c2c3c5c98d38D444F73ab352C4AAA877133E';
      case 'LISTING':
        return '0xCd2F6068823d303EEb3113D333d3e69be0BBc10b';
      case 'AUCTION':
        return '0x0007763AbeD2AE4E68221965EB511D51697Da6eB';
      case 'INFO':
        return '0x55b20eaf25c8ca009d0b085d92e136dab63077b8';
      case 'ERC721_MAIN':
        return '0xF407958C89d8d9dFE4F6c3E0D468F3Da3eA8A650';
      case 'ERC1155_MAIN':
        return '0x487dFed85D3f01f1AB7C90A09d6070C43523a72C';
      case 'COHORT':
        return '0x92DD738dddd096058432D34AbCC43eDe0D8D1113';
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
        return '0x9EC22e736f6b1F27ebf3C2d0B5696322C5C237Ad';
      case 'COLLECTION_FACTORY':
        return '0x66Dd281F52b8a10da149e4700c139A208cCDEF98';
      case 'LISTING':
        return '0xA53a433CDdD548e9D6ea43A3b8D356edF70FbA3C';
      case 'AUCTION':
        return '0x42C7fdCC3c0fB1581C24427933FB2eBC3A2471C4';
      case 'INFO':
        return '0x6f6f3bd34a8c5e7921ab0954026095e5c1a646c0';
      case 'ERC721_MAIN':
        return '0xC65c5B97AaCbd7fBbc87b93BB992c4693a70f822';
      case 'ERC1155_MAIN':
        return '0x519EA701BbF5f789a9B1efc9c91e4c4e01b2DD5C';
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
}

function TokenName(tokenAddress, chainId) {
  if (chainId === '0x38' || chainId === 'BSC' || chainId === 56) {
    switch (tokenAddress) {
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
    switch (tokenAddress) {
      case '0x0000000000000000000000000000000000000000':
        return 'FTM';
      case '0x04068da6c83afcfa0e13ba15a6696662335d5b75':
        return 'USDC';
      case '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83':
        return 'WFTM';
      default:
        return null;
    }
  } else if (chainId == '0x61' || chainId == 'BSC TESTNET' || chainId == 97) {
    switch (tokenName) {
      case 'BNB':
        return '0x0000000000000000000000000000000000000000';
      case 'WBNB':
        return '0x047c214c88B17F21300903f30Ec9df8273aF30c9';
      case 'BUSD':
        return '0xAbDBCd6E2Ed067C6c495f467b36ce21E1b678ad3';
      case 'EYE':
        return '0x823aC45923B61fA0335d216a44583a52FE116B71';
      default:
        return null;
    }
  }
  switch (tokenAddress) {
    case '0x0000000000000000000000000000000000000000':
      return 'ETH';
    case '0x2d315abb83a5613fd6ca3257060ede3d03aa2552':
      return 'EYE';
    case '0xd8f6ba6fa69ba197e41d3811ff9c1600557a6590':
      return 'WETH';
    case '0xd92e713d051c37ebb2561803a3b5fbabc4962431':
      return 'USDT_OLD2';
    case '0xdac17f958d2ee523a2206206994597c13d831ec7':
      return 'USDT_OLD';
    case '0x82b9ed619f864c59102aea16ffd5bcc1d8ff27d8':
      return 'USDT';
    default:
      return 'ERROR';
  }
}

Moralis.Cloud.define('convertPriceHelper', async (request) => {
  const logger = Moralis.Cloud.getLogger();
  const chainHex = request.params.chainHex;
  const price = request.params.price;
  const tokenAddress = request.params.tokenAddress;
  const toNative = request.params.toNative;
  const FeeABI = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_baseAmount',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_baseDecimals',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: '_queryDecimals',
          type: 'uint256'
        },
        {
          internalType: 'bool',
          name: '_invertedAggregator',
          type: 'bool'
        },
        {
          internalType: 'bool',
          name: '_convertToNative',
          type: 'bool'
        }
      ],
      name: 'convertPrice',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ];

  // boolean, false for ftm/eth or true for bsc
  const invertedAggregator =
    chainHex === '0x38' || chainHex === '0x61' ? true : false;
  const baseDecimals =
    TokenName(tokenAddress) === 'USDT' || TokenName(tokenAddress) === 'USDC'
      ? 6
      : 18;
  const contractAddress = ContractAddress('FEE', chainHex);

  try {
    const web3 = Moralis.web3ByChain(chainHex);
    const contract = new web3.eth.Contract(FeeABI, contractAddress);
    const convertPrice = await contract.methods
      .convertPrice(
        String(price),
        baseDecimals,
        18,
        invertedAggregator,
        toNative
      )
      .call();
    return convertPrice;
  } catch (e) {
    logger.info('error ' + e);
  }
});
