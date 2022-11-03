import React, { useState } from 'react';
import './AirdropWinnersPopup.scss';
// import UserAvatar from '../../../assets/img/collect-user-1.png';
import { Copy } from '../../Icons/';
import formatAdddress from '../../../utils/formatAdddress';

export default function AirdropWinnersPopup(props) {
  const { product } = props;
  const [copyWalletCreators, setCopyWalletCreators] = useState();
  const { toggleAirdropWinersPopup, windersPopup } = props;

  const winnersList = [
    {
      id: '1',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '2',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '3',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '4',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '5',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '6',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '7',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '8',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '9',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '10',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '11',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '12',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '13',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '14',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '15',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '16',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '17',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '18',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '19',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '20',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    },
    {
      id: '21',
      userAvatar: '../../img/collect-user-1.png',
      userName: '@Mickey_Mouse',
      walletAddres: '1c2e1154899776546f13d'
    }
  ];

  const copyAddress = (index) => {
    alert(index);
  };

  return (
    <>
      {windersPopup ? (
        <div
          className={
            windersPopup
              ? 'mediaeye-popup mediaeye-popup-sm active'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => props.toggleAirdropWinersPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-winners-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Winners
                  </div>
                </div>
                <div className="airdrop-winners-popup-list">
                  {winnersList.map((data, i) => (
                    <div className="airdrop-winners-popup-list-row">
                      <div className="airdrop-winners-popup-list-row-col">
                        <img
                          src={data.userAvatar}
                          className="user-avatar"
                          alt="avatar"
                        />
                        <a href="/somelink">{data.userName}</a>
                      </div>
                      <div className="airdrop-winners-popup-list-row-col">
                        <div className="mediaeye-copy">
                          <div className="airdrop-winners-popup-list-row-col-user">
                            {formatAdddress(data.walletAddres)}
                          </div>
                          <div className="mediaeye-copy-box">
                            <button
                              className="mediaeye-copy-btn"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  // product?.attributes?.minter
                                  data.walletAddres
                                );
                                setCopyWalletCreators(i);
                              }}
                            >
                              <Copy />
                            </button>
                            <div className="mediaeye-copy-box-msg">
                              {copyWalletCreators === i ? 'Copied!' : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-lg btn-main"
                    onClick={() => {
                      toggleAirdropWinersPopup();
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
