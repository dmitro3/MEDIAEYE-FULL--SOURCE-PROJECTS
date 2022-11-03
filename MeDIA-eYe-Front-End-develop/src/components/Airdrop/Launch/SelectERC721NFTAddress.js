import React, { useState, useEffect } from 'react';
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import {
  ChainHexString,
  ChangeChainRequest
} from '../../../blockchain/functions/ChangeChain';
import ReactTooltip from 'react-tooltip';
import { InfoCircle } from '../../Icons';
import SelectSearch from 'react-select-search';
import {
  checkAllowance,
  checkNFTApproval,
  requestNFTApproval,
  requestTokenApproval
} from '../../../blockchain/functions/ApproveToken';
import './Launch.scss';

const SelectERC721NFTAddress = (props) => {
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
    airdropType
  } = props;

  const [activeAirdropCategoryFilter, setActiveAirdropCategoryFilter] =
    useState('Standard');

  const airdropCategoryFilter = [{ name: 'Standard', value: 'Standard' }];

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
    <div>
      <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
        <label className="mediaeyeform-label mediaeyeinfo">
          Creator Royalties{' '}
          <span
            className="mediaeyeinfo-sign"
            data-html={true}
            data-class="mediaeyetooltip"
            data-tip=""
          >
            <InfoCircle type="outline-white" />
          </span>
          <ReactTooltip />
        </label>
        <div className="mediaeyeform-group-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box max">
          <input
            className="mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input"
            type="number"
            placeholder="5.00"
          />
          <span className="max-btn">
            <button>MAX</button>
          </span>
        </div>
      </div>
      <div className="nft-input-wrap">
        <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
          <h6 className="mediaeyeform-label">Total Number of NFT</h6>
          <div className="mediaeyeform-group-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
            <input
              className="mediaeyeform-input"
              type="number"
              placeholder="0"
              onChange={(e) => handleTotalAllocation(e)}
              name="Total NFT Allocation"
            />
          </div>
        </div>
        {airdropType == 'NFT' ? (
          <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
            <h6 className="mediaeyeform-label">NFT Supply</h6>
            <div className="mediaeyeform-group-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
              <input
                className="mediaeyeform-input"
                type="number"
                placeholder="0"
                onChange={(e) => handleTotalAllocation(e)}
                name="Total NFT Allocation"
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
        <h6 className="mediaeyeform-label">NFT allocation per participant</h6>
        <div className="mediaeyeform-group-input   launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box">
          <input
            className="mediaeyeform-input  launch-airdrop-page-inner-content-box-1-inside-bountbox-participant-box-input"
            type="number"
            placeholder="0"
            onChange={(e) => handleParticipantAllocation(e)}
            name="NFT allocation per participant"
          />
        </div>
      </div>
      <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
        <h6 className="mediaeyeform-label">Participants:</h6>
      </div>
      <div className="mediaeyeform-group launch-airdrop-page-inner-content-box-1-inside-bountbox-participant">
        <h6 className="mediaeyeform-label">Airdrop Category </h6>
        <div className="launch-airdrop-page-inner-content-row-card-body-selectairdrop">
          <div className="mediaeyeform-group-input">
            <SelectSearch
              className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
              size="lg"
              options={airdropCategoryFilter}
              value={activeAirdropCategoryFilter}
              placeholder={activeAirdropCategoryFilter}
              onChange={(opt) => setActiveAirdropCategoryFilter(opt)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectERC721NFTAddress;
