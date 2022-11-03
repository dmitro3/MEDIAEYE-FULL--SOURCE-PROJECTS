import { EMPTY_SIG } from '../Subscription/EmptySig';
import { ContractAddress } from '../../../blockchain/functions/Addresses';
import { fromRpcSig } from 'ethereumjs-util';

const { signTypedData_v4 } = require('eth-sig-util');

const subscriptionOperator = process.env.REACT_APP_SUBSCRIPTION_OPERATOR;

const types = {
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' }
  ],
  UserSubscription: [
    { name: 'userAddress', type: 'address' },
    { name: 'subscriptionTier', type: 'uint8' },
    { name: 'startTime', type: 'uint256' },
    { name: 'endTime', type: 'uint256' }
  ]
};

const CrossChainSig = async (user, chain) => {
  let chainHex = '';
  let chainId = 0;
  // retrieve hexadecimal number for chainId
  if (
    chain === 'BNB' ||
    chain === process.env.REACT_APP_BSC_CHAIN_NUMBER ||
    chain === process.env.REACT_APP_BSC_CHAIN_NAME ||
    chain === process.env.REACT_APP_BSC_CHAIN_ID
  ) {
    chainHex = process.env.REACT_APP_BSC_CHAIN_ID;
    chainId = process.env.REACT_APP_BSC_CHAIN_NUMBER;
  } else if (chain === 'FTM' || chain === 250 || chain === '0xfa') {
    chainHex = '0xfa';
    chainId = 250;
  } else {
    chainHex = '0x1';
    chainId = 1;
  }

  if (chainHex === user.attributes.subscriptionChain) {
    return EMPTY_SIG;
  } else {
    const domain = {
      name: 'MediaEyeFee',
      version: '1',
      chainId: chainId,
      verifyingContract: ContractAddress('FEE', chainHex)
    };

    const msgParams = {
      types: types,
      primaryType: 'UserSubscription',
      domain: domain,
      message: {
        userAddress: user.attributes.ethAddress,
        subscriptionTier: user.attributes.subscriptionLevel,
        startTime: user.attributes.subscriptionStart,
        endTime: user.attributes.subscriptionEnd
      }
    };

    const operatorSig = signTypedData_v4(
      Buffer.from(subscriptionOperator, 'hex'),
      {
        data: msgParams
      }
    );

    const { v, r, s } = fromRpcSig(operatorSig);
    const userSub = [
      user.attributes.ethAddress,
      user.attributes.subscriptionLevel,
      user.attributes.subscriptionStart,
      user.attributes.subscriptionEnd
    ];

    return [
      true,
      userSub,
      v,
      '0x' + r.toString('hex'),
      '0x' + s.toString('hex')
    ];
  }
};

export default CrossChainSig;
