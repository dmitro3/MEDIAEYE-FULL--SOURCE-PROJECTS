import underscore from 'underscore';
import { SDK, BLOCKCHAIN_NAME } from 'rubic-sdk';
import React, { useEffect, useState } from 'react';

export const CalculateadvanceTrade = async (tokenitemone, tokenitemtwo, networkitemone, networkitemtwo, amount, userethAddress) => {
          console.log(tokenitemone, 'tokenitemone');
          console.log(tokenitemtwo, 'tokenitemtwo');
          console.log(networkitemone, 'networkitemone');
          console.log(networkitemtwo, 'networkitemtwo');
          console.log(amount, 'amount');
          console.log(userethAddress, 'userethAddress');


          let msg;
          try {
                    const configuration = {
                              rpcProviders: {
                                        [BLOCKCHAIN_NAME.ETHEREUM]: {
                                                  mainRpc: 'https://rpc.ankr.com/eth'
                                        },
                                        [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
                                                  mainRpc: 'https://rpc.ankr.com/bsc'
                                        },
                                        [BLOCKCHAIN_NAME.POLYGON]: {
                                                  mainRpc: 'https://rpc.ankr.com/polygon'
                                        },
                                        [BLOCKCHAIN_NAME.AVALANCHE]: {
                                                  mainRpc: 'https://rpc.ankr.com/avalanche'
                                        },
                                        [BLOCKCHAIN_NAME.FANTOM]: {
                                                  mainRpc: 'https://rpc.ankr.com/fantom'
                                        },
                                        [BLOCKCHAIN_NAME.MOONRIVER]: {
                                                  mainRpc: 'https://rpc.ankr.com/moonbeam'
                                        },
                                        [BLOCKCHAIN_NAME.HARMONY]: {
                                                  mainRpc: 'https://rpc.ankr.com/harmony'
                                        },
                                        [BLOCKCHAIN_NAME.ARBITRUM]: {
                                                  mainRpc: 'https://rpc.ankr.com/arbitrum'
                                        },
                                        [BLOCKCHAIN_NAME.AURORA]: {
                                                  mainRpc: 'https://mainnet.aurora.dev'
                                        },
                                        [BLOCKCHAIN_NAME.TELOS]: {
                                                  mainRpc: 'https://mainnet.telos.net/evm'
                                        },
                                        [BLOCKCHAIN_NAME.CELO]: {
                                                  mainRpc: 'https://rpc.ankr.com/celo'
                                        },
                                        [BLOCKCHAIN_NAME.FUSE]: {
                                                  mainRpc: 'https://rpc.fuse.io'
                                        },
                                        [BLOCKCHAIN_NAME.GNOSIS]: {
                                                  mainRpc: 'https://rpc.ankr.com/gnosis'
                                        },
                                        [BLOCKCHAIN_NAME.OKE_X_CHAIN]: {
                                                  mainRpc: 'https://exchainrpc.okex.org'
                                        },
                                        [BLOCKCHAIN_NAME.CRONOS]: {
                                                  mainRpc: 'https://evm.cronos.org'
                                        },
                                        [BLOCKCHAIN_NAME.OPTIMISM]: {
                                                  mainRpc: 'https://rpc.ankr.com/optimism'
                                        }
                              },
                              providerAddress: userethAddress
                    };
                    const sdk = await SDK.createSDK(configuration);

                    let trades;
                    let TradeType = 0;
                    const blockchainone = networkitemone.blockchain;
                    const fromTokenAddress = tokenitemone.address;
                    const toTokenAddress = tokenitemtwo.address;
                    const blockchaintwo = networkitemtwo.blockchain;
                    console.log(blockchainone, 'blockchainone');
                    console.log(fromTokenAddress, 'fromTokenAddress');
                    console.log(amount, 'amount');
                    console.log(toTokenAddress, 'toTokenAddresstoTokenAddress');
                    if (networkitemone.name === networkitemtwo.name) {
                              console.log("inside same network");
                              TradeType = 0;
                              try {
                                        trades = await sdk.instantTrades.calculateTrade(
                                                  { blockchain: blockchainone, address: fromTokenAddress },
                                                  amount,
                                                  toTokenAddress
                                        );
                                        console.log("getting trades", trades);
                              } catch (e) {
                                        console.log(e, 'getting trades err');
                              }
                    }
                    else {
                              TradeType = 1;
                              trades = await sdk.crossChain.calculateTrade(
                                        { blockchain: blockchainone, address: fromTokenAddress },
                                        amount,
                                        { blockchain: blockchaintwo, address: toTokenAddress },
                                        {
                                                  gasCalculation: 'enabled',
                                                  fromAddress: userethAddress
                                        }
                              );
                    };
                    console.log("final move to trades")
                    if (trades.length > 0) {
                              console.log(trades, 'trades');
                              let a = advancetradecalculate(trades, TradeType);
                              if (a.status == 2) {
                                        return a;
                              }
                              if (a.status == 1) {
                                        if (TradeType == 0) {
                                                  let newarr = a.newarr
                                                  let aa = underscore.min(newarr, function (o) { return o.gasfee; });
                                                  let index = underscore.findIndex(newarr, aa);
                                                  if (index != 0) {
                                                            let element = newarr[index];
                                                            newarr.splice(index, 1);
                                                            newarr.splice(0, 0, element);
                                                  }
                                                  a.newarr = newarr;
                                                  return a;
                                                  // let dataarr = a.abc;
                                                  // let aa = underscore.min(dataarr, function (o) { return o.gasfee; });
                                                  // let index = underscore.findIndex(dataarr, aa);
                                                  // if (index != 0) {
                                                  //           let element = dataarr[index];
                                                  //           dataarr.splice(index, 1);
                                                  //           dataarr.splice(0, 0, element);
                                                  // }
                                                  // a.abc = dataarr;
                                                  // return a;
                                        } else {
                                                  let dataarr = a.abc;
                                                  let aa = underscore.min(dataarr, function (o) { return o.amount; });
                                                  let index = underscore.findIndex(dataarr, aa);
                                                  if (index != 0) {
                                                            let element = dataarr[index];
                                                            dataarr.splice(index, 1);
                                                            dataarr.splice(0, 0, element);
                                                  }
                                                  a.abc = dataarr;
                                                  return a;
                                        }
                              }
                    }
                    else {
                              msg = "Trading Not available"
                              let status = 0;
                              return { msg, status };
                    };
          }
          catch (e) {
                    console.log(e, 'e')
                    msg = "Trading Not available"
                    let status = 0;
                    return { msg, status };
          };
};
const advancetradecalculate = (trades, TradeType) => {
          console.log(trades, 'trades')
          let tradeflag = 0;
          let crossChainMinAmountflag = 0;
          let mingasflag = 0
          let status = 2;
          let crossChainMinAmount, crossChainMinCoin, msg, minGasValue, minGasName;
          let abc = [];
          let cba = [];
          trades.map((trade, index) => {
                    let data = {};
                    if (!trade.error) {
                              if (TradeType == 0) {
                                        tradeflag = 1;
                                        let name = trade.constructor.name.toString();
                                        data.name = name;
                                        if (trade.gasFeeInfo) {
                                                  let gasfee = trade.gasFeeInfo.gasFeeInUsd.toFormat(2);
                                                  gasfee = parseFloat(gasfee);
                                                  data.gasfee = gasfee;
                                                  if (mingasflag == 0) {
                                                            minGasValue = gasfee;
                                                            minGasName = name;
                                                            mingasflag = 1;
                                                  }
                                                  if (minGasValue > gasfee) {
                                                            minGasValue = gasfee;
                                                            minGasName = name;
                                                  }

                                        };
                                        let amount = trade.to.tokenAmount.toFormat(5);
                                        data.amount = parseFloat(amount.replace(/,/g, ''));

                              } else {
                                        tradeflag = 1;
                                        data.name = trade.tradeType.toString();
                                        let amount = trade.trade.to.tokenAmount.toFormat(5);
                                        data.amount = parseFloat(amount.replace(/,/g, ''));
                              }
                    }

                    else {
                              if (tradeflag == 0) {
                                        let a = trade.error.toString();
                                        if (a.includes('Min amount')) {
                                                  let words = a.split(' ');
                                                  let minamount = words[4];
                                                  minamount = parseFloat(minamount);
                                                  minamount = minamount.toFixed(2);
                                                  if (crossChainMinAmountflag == 0) {
                                                            crossChainMinAmount = minamount;
                                                            crossChainMinCoin = words[5];
                                                            crossChainMinAmountflag = 1;
                                                  } else if (crossChainMinAmount > minamount) {
                                                            crossChainMinAmount = minamount;
                                                            crossChainMinCoin = words[5];
                                                  }
                                                  msg = `Minimun amount required for this trade ${crossChainMinAmount} ${crossChainMinCoin}`;
                                        }
                              }
                    };
                    if (!underscore.isEmpty(data)) {
                              abc = [...abc, data];
                              cba = [...cba, trade];

                    }
          });
          if (msg && abc.length == 0) {
                    return { msg, status };
          }
          else if (abc.length > 0 && !msg) {
                    status = 1;
                    var newarr = [];
                    abc.filter(element => {
                              newarr.push(element);
                    });
                    return { newarr, abc, status, minGasValue, minGasName, cba };
          };
};
