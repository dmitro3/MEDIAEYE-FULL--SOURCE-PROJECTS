import { TokenName, ZERO_ADDRESS } from '../Addresses';
import { ChainName } from '../ChangeChain/ChainNames';
import Web3 from 'web3';
import { convertPrice } from '../Utils';

/**
 *
 * @param Moralis
 * @param chain is the symbol of current chain
 * @returns {number} total volume traded in the last 24h
 */
export const queryAllTotalVolume = async (Moralis, chain) => {
  // enable web3 before executing functions
  // const web3 = new Web3(Moralis.provider);
  const Sale = Moralis.Object.extend('Sale');
  const query = new Moralis.Query(Sale);

  const end = new Date();
  const start = new Date(end.getTime() - 24 * 60 * 60 * 1000); // 24h ago from now

  query.greaterThan('createdAt', start);
  query.lessThan('createdAt', end);
  query.equalTo('chain', ChainName(chain));
  const sales = await query.find();

  // calculate total vol
  let totalVolume = 0;
  for (let i = 0; i < sales.length; i++) {
    const sale = sales[i];

    const paymentMethod = sale.get('paymentMethod');
    let soldPrice = sale.get('totalPrice');

    // convert currency if needed
    if (paymentMethod !== ZERO_ADDRESS) {
      const params = {
        chainId: chain,
        price: soldPrice,
        token: TokenName(paymentMethod.toLowerCase(), chain),
        native: true
      };
      soldPrice = await convertPrice(Moralis, params);
    }
    totalVolume += Number(soldPrice);
  }

  return String(totalVolume);
};
