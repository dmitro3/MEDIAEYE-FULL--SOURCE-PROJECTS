import React from 'react';
import { useSelector } from 'react-redux';
import { Moralis } from 'moralis';
import { TokenName } from '../../../blockchain/functions/Addresses';
import { Link, useLocation } from 'react-router-dom';
import formatAdddress from '../../../utils/formatAdddress';
import { GetNetworkIcon } from '../../../blockchain/functions/Utils';
import { TokenDecimal } from '../../../blockchain/functions/Addresses/TokenDecimals';
import { roundString } from '../../../blockchain/functions/Utils';

export const ListingsCard = (props) => {
  const location = useLocation();
  const { listings, setCurrentListingView, nft, listingNFT, handleBuyNow } =
    props;
  const theme = useSelector((state) => state.app.darkTheme);

  const loadListing = () => {
    if (!listings) return;

    return listings.map((listing, i) => {
      const priceType = TokenName(
        listing.attributes.listingPayments[0][0].toLowerCase(),
        nft.chainId
      );
      const price =
        roundString(listing.attributes.listingPayments[0][1] /
        Math.pow(10, TokenDecimal(priceType)), 4);
      const qty = listingNFT?.attributes?.amount;
      const seller = listing.attributes.seller;
      return (
        <tbody>
          <tr>
            <td>
              <div className="product-page-inner-tabscard-price">
                <img
                  src={GetNetworkIcon(priceType)}
                  alt={priceType}
                  className="product-page-inner-content-info-blockchain-icon"
                />
                <strong>{price}</strong>&nbsp;{priceType}
              </div>
            </td>
            <td className="text-center">-</td>
            <td className="text-center">{qty}</td>
            <td>
              <Link to={`/account/${seller}`} className="text-link">
                {formatAdddress(seller)}
              </Link>
            </td>
            <td className="text-right">
              <button
                type="button"
                className="btn btn-sm btn-transperant"
                value={i}
                onClick={(e) => {
                  changeListing(e.target.value);
                  handleBuyNow();
                }}
              >
                Buy
              </button>
            </td>
          </tr>
        </tbody>
      );
    });
  };

  const changeListing = (i) => {
    setCurrentListingView(listings[i], i);
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Unit Price</th>
            <th>USD Unit Price</th>
            <th>Qty</th>
            <th colSpan={2}>From</th>
          </tr>
        </thead>
        {loadListing()}
      </table>
    </>
  );
};

export default ListingsCard;
