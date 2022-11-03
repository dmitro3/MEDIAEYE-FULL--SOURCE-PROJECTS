import { changeNetwork } from '../../../store/app/appSlice';
import { ChainName } from './ChainNames';

require('dotenv').config();

export const ChangeChainRequest = async (chain, dispatch) => {
  let chainHex = '';
  // retrieve hexadecimal number for chainId
  if (
    chain === process.env.REACT_APP_BSC_CHAIN_NAME ||
    chain === process.env.REACT_APP_BSC_CHAIN_ID
  ) {
    chainHex = process.env.REACT_APP_BSC_CHAIN_ID;
  } else if (chain === 'FTM' || chain === '0xfa') {
    chainHex = '0xfa';
  } else {
    chainHex = '0x1';
  }

  // Check if MetaMask is installed
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainHex }]
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          let params = [];
          if (chainHex === '0x38') {
            params = [
              {
                chainName: 'Binance Smart Chain',
                chainId: chainHex,
                rpcUrls: ['https://bsc-dataseed.binance.org/'],
                blockExplorerUrls: ['https://bscscan.com/']
              }
            ];
          } else if (chainHex === '0xfa') {
            params = [
              {
                chainName: 'Fantom Opera',
                chainId: chainHex,
                rpcUrls: ['https://rpc.ftm.tools/'],
                blockExplorerUrls: ['https://ftmscan.com/'],
                nativeCurrency: {
                  name: 'Fantom',
                  symbol: 'FTM',
                  decimals: 18
                }
              }
            ];
          } else if (chainHex === '0x61') {
            params = [
              {
                chainName: 'Binance Smart Chain',
                chainId: chainHex,
                rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
                blockExplorerUrls: [
                  'https://explorer.binance.org/smart-testnet'
                ]
              }
            ];
          }
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: params
          });
        } catch (addError) {
          console.error(addError);
        }
      } else if (error.code === -32002) {
        alert('Please check Metamask for pending request.');
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    // change chain manually
    if (dispatch) dispatch(changeNetwork(ChainName(chainHex)));
    alert(
      'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
    );
  }
};

export default ChangeChainRequest;
