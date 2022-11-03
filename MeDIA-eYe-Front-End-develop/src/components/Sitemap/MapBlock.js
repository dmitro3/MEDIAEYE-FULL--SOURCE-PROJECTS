import React from 'react';
import { Link } from 'react-router-dom';
import { useMoralis } from 'react-moralis';

const MapBlock = () => {
  const { user, Moralis } = useMoralis();
  return (
    <section className="mediaeye-layout-section withspacebottom">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-MapBlock">
          <div className="mediaeye-MapBlock-backBox"></div>
          <h2 className="mediaeye-MapBlock-header">sitemap</h2>
          <div className="mediaeye-MapBlock-content">
            <div className="mediaeye-MapBlock-content-row1">
              <div className="mediaeye-MapBlock-content-row">
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <a
                      href="https://metadeck.mediaeyenft.com/"
                      className="btn-sitemap"
                    >
                      MetaDeck
                    </a>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/hub" className="btn-sitemap">
                      MetaHub
                    </Link>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/metaverse-landing" className="btn-sitemap">
                      MetaVerse Landing
                    </Link>
                  </li>
                </ul>
              </div>
              <Link to="/" className="mediaeye-MapBlock-backBox-button"></Link>
              <div className="mediaeye-MapBlock-content-row">
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/watchlist" className="btn-sitemap">
                      My Watchlist
                    </Link>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/feature-nft" className="btn-sitemap">
                      Spotlight
                    </Link>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/cohort" className="btn-sitemap">
                      Earn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mediaeye-MapBlock-content-row1 sec">
              <div className="mediaeye-MapBlock-content-row flexBox">
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/airdrops" className="btn-sitemap">
                      Airdrop
                    </Link>
                  </li>
                  <li>
                    <ul className="mediaeye-MapBlock-content-column-content">
                      <li className="btn-wrapper green">
                        <Link to="/airdrops" className="btn-sitemap green">
                          Airdrops
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/airdrop/launch"
                          className="btn-sitemap green"
                        >
                          Create Airdrop
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mediaeye-MapBlock-content-row center">
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/event" className="btn-sitemap">
                      Events
                    </Link>
                  </li>
                  <li>
                    <ul className="mediaeye-MapBlock-content-column-content">
                      <li className="btn-wrapper green">
                        <Link to="/event" className="btn-sitemap green">
                          Events
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link to="/event/launch" className="btn-sitemap green">
                          Create Event
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mediaeye-MapBlock-content-row">
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/charity-place" className="btn-sitemap">
                      Charity Place
                    </Link>
                  </li>
                  <li>
                    <ul className="mediaeye-MapBlock-content-column-content">
                      <li className="btn-wrapper green">
                        <Link to="/charity-place" className="btn-sitemap green">
                          Charities
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/charity/register"
                          className="btn-sitemap green"
                        >
                          Register
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mediaeye-MapBlock-content-row1">
              <div className="mediaeye-MapBlock-content-row">
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/about" className="btn-sitemap">
                      About
                    </Link>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/collections" className="btn-sitemap">
                      Collections
                    </Link>
                  </li>
                  <li>
                    <ul className="mediaeye-MapBlock-content-column-content">
                      <li className="btn-wrapper green">
                        <Link to="/collections" className="btn-sitemap green">
                          Collections
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column Martop">
                  <li className="btn-wrapper">
                    <Link to="/profile" className="btn-sitemap">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <ul className="mediaeye-MapBlock-content-column-content">
                      <li className="btn-wrapper green">
                        <Link
                          to="/profile/payment/methods"
                          className="btn-sitemap green"
                        >
                          Payment Methods
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/profile/eyeswap"
                          className="btn-sitemap green"
                        >
                          eYeSwap
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/profile/subscription"
                          className="btn-sitemap green"
                        >
                          Subscription
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/profile/support"
                          className="btn-sitemap green"
                        >
                          Support
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mediaeye-MapBlock-content-row center">
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/create" className="btn-sitemap">
                      MetaGate
                    </Link>
                  </li>
                  <li>
                    <ul className="mediaeye-MapBlock-content-column-content">
                      <li className="btn-wrapper green">
                        <Link
                          to="/connect-wallet"
                          className="btn-sitemap green"
                        >
                          Connect Wallet
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link to="/create/mint" className="btn-sitemap green">
                          Mint NFT
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/create/generative/collection"
                          className="btn-sitemap green"
                        >
                          Gen. Collection
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/create/collection"
                          className="btn-sitemap green"
                        >
                          Mint Collection
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/create/jumbomint"
                          className="btn-sitemap green"
                        >
                          Group Collection
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to="/create/jumbomint"
                          className="btn-sitemap green"
                        >
                          Jumbo Mint
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link to="/feature-nft" className="btn-sitemap green">
                          SPOTLIGHT
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link to="/event" className="btn-sitemap green">
                          EVENT
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link to="/airdrops" className="btn-sitemap green">
                          AIRDROP
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link to="/charity-place" className="btn-sitemap green">
                          CHARITY
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link to="#" className="btn-sitemap green">
                          METAVATAR
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="mediaeye-MapBlock-content-row">
                <ul className="mediaeye-MapBlock-content-column Martop">
                  <li className="btn-wrapper">
                    <Link
                      to={`/account/${user?.attributes?.ethAddress}`}
                      className="btn-sitemap"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <ul className="mediaeye-MapBlock-content-column-content">
                      <li className="btn-wrapper green">
                        <Link
                          to={`/account/${user?.attributes?.ethAddress}/nfts`}
                          className="btn-sitemap green"
                        >
                          NFT’s
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to={`/account/${user?.attributes?.ethAddress}/listings`}
                          className="btn-sitemap green"
                        >
                          Listings
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to={`/account/${user?.attributes?.ethAddress}/collections`}
                          className="btn-sitemap green"
                        >
                          Collections
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to={`/account/${user?.attributes?.ethAddress}/favorites`}
                          className="btn-sitemap green"
                        >
                          Favorites
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to={`/account/${user?.attributes?.ethAddress}/activity`}
                          className="btn-sitemap green"
                        >
                          Activities
                        </Link>
                      </li>
                      <li className="btn-wrapper green">
                        <Link
                          to={`/account/${user?.attributes?.ethAddress}/marketing`}
                          className="btn-sitemap green"
                        >
                          Marketing
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/nft-marketplace" className="btn-sitemap">
                      Marketplace
                    </Link>
                  </li>
                </ul>
                <ul className="mediaeye-MapBlock-content-column">
                  <li className="btn-wrapper">
                    <Link to="/rewards-pool" className="btn-sitemap">
                      Rewards Pool
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapBlock;
