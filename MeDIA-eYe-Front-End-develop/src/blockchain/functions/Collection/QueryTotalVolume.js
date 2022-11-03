import { TokenName, ZERO_ADDRESS } from '../Addresses';
import { ChainName } from '../ChangeChain/ChainNames';
import Web3 from 'web3';
import { convertPrice } from '../Utils';

export const queryTotalVolume = async (Moralis, collectionAddress, chain) => {
  // enable web3 before executing functions
  // const web3 = new Web3(Moralis.provider);

  const Sale = Moralis.Object.extend('Sale');
  const query = new Moralis.Query(Sale);
  query.equalTo('collectionAddress', collectionAddress);
  query.equalTo('chain', ChainName(chain));
  query.include('listing');
  const sales = await query.find();

  // calculate total trade volume
  let totalVolume = 0;
  for (let i = 0; i < sales.length; i++) {
    const sale = sales[i];

    // check listing pointer to see if single, if yes then add to
    const listing = sale.get('listing');

    if (listing) {
      if (listing.get('size') === 'single') {
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
    }
  }

  return String(totalVolume);
};
