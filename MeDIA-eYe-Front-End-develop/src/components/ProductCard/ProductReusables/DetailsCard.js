import React, { useState, useEffect } from 'react';
import moment from 'moment';
import formatAdddress from '../../../utils/formatAdddress';
import {
  ChainName,
  ChainScanerLink,
  ExplorerTokenURL
} from '../../../blockchain/functions/ChangeChain/ChainNames';
import { useHistory, Link } from 'react-router-dom';
import { NFTAttributes } from './NFTAttributes';
import { Copy, Angle, Details, Properties, Levels, Stats } from '../../Icons/';

export const DetailsCard = (props) => {
  const { nft, mimetype } = props;
  const [copyWalletSellers, setCopyWalletSellers] = useState(false);
  const [copyWalletCreators, setCopyWalletCreators] = useState(false);
  const [copyWalletNFT, setCopyWalletNFT] = useState(false);
  const [detailsToggle, setDetailsToggle] = useState(false);
  const [propertiesToggle, setPropertiesToggle] = useState(false);
  const [levelToggle, setLevelToggle] = useState(false);
  const [statsToggle, setStatsToggle] = useState(false);

  useEffect(() => {
    if (copyWalletNFT === true) {
      setTimeout(() => {
        setCopyWalletNFT(false);
      }, 3000);
    }
    if (copyWalletSellers === true) {
      setTimeout(() => {
        setCopyWalletSellers(false);
      }, 3000);
    }
  });

  return (
    <>
      <div
        className={`product-page-inner-tabscard m-b-15 ${
          detailsToggle ? 'active' : ''
        }`}
      >
        <div
          className="product-page-inner-tabscard-heading"
          onClick={() => {
            setDetailsToggle(!detailsToggle);
          }}
        >
          <span className="product-page-inner-tabscard-heading-icons">
            <Details />
          </span>{' '}
          Details
          <span className="product-page-inner-tabscard-heading-action">
            <Angle side="down" />
          </span>
        </div>
        {detailsToggle ? (
          <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
            <div className="medieyetabs-content-slide mediaeyeproduct-details">
              <>
                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Network Chain
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    {ChainName(nft?.chainId)}
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    NFT Token Type
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    {nft?.collectionType}
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Content Type
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    {nft?.fileType ? nft?.fileType : mimetype}
                  </div>
                </div>
                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Contract address
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    <div className="mediaeye-copy">
                      <a
                        target="_blank"
                        className="text-link text-link-underline"
                        href={`${ChainScanerLink(nft?.chainId)}/address/${
                          nft?.collectionAddress
                        }`}
                      >
                        {formatAdddress(nft?.collectionAddress)}
                      </a>
                      <div className="mediaeye-copy-box">
                        <button
                          className="mediaeye-copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              nft?.collectionAddress
                            );
                            setCopyWalletCreators(true);
                          }}
                        >
                          <Copy />
                        </button>
                        <div className="mediaeye-copy-box-msg">
                          {copyWalletCreators ? 'Copied!' : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Token ID
                  </div>
                  <div className="mediaeyeproduct-details-row-col text-info">
                    <a
                      href={ExplorerTokenURL(
                        nft?.chainId,
                        nft?.collectionAddress,
                        nft?.tokenId
                      )}
                      target="_blank"
                      className="text-link text-link-underline"
                    >
                      {nft?.tokenId}
                    </a>
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Number of tokens created
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    <>{nft?.totalTokens}</>
                  </div>
                </div>
                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Royalty Rate
                  </div>
                  <div className="mediaeyeproduct-details-row-col">10%</div>
                </div>
              </>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={`product-page-inner-tabscard m-b-15 ${
          propertiesToggle ? 'active' : ''
        }`}
      >
        <div
          className="product-page-inner-tabscard-heading"
          onClick={() => {
            setPropertiesToggle(!propertiesToggle);
          }}
        >
          <span className="product-page-inner-tabscard-heading-icons">
            <Properties type="view" />
          </span>{' '}
          Properties
          <span className="product-page-inner-tabscard-heading-action">
            <Angle side="down" />
          </span>
        </div>
        {propertiesToggle ? (
          <div className="product-page-inner-tabscard-body  product-page-inner-tabscard-body-withContent">
            <NFTAttributes nft={nft} activeTab="Properties" />
          </div>
        ) : null}
      </div>

      <div
        className={`product-page-inner-tabscard m-b-15 ${
          levelToggle ? 'active' : ''
        }`}
      >
        <div
          className="product-page-inner-tabscard-heading"
          onClick={() => {
            setLevelToggle(!levelToggle);
          }}
        >
          <span className="product-page-inner-tabscard-heading-icons">
            <Levels type="view" />
          </span>{' '}
          Levels
          <span className="product-page-inner-tabscard-heading-action">
            <Angle side="down" />
          </span>
        </div>
        {levelToggle ? (
          <div className="product-page-inner-tabscard-body  product-page-inner-tabscard-body-withContent">
            <NFTAttributes nft={nft} activeTab="Levels" />
          </div>
        ) : null}
      </div>

      <div
        className={`product-page-inner-tabscard m-b-15 ${
          statsToggle ? 'active' : ''
        }`}
      >
        <div
          className="product-page-inner-tabscard-heading"
          onClick={() => {
            setStatsToggle(!statsToggle);
          }}
        >
          <span className="product-page-inner-tabscard-heading-icons">
            <Stats type="view" />
          </span>{' '}
          Stats
          <span className="product-page-inner-tabscard-heading-action ">
            <Angle side="down" />
          </span>
        </div>
        {statsToggle ? (
          <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
            <NFTAttributes nft={nft} activeTab="Stats" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default DetailsCard;
