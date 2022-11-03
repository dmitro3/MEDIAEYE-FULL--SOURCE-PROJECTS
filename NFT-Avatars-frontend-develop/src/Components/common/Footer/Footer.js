import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Telegram, Medium, Discord } from "../../icons/";
import "./Footer.scss";

import MediaEYE_logo from "../../../assets/images/MediaEYE_logo.png";
import Metavatar_logo from "../../../assets/images/Metavatar_logo.png";

const Footer = () => {
  return (
    <footer className="mediaeyeAvatar-layout-footer">
      <div className="mediaeyeAvatar-layout-container">
        <div className="mediaeyeAvatar-layout-footer-content">
          <div className="mediaeyeAvatar-layout-footer-content-partLogo">
            <div className="mediaeyeAvatar-layout-footer-content-partLogo-logo">
              <img
                className="footer_logo"
                src={Metavatar_logo}
                alt="Metavatar_logo"
              />
            </div>
            {/* <div className="mediaeyeAvatar-layout-footer-content-partLogo-text">
                NFTs UNBOUND
              </div> */}
          </div>

          <div className="mediaeyeAvatar-layout-footer-content-partLink mediaeyeAvatar-layout-footer-content-secondary">
            <div className="mediaeyeAvatar-layout-footer-content-partLink-col">
              <div className="mediaeyeAvatar-layout-footer-content-heading">
                AVASPACE
              </div>

              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Events
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Airdrops & Bounties
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Collections
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Charities
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                aVaChat
              </Link>
            </div>
            <div className="mediaeyeAvatar-layout-footer-content-partLink-col mediaeyeAvatar-layout-footer-content-secondarylink">
              <div className="mediaeyeAvatar-layout-footer-content-heading"></div>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                aVaMarketplace
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                aVaCreator
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                aVaLibraries
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                aVaVerify
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Rewards
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Earn
              </Link>
            </div>

            <div className="mediaeyeAvatar-layout-footer-content-partLink-col mediaeyeAvatar-layout-footer-content-secondarylink">
              <div className="mediaeyeAvatar-layout-footer-content-heading"></div>
              <Link
                to={`/connect-wallet`}
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Litepaper
              </Link>
              <Link
                to="#"
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                User Guide
              </Link>
              <Link
                to={`/connect-wallet`}
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Support
              </Link>
              <Link
                to={`/connect-wallet`}
                className="mediaeyeAvatar-layout-footer-content-link"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="mediaeyeAvatar-layout-footer-content-partJoin">
            <div className="mediaeyeAvatar-layout-footer-content-heading">
              Join the Community
            </div>
            <div className="mediaeyeAvatar-layout-footer-content-social">
              <a
                href="https://t.me/mediaeyeAvatarNFTPortal"
                target="_blank"
                rel="noreferrer"
                title="Telegram"
                className="mediaeyeAvatar-layout-footer-content-social-btn"
              >
                <Telegram />
              </a>
              <a
                href="https://twitter.com/mediaeyeAvatarNFT"
                target="_blank"
                rel="noreferrer"
                title="Twitter"
                className="mediaeyeAvatar-layout-footer-content-social-btn"
              >
                <Twitter />
              </a>

              <a
                href="https://discord.com/invite/XHpfUdqJK7"
                target="_blank"
                rel="noreferrer"
                title="Discord"
                className="mediaeyeAvatar-layout-footer-content-social-btn"
              >
                <Discord />
              </a>

              <a
                href="https://www.instagram.com/mediaeyeAvatarnfts/"
                target="_blank"
                rel="noreferrer"
                title="Instagram"
                className="mediaeyeAvatar-layout-footer-content-social-btn"
              >
                <Instagram />
              </a>

              <a
                href="https://medium.com/@mediaeyeAvatarNFT"
                target="_blank"
                rel="noreferrer"
                title="Medium"
                className="mediaeyeAvatar-layout-footer-content-social-btn"
              >
                <Medium />
              </a>
            </div>
            <div className="mediaeyeAvatar-layout-footer-content-subscription">
              <div className="mediaeyeAvatar-layout-footer-content-heading">
                Get the latest METAVATAR updates
              </div>
              <form id="mediaeyeAvatar-footer-newsletter">
                <div className="mediaeyeAvatarform-group">
                  <label className="mediaeyeAvatarform-group-input">
                    <input
                      className="mediaeyeAvatarform-input mediaeyeAvatarform-input-round"
                      type="email"
                      placeholder="Your Email"
                      name="email"
                    />

                    <div className="mediaeyeAvatarform-group-input-addon">
                      <button type="submit" className="btn btn-transperant">
                        SUBSCRIBE
                      </button>
                    </div>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="mediaeyeAvatar-layout-footer-bottom">
          <div className="mediaeyeAvatar-layout-footer-bottom-left">
            <div className="mediaeyeAvatar-layout-footer-bottom-text">
              METAVATAR © 2022
            </div>
          </div>
          <div className="mediaeyeAvatar-layout-footer-bottom-right">
            <a
              href="https://solidity.finance/audits/mediaeyeAvatar/"
              target="_blank"
              rel="noreferrer"
              className="mediaeyeAvatar-layout-footer-bottom-text"
            >
              powered by <img src={MediaEYE_logo} alt="" className="SFLogo" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
