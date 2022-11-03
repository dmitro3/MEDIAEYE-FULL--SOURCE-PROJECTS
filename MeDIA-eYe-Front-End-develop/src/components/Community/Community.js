import React from 'react';
import { useHistory } from 'react-router-dom';
import TelegramBoxIcon from '../Icons/TelegramBoxIcon';
import TwitterBoxIcon from '../Icons/TwitterBoxIcon';
import MediumBoxIcon from '../Icons/MediumBoxIcon';
import DiscordIconBox from '../Icons/DiscordIconBox';
import './Community.scss';

const Community = () => {
  const history = useHistory();
  return (
    <section className="mediaeye-layout-section withspace">
      <div className="mediaeye-layout-container">
        <div className="mediaeye-layout-container-community">
          <h2 className="mediaeye-layout-container-community-title">
            join our <span>community</span>
          </h2>
          <div className="mediaeye-layout-container-community-flexbox">
            <a
              href="https://t.me/MEDIAEYENFTPortal"
              target="_blank"
              rel="noreferrer"
            >
              <TelegramBoxIcon />
            </a>
            <a
              href="https://twitter.com/MeDIAeYeNFT"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterBoxIcon />
            </a>
            <a
              href="https://discord.com/invite/XHpfUdqJK7"
              target="_blank"
              rel="noreferrer"
            >
              <DiscordIconBox />
            </a>
            <a
              href="https://medium.com/@MeDIAeYeNFT"
              target="_blank"
              rel="noreferrer"
            >
              <MediumBoxIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
