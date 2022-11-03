import axios from 'axios';
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

export const geteyeswaptokens = function (tokenname, balancesdata, nativeBalance, networksym) {
  return new Promise(async (resolve, reject) => {
    console.log("huisdfiuadiuh")
    let eyeswapAPi = process.env.REACT_APP_EYESWAP_GETTOKENS;
    let data = {
      tokenname: tokenname,
      balancesdata: balancesdata,
      nativeBalance: nativeBalance,
      networksym: networksym
    };
    let config = {
      method: 'post',
      url: eyeswapAPi,
      data: data
    };

    axios(config).then(function (response) {
      console.log(response.data, 'response.data');
      if (response.data.code === 200) {
        resolve(response.data);
      } else {
        resolve();
      }
    }).catch(function (error) {
      console.log(error, 'error');
      resolve();
    });
  });
};

export const gettokenbalances = function () {
  return new Promise(async (resolve, reject) => {

    //Replace with your API Key
    const apiKey = "Nv5wEDNIkFcmbNw-dX-7GlYn77O8QcCB";

    // Initialize an alchemy-web3 instance:
    const web3 = createAlchemyWeb3(
      `https://eth-mainnet.alchemyapi.io/v2/${apiKey}`,
    );

    //Feel free to switch this wallet address with another address
    const ownerAddress = "0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6";


    //The below token contract address corresponds to USDT
    const tokenContractAddresses = ["0xe9e7cea3dedca5984780bafc599bd69add087d56"];

    const data = await web3.alchemy.getTokenBalances(ownerAddress, tokenContractAddresses);

    console.log("Token balance for Address");
    console.log(data);
    /*
** Fetching the metadata for the token with Alchemy's getTokenMetadata API
*/
    const metadata = await web3.alchemy.getTokenMetadata(
      tokenContractAddresses[0]
    );

    //Forming the name of the token that comprises of the Name and the Symbol of the token
    const tokenName = metadata.name + "(" + metadata.symbol + ")";

    /* Calculating the tokenBalance in decimal. The "decimals" field in the token metadata on line 21 tells us 
    how many digits at the end of the tokenBalance in Line 17 are to the right of the decimal. 
    so we divide the Full tokenBalance with 10 to the power of the decimal value of the token
    */
    const tokenBalance = data["tokenBalances"][0]["tokenBalance"] / Math.pow(10, metadata.decimals)
    console.log("Token balance for", tokenName, "is", tokenBalance);

    // Replace with your Alchemy API key:
    // const apiKey = "Nv5wEDNIkFcmbNw-dX-7GlYn77O8QcCB";
    // const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
    // // Replace with the wallet address you want to query:
    // const ownerAddr = "0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6";
    // // Replace with the token contract address you want to query:
    // const tokenAddr = "0x9a257c90fa239fba07771ef7da2d554d148c2e89";

    // let data = JSON.stringify({
    //   "jsonrpc": "2.0",
    //   "method": "alchemy_getTokenBalances",
    //   "params": [
    //     `${ownerAddr}`,
    //     [
    //       `${tokenAddr}`
    //     ]
    //   ],
    //   "id": 42
    // });

    // let config = {
    //   method: 'post',
    //   url: baseURL,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log(response, 'response')
    //   })
    //   .catch(function (error) {
    //     console.log(error, 'errorerror');
    //   });
  });
};
