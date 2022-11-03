import React, { useState } from 'react';
import './CollectionListingStages.scss';
import Switch from 'react-switch';
import SelectSearch from 'react-select-search';
import search from '../../../../assets/img/newSearchIcon.png';
import { Close } from '../../../Icons';
import { toggleGeneratiedAccessPass } from '../../../../store/app/appSlice';
import { useDispatch } from 'react-redux';
import formatAdddress from '../../../../utils/formatAdddress';

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

export default function FreeMint() {
    const [toggleFreeMint, setToggleFreeMint] = useState(true);
    const [toggleWalletAddress, setToggleWalletAddress] = useState(true);
    const [file, setFile] = React.useState('');
    const [toggleAccessPass, setToggleAccessPass] = useState(true);
    const [toggleNftPass, setToggleNftPass] = useState(true);
    let [userAddress, setUserAddress] = useState(WalletAddress);
    const [walletAddressFilter, setWalletAddressFilter] = useState('Upload CSV');
    const dispatch = useDispatch();
    const whiltelistWallet = [
        {
            name: 'Add manually ERC20 compatible wallets',
            value: 'Add manually ERC20 compatible wallets'
        },
        {
            name: 'Upload CSV',
            value: 'Upload CSV'
        }
    ];

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    };
    const removeWalletAddress = (id) => {
        const temp = [...userAddress];
        const index = temp.findIndex((item) => item.id === id);
        if (index !== -1) {
            temp.splice(index, 1);
            setUserAddress(temp);
        }
    };
    const handleGenerate = () => {
        dispatch(
            toggleGeneratiedAccessPass({
                accessFrom: 'listing'
            })
        );
    }
    return (
        <>
            <div className="listing-stages-inner-title">
                <span>Free Mint (Optional)</span>
                <div className="mediaeyeform-label mediaeyeswitch">
                    <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleFreeMint ? 'active' : ''
                            }`}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                            setToggleFreeMint(!toggleFreeMint);
                        }}
                        checked={toggleFreeMint}
                        height={21}
                        width={50}
                    />
                </div>
            </div>
            {toggleFreeMint ? (
                <>
                    <div className="listing-stages-inner-basics">
                        <div className="listing-stages-inner-basics-row">
                            <div className="mediaeyeform-group">
                                <label className="mediaeyeform-label" htmlFor="nftName">
                                    Name
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <input
                                        id="nftName"
                                        className="mediaeyeform-input"
                                        type="text"
                                        name="nftName"
                                    />
                                </div>
                            </div>
                            <div className="mediaeyeform-group">
                                <label className="mediaeyeform-label" htmlFor="stageDes">
                                    Stage Description
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <input
                                        id="stageDes"
                                        className="mediaeyeform-input"
                                        type="text"
                                    />
                                </div>
                                <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                    <span>Short description who will recieve the NFTs</span>
                                </div>
                            </div>
                        </div>
                        <div className="mediaeyeform-group shortone">
                            <label className="mediaeyeform-label" htmlFor="Supply">
                                Supply
                            </label>
                            <div className="mediaeyeform-group-input">
                                <input
                                    id="Supply"
                                    className="mediaeyeform-input"
                                    type="number"
                                    placeholder="500"
                                />
                            </div>
                            <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                <span>
                                    Set the maximum supply for your presale. This number must be
                                    less or equal to your total supply.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="listing-stages-inner-maxnft">
                        <div className="listing-stages-inner-maxnft-row">
                            <div className="mediaeyeform-group">
                                <label className="mediaeyeform-label" htmlFor="nftWallet">
                                    Max NFTs Per-Wallet
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <input
                                        id="nftWallet"
                                        className="mediaeyeform-input"
                                        type="number"
                                        placeholder="1000"
                                    />
                                </div>
                                <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                    <span>
                                        Specify maximum number of NFTs that can be minted per
                                        wallet.
                                    </span>
                                </div>
                            </div>
                            <div className="mediaeyeform-group">
                                <label className="mediaeyeform-label" htmlFor="nfttransaction">
                                    Max NFTs Per-Transaction
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <input
                                        id="nfttransaction"
                                        className="mediaeyeform-input"
                                        type="number"
                                        placeholder="20"
                                    />
                                    <span className="mediaeyeform-group-input-max">MAX</span>
                                </div>
                                <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                    <span>
                                        Specify maximum number of NFTs that can be minted per
                                        transaction.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="listing-stages-inner-whitelist">
                        <span className="listing-stages-inner-whitelist-title">
                            Whitelist
                        </span>
                        <span className="m-t-10 text-semitransperant">
                            Give specific group of people (team, early supporters, etc.)
                            access to mint first.{' '}
                        </span>
                    </div>
                    <div className="listing-stages-inner-address m-t-50">
                        <div className="listing-stages-inner-address-left">
                            <div className="listing-stages-inner-address-title">
                                <span>Wallet Address</span>
                                <Switch
                                    className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleWalletAddress ? 'active' : ''
                                        }`}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    onChange={() => {
                                        setToggleWalletAddress(!toggleWalletAddress);
                                    }}
                                    checked={toggleWalletAddress}
                                    height={21}
                                    width={50}
                                />
                            </div>
                            {toggleWalletAddress ? (
                                <div className="listing-stages-inner-address-left-content m-t-20">
                                    <div className="mediaeyeform-group-input">
                                        <SelectSearch
                                            className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                            size="lg"
                                            options={whiltelistWallet}
                                            value={walletAddressFilter}
                                            placeholder={walletAddressFilter}
                                            onChange={(opt) => setWalletAddressFilter(opt)}
                                        />
                                    </div>

                                    <div className="listing-stages-inner-address-left-content-data">
                                        {walletAddressFilter === 'Upload CSV' ? (
                                            <>
                                                <div className="mediaeyeform-group m-t-30">
                                                    <label className="mediaeyeform-group-input">
                                                        <div
                                                            className="mediaeyeform-input"
                                                            htmlFor="upload-private-file"
                                                        >
                                                            {file?.name ? file?.name : 'No Chosen File...'}
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="mediaeyeform-group-input-hide"
                                                            id="upload-private-file"
                                                            accept=".xlsx, .xls, .csv"
                                                            onChange={handleUpload}
                                                        />
                                                        <label
                                                            className="btn btn-info mediaeyeform-group-input-btn"
                                                            htmlFor="upload-private-file"
                                                        >
                                                            Upload
                                                        </label>
                                                    </label>
                                                </div>

                                                <div className="mediaeye-CreateCampaign-wrapper-card-download">
                                                    Download Sample CSV File
                                                </div>
                                            </>
                                        ) : (
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
                                                            alt="search icon"
                                                        />
                                                    </span>
                                                    <button className="btn-square btn-gaming add-btn">
                                                        Add
                                                    </button>
                                                </div>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th style={{ borderLeft: 'none' }}>
                                                                Wallet Address
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="">
                                                        <div className="mediaeyefancyScroll-box">
                                                            {userAddress.map((address, i) => (
                                                                <div
                                                                    className="launch-airdrop-page-inner-content-row-whitelist-address-row"
                                                                    key={i}
                                                                >
                                                                    <div className="launch-airdrop-page-inner-content-row-whitelist-address-row-value">
                                                                        <label>{formatAdddress(address.address)}</label>
                                                                    </div>
                                                                    <button
                                                                        onClick={() =>
                                                                            removeWalletAddress(address.id)
                                                                        }
                                                                    >
                                                                        <Close />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                        <div className="listing-stages-inner-address-right">
                            <div className="listing-stages-inner-address-title">
                                <span>Access pass</span>
                                <Switch
                                    className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleAccessPass ? 'active' : ''
                                        }`}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    onChange={() => {
                                        setToggleAccessPass(!toggleAccessPass);
                                    }}
                                    checked={toggleAccessPass}
                                    height={21}
                                    width={50}
                                />
                            </div>
                            {toggleAccessPass ? (
                                <div className="listing-stages-inner-address-right-content m-t-20">
                                    <div className="mediaeyeform-group">
                                        <div className="mediaeyeform-group-input">
                                            <input
                                                className="mediaeyeform-input"
                                                placeholder="100"
                                                type="number"
                                            />
                                            <button className="btn btn-square btn-gaming" onClick={handleGenerate}>
                                                Generate
                                            </button>
                                        </div>
                                        <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                            <span>Number of passes</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="listing-stages-inner-nftpass m-t-50">
                        <div className="listing-stages-inner-nftpass-title">
                            <span>Create NFT pass</span>
                            <Switch
                                className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleNftPass ? 'active' : ''
                                    }`}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onChange={() => {
                                    setToggleNftPass(!toggleNftPass);
                                }}
                                checked={toggleNftPass}
                                height={21}
                                width={50}
                            />
                        </div>
                        {toggleNftPass ? (
                            <div className="listing-stages-inner-nftpass-content m-t-30">
                                <div className="mediaeyeform-group">
                                    <label className="mediaeyeform-label" htmlFor="contractAdd">
                                        Contract Address
                                    </label>
                                    <div className="mediaeyeform-group-input">
                                        <input
                                            id="contractAdd"
                                            className="mediaeyeform-input"
                                            type="text"
                                            placeholder="1c2e11...6f13d"
                                        />
                                    </div>
                                </div>
                                <div className="mediaeyeform-group">
                                    <label className="mediaeyeform-label" htmlFor="stageDes">
                                        Stage Description
                                    </label>
                                    <div className="mediaeyeform-group-input">
                                        <input
                                            id="stageDes"
                                            className="mediaeyeform-input"
                                            type="number"
                                            placeholder="9870"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </>
            ) : null}
        </>
    );
}
