import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import {
  ChainHexString,
  ChangeChainRequest
} from '../../../blockchain/functions/ChangeChain';
import { ethers } from 'ethers';
import formatAdddress from '../../../utils/formatAdddress';
import { roundString } from '../../../blockchain/functions/Utils';
import {
  checkAllowance,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import { ContractAddress } from '../../../blockchain/functions/Addresses';
import './Launch.scss';
import TokenList from '../../Modals/AirdropTokenListPopup/TokenList';
import { Close } from '../../Icons';

const SelectTokenAddress = (props) => {
  const {
    activeNetwork,
    participantAllocation,
    totalAllocation,
    selectedToken,
    setParticipantAllocation,
    setSelectedToken,
    setTotalAllocation,
    errorCreateAirdrop,
    airdropLocked
  } = props;
  const MoralisWeb3Api = useMoralisWeb3Api();
  const { Moralis, user } = useMoralis();

  const [isTokenApproved, setTokenApproved] = useState(false);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [walletLoading, setWalletLoading] = useState(false);

  const getUserTokens = async () => {
    setWalletLoading(true);
    const balances = await MoralisWeb3Api.account.getTokenBalances({
      chain: ChainHexString(activeNetwork)
    });
    setOwnedTokens(balances);
    setWalletLoading(false);
  };

  const handleTotalAllocation = async (e) => {
    const allocationWei = ethers.utils.parseEther(e.target.value);
    await setTotalAllocation(allocationWei);
    checkTotalAllocation(allocationWei);
  };

  const checkTotalAllocation = async (allocationWei) => {
    if (selectedToken) {
      setTokenApproved(
        await checkAllowance(
          Moralis,
          selectedToken?.symbol?.toUpperCase(),
          user?.attributes?.ethAddress,
          allocationWei,
          ContractAddress('AIRDROP', ChainHexString(activeNetwork)),
          selectedToken?.token_address
        )
      );
    }
  };

  const handleParticipantAllocation = async (e) => {
    const allocationWei = ethers.utils.parseEther(e.target.value);
    setParticipantAllocation(allocationWei);
  };

  const handleApprove = async () => {
    // switch to correct chain before requesting approval
    if ((await Moralis.chainId) !== ChainHexString(activeNetwork)) {
      ChangeChainRequest(activeNetwork);
      return;
    }

    setTokenApproved(
      await requestTokenApproval(
        Moralis,
        selectedToken?.token_address,
        ContractAddress('AIRDROP', ChainHexString(activeNetwork))
      )
    );
  };

  useEffect(() => {
    if (activeNetwork) {
      getUserTokens();
    }
  }, [activeNetwork]);

  useEffect(() => {
    if (selectedToken && activeNetwork) {
      setTotalAllocation(0);
      setParticipantAllocation(0);
      checkTotalAllocation(totalAllocation);
    }
  }, [activeNetwork, selectedToken]);

  const [showPopupToken, setShowPopupToken] = useState(false);

  const togglePopupTokenList = () => {
    setShowPopupToken(!showPopupToken);
  };

  return (
    <>
      <TokenList
        showPopup={showPopupToken}
        togglePopupTokenList={togglePopupTokenList}
        ownedTokens={ownedTokens}
      />

      <div className="launch-airdrop-page-inner-content-box-1-inside">
        <div
          className={`launch-airdrop-page-inner-content-box-1-inside-bountbox ${
            airdropLocked == 'Unlocked' ? 'unlocked-size' : null
          }`}
        >
          <h6 className="mediaeyeform-label">Bounty Token and Amount</h6>
          <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token">
            <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list">
              <label className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-title">
                {airdropLocked == 'Unlocked'
                  ? 'You can select up to 10 tokens'
                  : 'Select a Token'}
              </label>
              <button
                className="btn btn-creative"
                onClick={togglePopupTokenList}
              >
                TOKEN LIST
              </button>
              {/* <button
              onClick={getUserTokens}
              className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-select"
            >
              {walletLoading ? 'Refreshing ...' : 'Refresh Wallet'}
            </button> */}
            </div>
            <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items">
              <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head">
                <label
                  className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                    airdropLocked == 'Unlocked' ? 'unlock-header' : null
                  }`}
                >
                  Token
                </label>
                <label
                  className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                    airdropLocked == 'Unlocked' ? 'unlock-header' : null
                  }`}
                >
                  Address
                </label>
                <label
                  className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                    airdropLocked == 'Unlocked' ? 'unlock-header' : null
                  }`}
                >
                  Balance
                </label>
                {airdropLocked == 'Unlocked' ? (
                  <>
                    <label
                      className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                        airdropLocked == 'Unlocked' ? 'unlock-header' : null
                      }`}
                    >
                      Amount
                    </label>
                    <label
                      className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                        airdropLocked == 'Unlocked' ? 'unlock-header' : null
                      }`}
                    >
                      Total Allocation per Participant
                    </label>
                  </>
                ) : null}
                {/* <label className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name">
                  <button
                    onClick={getUserTokens}
                    className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-select"
                  >
                    {walletLoading ? 'Refreshing ...' : 'Refresh Wallet'}
                  </button>
                </label> */}
              </div>
              <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside">
                {ownedTokens.map((token, index) => (
                  <div
                    key={token.token_address}
                    className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail"
                  >
                    <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box">
                      <label
                        className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-name ${
                          airdropLocked == 'Unlocked' ? 'unlock-body' : null
                        }`}
                      >
                        {/* <img
                    className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name-user"
                    src={user.img}
                  /> */}
                        {token.symbol}
                      </label>
                      <label
                        className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-address ${
                          airdropLocked == 'Unlocked' ? 'unlock-body' : null
                        }`}
                      >
                        {formatAdddress(token.token_address)}
                      </label>
                      <label
                        className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-bal ${
                          airdropLocked == 'Unlocked' ? 'unlock-body' : null
                        }`}
                      >
                        {
                          +roundString(
                            ethers.utils.formatEther(
                              token.balance,
                              token.decimals
                            ),
                            4
                          )
                        }
                      </label>
                      {airdropLocked == 'Unlocked' ? (
                        <>
                          <label
                            className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-bal ${
                              airdropLocked == 'Unlocked' ? 'unlock-body' : null
                            }`}
                          >
                            0
                          </label>
                          <label
                            className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-bal ${
                              airdropLocked == 'Unlocked'
                                ? 'unlock-body last-unlock-body'
                                : null
                            }`}
                          >
                            0
                          </label>
                        </>
                      ) : null}

                      {/* <button
                        onClick={() => setSelectedToken(ownedTokens[index])}
                        className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-select"
                      >
                        Select
                      </button> */}
                      <button
                        type="button"
                        className="btn-square btn-gaming approve-btn"
                      >
                        Approve
                      </button>
                      <button type="button">
                        <Close />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* {selectedToken ? ( */}
          <div>
            <div>
              {/* <h6 className="mediaeyeform-label">
                Token Selected: {selectedToken?.symbol}
              </h6> */}
              {airdropLocked == 'Unlocked' ? null : (
                <>
                  <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
                    <h6 className="mediaeyeform-label">
                      Total Airdrop Token Allocation*
                    </h6>
                    <div className="mediaeyeform-group-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
                      <input
                        className={
                          errorCreateAirdrop?.['Total Airdrop Token Allocation']
                            ? 'mediaeyeform-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input mediaeyeform-group-input-error-border'
                            : 'mediaeyeform-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input'
                        }
                        type="number"
                        placeholder="10000"
                        onChange={(e) => handleTotalAllocation(e)}
                        name="Total Airdrop Token Allocation"
                      />
                    </div>
                    {errorCreateAirdrop?.['Total Airdrop Token Allocation'] ? (
                      <div className="mediaeyeform-group-input-error-message">
                        {errorCreateAirdrop?.['Total Airdrop Token Allocation']}
                      </div>
                    ) : null}
                  </div>
                  <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
                    <h6 className="mediaeyeform-label">
                      Token Allocation Per Participant*
                    </h6>
                    <div className="mediaeyeform-group-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
                      <input
                        className={
                          errorCreateAirdrop?.[
                            'Token Allocation Per Participant'
                          ]
                            ? 'mediaeyeform-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input mediaeyeform-group-input-error-border'
                            : 'mediaeyeform-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input'
                        }
                        type="number"
                        placeholder="10000"
                        onChange={(e) => handleParticipantAllocation(e)}
                        name="Token Allocation Per Participant"
                      />
                    </div>
                    {errorCreateAirdrop?.[
                      'Token Allocation Per Participant'
                    ] ? (
                      <div className="mediaeyeform-group-input-error-message">
                        {
                          errorCreateAirdrop?.[
                            'Token Allocation Per Participant'
                          ]
                        }
                      </div>
                    ) : null}
                  </div>
                </>
              )}
              <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
                <h6 className="mediaeyeform-label">Participants:</h6>
              </div>
              {airdropLocked == 'Unlocked' ? (
                <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
                  <h6 className="mediaeyeform-label">
                    Participants will get these tokens randomly.
                  </h6>
                </div>
              ) : null}
            </div>
            <button
              className="btn btn-info"
              onClick={handleApprove}
              style={isTokenApproved ? { background: 'green' } : {}}
              disabled={isTokenApproved}
            >
              {isTokenApproved ? 'APPROVED!' : 'APPROVE'}
            </button>
          </div>
          {/* ) : (
          <div />
        )} */}
        </div>
      </div>
    </>
  );
};

export default SelectTokenAddress;
