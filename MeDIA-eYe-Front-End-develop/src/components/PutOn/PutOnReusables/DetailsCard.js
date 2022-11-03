import React, { useState, useEffect } from 'react';
import formatAdddress from '../../../utils/formatAdddress';
import {
  ChainName,
  ChainScanerLink
} from '../../../blockchain/functions/ChangeChain/ChainNames';
import './DetailsCard.scss';
import {
  Copy,
  Angle,
  Details,
  Properties,
  Levels,
  Stats,
  Twitter,
  Instagram,
  Globe,
  Creator,
  Description
} from '../../Icons/';
import { Link, useHistory } from 'react-router-dom';
import { NFTAttributes } from '../../ProductCard/ProductReusables/NFTAttributes';
import { MinterCard } from '../../ProductCard/ProductReusables';
export const DetailsCard = (props) => {
  const { nft, currentListing, listingNFT, mimetype, product } = props;
  const [copyWalletCreators, setCopyWalletCreators] = useState(false);
  const [copyWalletNFT, setCopyWalletNFT] = useState(false);
  const [aboutToggle, setaboutToggle] = useState(false);
  const [minter, setMinter] = useState(null);
  const [descriptionToggle, setDescriptionToggle] = useState(true);
  const [detailsToggle, setDetailsToggle] = useState(true);
  const [propertiesToggle, setPropertiesToggle] = useState(false);
  const [descriptionLimit, setDescriptionLimit] = useState(true);
  const [levelToggle, setLevelToggle] = useState(false);
  const [statsToggle, setStatsToggle] = useState(false);

  const history = useHistory();
  useEffect(() => {
    if (copyWalletNFT === true) {
      setTimeout(() => {
        setCopyWalletNFT(false);
      }, 3000);
    }
    if (copyWalletCreators === true) {
      setTimeout(() => {
        setCopyWalletCreators(false);
      }, 3000);
    }
  });
  const allowRare = 'SUPER';
  const proprtyData = [
    {
      title: 'COLLECTION',
      subTitle: 'Genesis',
      trait: '49% have this trait',
      rarity: '2% Rairity'
    },
    {
      title: 'STOCK COLOR',
      subTitle: 'SC-017',
      trait: '2% have this trait',
      rarity: '5% Rairity'
    },
    {
      title: 'FACTORY MODEL',
      subTitle: 'fuego',
      trait: '2% have this trait',
      rarity: '44% Rairity'
    },
    {
      title: 'CURRENT CLASS',
      subTitle: 'Rally',
      trait: '15% have this trait',
      rarity: '13% Rairity'
    },
    {
      title: 'CURRENT COLOR',
      subTitle: 'SC-017',
      trait: '2% have this trait',
      rarity: '55% Rairity'
    },
    {
      title: 'FACTORY CLASS',
      subTitle: 'rally',
      trait: '15% have this trait',
      rarity: '35% Rairity'
    }
  ];

  const limitTextContent = (text, limit, enable) => {
    if (text?.length > limit) {
      if (enable && text?.length > limit) {
        return (
          <>
            {text.substring(0, limit)}...{' '}
            <span
              onClick={() => setDescriptionLimit(false)}
              className="mediaeyeShowmore"
            >
              Show More
            </span>
          </>
        );
      } else {
        return (
          <>
            {text}...{' '}
            <span
              onClick={() => setDescriptionLimit(true)}
              className="mediaeyeShowmore"
            >
              Show Less
            </span>
          </>
        );
      }
    } else {
      return text;
    }
  };

  return (
    <>
      <div
        className={`product-page-inner-tabscard m-b-5 ${descriptionToggle ? 'active' : ''
          }`}
      >
        <div
          className="product-page-inner-tabscard-heading"
          onClick={() => {
            setDescriptionToggle(!descriptionToggle);
          }}
        >
          <span className="product-page-inner-tabscard-heading-icons">
            <Description />
          </span>{' '}
          Description
          <span className="product-page-inner-tabscard-heading-action">
            <Angle side="down" />
          </span>
        </div>
        {descriptionToggle ? (
          <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
            {nft ? (
              <div className="product-page-inner-content-creator mediaeyecreatedby withcreattorname">
                <div className="mediaeyecreatedby-heading">
                  <MinterCard address={nft} />
                </div>
                <div>
                  <span>Royalties:</span> <span>10%</span>
                </div>
              </div>
            ) : null}

            {nft?.description ? (
              <div className="product-page-inner-content-description">
                {limitTextContent(nft?.description, 300, descriptionLimit)}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        className={`product-page-inner-tabscard m-b-5 ${detailsToggle ? 'active' : ''
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
                    {ChainName(product?.attributes?.chainId)}
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Token Standart
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    {product?.attributes?.collectionType}
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Content Type
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    {product?.attributes?.fileType}
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
                        href={`${ChainScanerLink(
                          product?.attributes?.chainId
                        )}/address/${product?.attributes?.collectionAddress}`}
                      >
                        {formatAdddress(product?.attributes?.collectionAddress)}
                      </a>

                      <div className="mediaeye-copy-box">
                        <button
                          className="mediaeye-copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              product?.attributes?.collectionAddress
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
                      href={product?.attributes?.metadata}
                      target="_blank"
                      className="text-link text-link-underline"
                    >
                      {product?.attributes?.tokenId}
                    </a>
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Number of tokens created
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    {product?.attributes?.collectionType === 'ERC1155' ? (
                      <>{product?.attributes?.totalTokens}</>
                    ) : (
                      <>
                        {product?.attributes?.totalTokens
                          ? product?.attributes?.totalTokens
                          : 0}
                      </>
                    )}
                  </div>
                </div>

                <div className="mediaeyeproduct-details-row">
                  <div className="mediaeyeproduct-details-row-col">
                    Royalty Rate
                  </div>
                  <div className="mediaeyeproduct-details-row-col">
                    10%
                  </div>
                </div>
              </>
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={`product-page-inner-tabscard m-b-5 ${propertiesToggle ? 'active' : ''
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
          <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
            <NFTAttributes nft={product?.attributes} activeTab="Properties" />
          </div>
        ) : null}
      </div>
      <div
        className={`product-page-inner-tabscard m-b-5 ${levelToggle ? 'active' : ''
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
          <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
            <NFTAttributes nft={product?.attributes} activeTab="Levels" />
          </div>
        ) : null}
      </div>
      <div
        className={`product-page-inner-tabscard m-b-5 ${statsToggle ? 'active' : ''
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
          <span className="product-page-inner-tabscard-heading-action">
            <Angle side="down" />
          </span>
        </div>
        {statsToggle ? (
          <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
            <NFTAttributes nft={product?.attributes} activeTab="Stats" />
          </div>
        ) : null}
      </div>

      <div className="product-page-inner-content-row">
        <div
          className={`product-page-inner-tabscard ${aboutToggle ? 'active' : ''
            }`}
        >
          <div
            className="product-page-inner-tabscard-heading"
            onClick={() => {
              setaboutToggle(!aboutToggle);
            }}
          >
            <span className="product-page-inner-tabscard-heading-icons">
              <Creator />
            </span>
            About {'{ Collection Name}'}
            <span className="product-page-inner-tabscard-heading-action">
              <Angle side="down" />
            </span>
          </div>

          {aboutToggle ? (
            <div className="product-page-inner-tabscard-body product-page-inner-tabscard-body-withContent">
              <div className="product-page-inner-content-creatorabout">
                <div className="product-page-inner-content-creatorabout-headimage">
                  <img src={product?.attributes?.image} alt="product_img" />
                </div>
                <div className="product-page-inner-content-creatorabout-text">
                  {product?.attributes?.description}
                </div>
                <div className="product-page-inner-content-creatorabout-social">
                  <a className="product-page-inner-content-creatorabout-social-btn">
                    <Globe />
                  </a>
                  <a className="product-page-inner-content-creatorabout-social-btn">
                    <Twitter />
                  </a>
                  <a className="product-page-inner-content-creatorabout-social-btn">
                    <Instagram />
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DetailsCard;
