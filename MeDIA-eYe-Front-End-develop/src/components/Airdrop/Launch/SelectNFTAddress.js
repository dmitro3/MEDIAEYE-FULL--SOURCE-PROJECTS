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
  checkNFTApproval,
  requestNFTApproval,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import { ContractAddress } from '../../../blockchain/functions/Addresses';
import './Launch.scss';
import search from '../../../assets/img/newSearchIcon.png';
import { Close, Plus } from '../../Icons';

const SelectNFTAddress = (props) => {
  const {
    activeNetwork,
    participantAllocation,
    totalAllocation,
    selectedToken,
    setParticipantAllocation,
    setSelectedToken,
    setTotalAllocation,
    NFTTypeFilter,
    errorCreateAirdrop,
    onetomanyType,
    airdropLocked
  } = props;
  const MoralisWeb3Api = useMoralisWeb3Api();
  const { Moralis, user } = useMoralis();

  const [isTokenApproved, setTokenApproved] = useState(false);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [walletLoading, setWalletLoading] = useState(false);
  const [selectedMeta, setSelectedMeta] = useState(null);

  const getUserTokens = async () => {
    setWalletLoading(true);
    try {
      const res = await MoralisWeb3Api.account.getNFTs({
        chain: ChainHexString(activeNetwork)
      });
      // filter only ERC1155 for now
      // filter out nfts that have no metadata (nft still exists, but with metadata error)
      let nfts = res.result.filter(
        (token) => token.contract_type === 'ERC1155' && token.metadata
      );
      setOwnedTokens(nfts);
    } catch (e) {
      console.log(e);
    }
    setWalletLoading(false);
  };

  const handleTotalAllocation = async (e) => {
    await setTotalAllocation(e.target.value);
    checkTotalAllocation(e.target.value);
  };

  const checkTotalAllocation = async (allocationWei) => {
    if (selectedToken) {
      setTokenApproved(
        await checkNFTApproval(
          Moralis,
          user?.attributes?.ethAddress,
          selectedToken?.contract_type,
          selectedToken?.token_address,
          3
        )
      );
    }
  };

  const handleParticipantAllocation = async (e) => {
    setParticipantAllocation(e.target.value);
  };

  const UnlockSingleNFTList = [
    {
      id: 1,
      ContractAddress: '0000',
      NFTid: '123',
      supply: '00',
      amount: 0,
      participant: 0
    },
    {
      id: 2,
      ContractAddress: '0000',
      NFTid: '123',
      supply: '00',
      amount: 0,
      participant: 0
    },
    {
      id: 3,
      ContractAddress: '0000',
      NFTid: '123',
      supply: '00',
      amount: 0,
      participant: 0
    },
    {
      id: 4,
      ContractAddress: '0000',
      NFTid: '123',
      supply: '00',
      amount: 0,
      participant: 0
    },
    {
      id: 5,
      ContractAddress: '0000',
      NFTid: '123',
      supply: '00',
      amount: 0,
      participant: 0
    },
    {
      id: 6,
      ContractAddress: '0000',
      NFTid: '123',
      supply: '00',
      amount: 0,
      participant: 0
    }
  ];

  const [activeSingleNFTList, setActiveSingleNFTList] =
    useState(UnlockSingleNFTList);

  const deletesinglenftlist = (id) => {
    const temp = [...activeSingleNFTList];
    const index = temp.findIndex((item) => item.id === id);
    if (index !== -1) {
      temp.splice(index, 1);
      setActiveSingleNFTList(temp);
    }
  };

  let [addressNumber, setAddressNumber] = useState(0);

  const addAddressList = (type) => {
    if (type === 'addAddress') {
      setAddressNumber(addressNumber + 1);
    } else if (type === 'removeAddress') {
      setAddressNumber(addressNumber - 1);
    }
  };

  const addressArrayList = () => {
    return [...Array(addressNumber)].map((e, i) => (
      <div className="launch-airdrop-page-inner-content-box-1-inside-addaddress">
        <div className="mediaeyeform-group">
          <label className="mediaeyeform-label">Contract Address*</label>
          <div className="mediaeyeform-group-input airdropname">
            <input type="text" className="mediaeyeform-input" />
          </div>
        </div>
        <div className="mediaeyeform-group">
          <label className="mediaeyeform-label">NFT ID*</label>
          <div className="mediaeyeform-group-input airdropname">
            <input type="text" className="mediaeyeform-input" />
          </div>
        </div>
      </div>
    ));
  };

  const handleApprove = async () => {
    // switch to correct chain before requesting approval
    if ((await Moralis.chainId) !== ChainHexString(activeNetwork)) {
      ChangeChainRequest(activeNetwork);
      return;
    }

    setTokenApproved(
      await requestNFTApproval(
        Moralis,
        selectedToken?.contract_type,
        selectedToken?.token_address,
        3
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

  return (
    <>
      {(airdropLocked == 'Unlocked' && onetomanyType == 'One-One') ||
      (airdropLocked == 'Unlocked' && onetomanyType == 'Many-One') ? (
        <div className="launch-airdrop-page-inner-content-box-1-inside">
          <div className="launch-airdrop-page-inner-content-box-1-inside-addaddress">
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">Contract Address*</label>
              <div className="mediaeyeform-group-input airdropname">
                <input type="text" className="mediaeyeform-input" />
              </div>
            </div>
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">NFT ID*</label>
              <div className="mediaeyeform-group-input airdropname">
                <input type="text" className="mediaeyeform-input" />
              </div>
            </div>
            <button
              className="btn btn-square btn-transperant launch-airdrop-page-inner-content-box-1-inside-addaddress-btn"
              onClick={() => addAddressList('addAddress')}
            >
              <Plus /> Add
            </button>
          </div>
          {addressArrayList()}
          <div
            className={`launch-airdrop-page-inner-content-box-1-inside-bountbox ${
              airdropLocked == 'Unlocked' ? 'unlocked-size' : null
            }`}
          >
            <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token">
              <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items">
                <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head">
                  <label
                    className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                      airdropLocked == 'Unlocked' ? 'unlock-header' : null
                    }`}
                  >
                    Contract Address
                  </label>
                  <label
                    className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                      airdropLocked == 'Unlocked' ? 'unlock-header' : null
                    }`}
                  >
                    NFT ID
                  </label>
                  <label
                    className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-head-name ${
                      airdropLocked == 'Unlocked' ? 'unlock-header' : null
                    }`}
                  >
                    Supply
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
                        NFT Allocation per Participant
                      </label>
                    </>
                  ) : null}
                </div>
                <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside">
                  {activeSingleNFTList.map((singlenftlist, i) => (
                    <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail">
                      <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box">
                        <label
                          className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-name ${
                            airdropLocked == 'Unlocked' ? 'unlock-body' : null
                          }`}
                        >
                          {singlenftlist.ContractAddress}
                        </label>
                        <label
                          className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-address ${
                            airdropLocked == 'Unlocked' ? 'unlock-body' : null
                          }`}
                        >
                          {singlenftlist.NFTid}
                        </label>
                        <label
                          className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-bal ${
                            airdropLocked == 'Unlocked' ? 'unlock-body' : null
                          }`}
                        >
                          {singlenftlist.supply}
                        </label>
                        {airdropLocked == 'Unlocked' ? (
                          <>
                            <label
                              className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-bal ${
                                airdropLocked == 'Unlocked'
                                  ? 'unlock-body'
                                  : null
                              }`}
                            >
                              {singlenftlist.amount}
                            </label>
                            <label
                              className={`launch-airdrop-page-inner-content-box-1-inside-bountbox-token-items-inside-detail-box-name token-bal ${
                                airdropLocked == 'Unlocked'
                                  ? 'unlock-body last-unlock-body'
                                  : null
                              }`}
                            >
                              {singlenftlist.participant}
                            </label>
                          </>
                        ) : null}
                        <button
                          onClick={() => deletesinglenftlist(singlenftlist.id)}
                        >
                          <Close />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div>
                {airdropLocked == 'Unlocked' ? null : (
                  <>
                    <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
                      <h6 className="mediaeyeform-label">
                        Total Airdrop Token Allocation*
                      </h6>
                      <div className="mediaeyeform-group-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
                        <input
                          className={
                            errorCreateAirdrop?.[
                              'Total Airdrop Token Allocation'
                            ]
                              ? 'mediaeyeform-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input mediaeyeform-group-input-error-border'
                              : 'mediaeyeform-input launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input'
                          }
                          type="number"
                          placeholder="10000"
                          onChange={(e) => handleTotalAllocation(e)}
                          name="Total Airdrop Token Allocation"
                        />
                      </div>
                      {errorCreateAirdrop?.[
                        'Total Airdrop Token Allocation'
                      ] ? (
                        <div className="mediaeyeform-group-input-error-message">
                          {
                            errorCreateAirdrop?.[
                              'Total Airdrop Token Allocation'
                            ]
                          }
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
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
            <h6 className="mediaeyeform-label">Contract Address*</h6>
            <div className="mediaeyeform-group-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
              <input
                className={
                  errorCreateAirdrop?.['Contract Address']
                    ? 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input mediaeyeform-group-input-error-border'
                    : 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input'
                }
                type="number"
                placeholder="1c2e11...6f13d"
                name="Contract Address"
              />
            </div>
            {errorCreateAirdrop?.['Contract Address'] ? (
              <div className="mediaeyeform-group-input-error-message">
                {errorCreateAirdrop?.['Contract Address']}
              </div>
            ) : null}
          </div>
          <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
            <h6 className="mediaeyeform-label">NFT ID*</h6>
            <div className="mediaeyeform-group-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
              <input
                className={
                  errorCreateAirdrop?.['NFT ID']
                    ? 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input mediaeyeform-group-input-error-border'
                    : 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input'
                }
                type="number"
                placeholder="9870"
                name="NFT ID"
              />
            </div>
            {errorCreateAirdrop?.['NFT ID'] ? (
              <div className="mediaeyeform-group-input-error-message">
                {errorCreateAirdrop?.['NFT ID']}
              </div>
            ) : null}
          </div>
          <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
            <h6 className="mediaeyeform-label">Total NFT Allocation*</h6>
            <div className="mediaeyeform-group-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
              <input
                className={
                  errorCreateAirdrop?.['Total NFT Allocation']
                    ? 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input mediaeyeform-group-input-error-border'
                    : 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input'
                }
                type="number"
                placeholder="0"
                onChange={(e) => handleTotalAllocation(e)}
                name="Total NFT Allocation"
              />
            </div>
            {errorCreateAirdrop?.['Total NFT Allocation'] ? (
              <div className="mediaeyeform-group-input-error-message">
                {errorCreateAirdrop?.['Total NFT Allocation']}
              </div>
            ) : null}
          </div>
          <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
            <h6 className="mediaeyeform-label">
              NFT allocation per participant*
            </h6>
            <div className="mediaeyeform-group-input   launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
              <input
                className={
                  errorCreateAirdrop?.['NFT allocation per participant']
                    ? 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input mediaeyeform-group-input-error-border'
                    : 'mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input'
                }
                type="number"
                placeholder="0"
                onChange={(e) => handleParticipantAllocation(e)}
                name="NFT allocation per participant"
              />
            </div>
            {errorCreateAirdrop?.['NFT allocation per participant'] ? (
              <div className="mediaeyeform-group-input-error-message">
                {errorCreateAirdrop?.['NFT allocation per participant']}
              </div>
            ) : null}
          </div>
          <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
            <h6 className="mediaeyeform-label">Participants:</h6>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectNFTAddress;
