import React, { useState } from 'react';
import Switch from 'react-switch';
import { Close, Copy, Gift } from '../../Icons';
import search from '../../../assets/img/newSearchIcon.png';
import SelectSearch from 'react-select-search';

const WhitelistUser = (props) => {
  const { airdropLocked } = props;
  const [hideAccessCode, setHideAccessCode] = useState(true);
  const [file, setFile] = React.useState('');
  const [closeAirdropTaskDropdown, setCloseAirdropTaskDropdown] =
    useState(false);
  const [airdropAccessiblity, setAirdropAccessiblity] = useState('Public');
  const [activeAirdropParticipantFilter, setActiveAirdropParticipantFilter] =
    useState('Add manually ERC20 compatible wallets');
  const [hideAddManually, setHideAddManually] = useState(true);
  const [hideNFT, setHideNFT] = useState(true);
  const removeWalletAddress = (id) => {
    const temp = [...userAddress];
    const index = temp.findIndex((item) => item.id === id);
    if (index !== -1) {
      temp.splice(index, 1);
      setUserAddress(temp);
    }
  };

  const airdropParticipantFilter = [
    {
      name: 'Add manually ERC20 compatible wallets',
      value: 'Add manually ERC20 compatible wallets'
    }
  ];

  const [
    activeAirdropUploadWhitelistFilter,
    setActiveAirdropUploadWhitelistFilter
  ] = useState('Upload CSV');

  const airdropUploadWhitelistFilter = [
    {
      name: 'Upload CSV',
      value: 'Upload CSV'
    }
  ];

  const WalletAddress = [
    {
      id: 1,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 2,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 3,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 4,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 5,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 6,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 7,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 8,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 9,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    },
    {
      id: 10,
      address: '0xc7122B6496C0ACA1b5A7abc6CC6DAA37f9f51ec6'
    }
  ];

  const handleUploadcsv = (event) => {
    setFile(event.target.files[0]);
  };

  let [userAddress, setUserAddress] = useState(WalletAddress);

  const dropdownManage = () => {
    // alert('ok');
    setCloseAirdropTaskDropdown(true);
  };

  return (
    <div className="launch-airdrop-page-inner-content-row-card">
      <div
        className="launch-airdrop-page-inner-content-row-card-header"
        onClick={() => dropdownManage()}
      >
        <div className="launch-airdrop-page-inner-content-row-card-header-heading">
          Airdrop Accessibility and Whitelisting
        </div>
      </div>
      <div className="launch-airdrop-page-inner-content-row-card-body mediaeyeform">
        <div
          className={`mediaeyetokentype-box m-b-30  ${airdropAccessiblity === 'Public' ? 'active' : ''
            }`}
        >
          <div
            className="mediaeyetokentype-box-inner"
            onClick={() => {
              setAirdropAccessiblity('Public');
            }}
          >
            <div className="mediaeyetokentype-box-icon">
              <Gift />
            </div>
            <div className="mediaeyetokentype-box-content">
              <div className="mediaeyetokentype-box-content-name">Public</div>
            </div>
          </div>
        </div>

        <div className="mediaeyeform-label mediaeyeswitch">
          <Switch
            className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${hideAccessCode ? 'active' : ''
              }`}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => {
              setHideAccessCode(!hideAccessCode);
            }}
            checked={hideAccessCode}
            height={21}
            width={50}
          />
          Create your access pass
        </div>
        {hideAccessCode ? (
          <div className="launch-airdrop-page-inner-content-row-whitelist-codes">
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">Number of passes</label>
              <div className="mediaeyeform-group-input">
                <input
                  className="mediaeyeform-input"
                  type="number"
                  placeholder="100"
                />
              </div>
            </div>
            <div className="launch-airdrop-page-inner-content-row-whitelist-codes-btn">
              <button className="btn btn-gaming">GENERATE</button>
            </div>
          </div>
        ) : null}
        <div className="mediaeyeform-label mediaeyeswitch">
          <Switch
            className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${hideNFT ? 'active' : ''
              } `}
            checkedIcon={false}
            uncheckedIcon={false}
            onChange={() => {
              setHideNFT(!hideNFT);
            }}
            checked={hideNFT}
            height={21}
            width={50}
          />
          Create NFT pass
        </div>
        {hideNFT ? (
          <div className="launch-airdrop-page-inner-content-row-whitelist-createnft">
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">Contract Address</label>
              <div className="mediaeyeform-group-input">
                <input
                  className="mediaeyeform-input"
                  type="number"
                  placeholder="1c2e11...6f13d"
                />
              </div>
            </div>
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">NFT ID (optional)</label>
              <div className="mediaeyeform-group-input">
                <input
                  className="mediaeyeform-input"
                  type="number"
                  placeholder="9870"
                />
              </div>
            </div>
          </div>
        ) : null}
        <div className="">
          <div className="mediaeyeform-label mediaeyeswitch">
            <Switch
              className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${hideAddManually ? 'active' : ''
                }`}
              checkedIcon={false}
              uncheckedIcon={false}
              onChange={() => {
                setHideAddManually(!hideAddManually);
              }}
              checked={hideAddManually}
              height={21}
              width={50}
            />
            Whitelist by Wallet Address
          </div>
          {hideAddManually ? (
            <>
              {airdropLocked !== 'Locked' ? (
                <>
                  <div className="launch-airdrop-page-inner-content-row-card-body-selectparticipant">
                    <div className="mediaeyeform-group-input">
                      <SelectSearch
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                        size="lg"
                        options={airdropParticipantFilter}
                        value={activeAirdropParticipantFilter}
                        placeholder={activeAirdropParticipantFilter}
                        onChange={(opt) =>
                          setActiveAirdropParticipantFilter(opt)
                        }
                      />
                    </div>
                  </div>

                  <div className="launch-airdrop-page-inner-content-row-whitelist-address">
                    <div className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list">
                      <span className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-searchbox">
                        <input
                          type="text"
                          placeholder="Select contract address"
                          className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-searchbox-field"
                        />
                        <img
                          src={search}
                          className="launch-airdrop-page-inner-content-box-1-inside-bountbox-token-list-searchbox-searchicon"
                          alt="search-icon"
                        />
                      </span>
                      <button className="btn-square btn-gaming add-btn">
                        Add
                      </button>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th>Wallet Address</th>
                        </tr>
                      </thead>
                      <tbody className="">
                        <div className="mediaeyefancyScroll-box">
                          {userAddress.map((address) => (
                            <div className="launch-airdrop-page-inner-content-row-whitelist-address-row">
                              <div className="launch-airdrop-page-inner-content-row-whitelist-address-row-value">
                                <label>{address.address}</label>
                              </div>
                              <button
                                onClick={() => removeWalletAddress(address.id)}
                              >
                                <Close />
                              </button>
                            </div>
                          ))}
                        </div>
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <>
                  <div className="launch-airdrop-page-inner-content-row-card-body-selectparticipant">
                    <div className="mediaeyeform-group-input">
                      <SelectSearch
                        className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                        size="lg"
                        options={airdropUploadWhitelistFilter}
                        value={activeAirdropUploadWhitelistFilter}
                        placeholder={activeAirdropUploadWhitelistFilter}
                        onChange={(opt) =>
                          setActiveAirdropUploadWhitelistFilter(opt)
                        }
                      />
                    </div>
                  </div>
                  <div className="mediaeyeform-group launch-airdrop-page-inner-content-row-whitelist-upload">
                    <label
                      className="mediaeyeform-label uploader-label"
                      htmlFor="input-file"
                    >
                      {file.name ? file.name : 'CSV File'}
                    </label>
                    <label className="mediaeyeform-group-input">
                      <div className="mediaeyeform-input"></div>
                      <input
                        type="file"
                        onChange={handleUploadcsv}
                        className="mediaeyeform-group-input-hide"
                        id="input-file"
                        accept=".csv"
                      />
                      <button
                        type="button"
                        className="btn btn-info mediaeyeform-group-input-btn"
                      >
                        Upload
                      </button>
                    </label>
                  </div>
                  <div className="launch-airdrop-page-inner-content-row-whitelist-download">
                    {' '}
                    <u>Download Sample CSV File</u>
                  </div>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WhitelistUser;
