export const CalculateTrade = (trades, tradeType) => {
  let minigasflag = 0;
  let sucessflag = 0;
  let errmsg;
  let crossChainMinAmountflag = 0;
  let minGasValue,
    minGasObject,
    minGasAmount,
    crossChainMinAmount,
    crossChainMinCoin;
  Object.entries(trades).forEach(([tradetype, trade]) => {
    if (!trade.error) {
      if (tradeType == 1) {
        console.log(trade, 'tradetrade crosschain');
        let amount = trade.trade.to.tokenAmount.toFormat(5);
        minGasObject = trade.trade;
        minGasAmount = amount;
        sucessflag = 1;
      } else {
        console.log(trade, 'tradetrade instant');
        let amount = trade.to.tokenAmount.toFormat(5);
        let gasfee = trade.gasFeeInfo.gasFeeInUsd.toFormat(2);
        if (minigasflag == 0) {
          minGasValue = gasfee;
          minGasObject = trade;
          minGasAmount = amount;
          minigasflag = 1;
        }
        if (minGasValue < gasfee) {
          minGasValue = gasfee;
          minGasObject = trade;
          minGasAmount = amount;
        }
        sucessflag = 1;
      }
    } else {
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
        errmsg = `Minimun amount required for this trade ${crossChainMinAmount} ${crossChainMinCoin}`;
      } else {
        errmsg = 'Unable to trade right now !!';
      }
    }
  });
  let data = {
    minigasflag: minigasflag,
    sucessflag: sucessflag,
    errmsg: errmsg,
    crossChainMinAmountflag: crossChainMinAmountflag,
    minGasValue: minGasValue,
    minGasObject: minGasObject,
    minGasAmount: minGasAmount,
    crossChainMinAmount: crossChainMinAmount,
    crossChainMinCoin: crossChainMinCoin
  };
  console.log(data, 'data');
  return data;
};
