import React, { useState } from 'react';
import Switch from 'react-switch';
import SelectSearch from 'react-select-search';
import { Close, InfoCircle } from '../../../Icons';
import search from '../../../../assets/img/newSearchIcon.png';
import { toggleGeneratiedAccessPass } from '../../../../store/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import formatAdddress from '../../../../utils/formatAdddress';

export default function PreSale() {
    const accessFrom = useSelector((state) => state.app.accessFrom);
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

    const [togglePreSale, setTogglePreSale] = useState(true);
    const [file, setFile] = React.useState('');
    const [toggleWalletAddress, setToggleWalletAddress] = useState(true);
    const [toggleAccessPass, setToggleAccessPass] = useState(true);
    const [toggleNftPass, setToggleNftPass] = useState(true);
    let [userAddress, setUserAddress] = useState(WalletAddress);
    const dispatch = useDispatch();
    const [walletAddressFilter, setWalletAddressFilter] = useState('Upload CSV');
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

    // const getPaymentList = () => {
    //     console.log(products[0], "Your Product")
    //     if (products[0]?.attributes?.chainId === '0x38') {
    //         return [
    //             {
    //                 name: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 ),
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     )
    //                 ],
    //                 value: '0',
    //                 primary: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 )
    //             },
    //             { name: 'BUSD', token: ['BUSD'], value: '1', primary: 'BUSD' },
    //             {
    //                 name:
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ) + ' Primary & BUSD',
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                     'BUSD'
    //                 ],
    //                 primary: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 ),
    //                 value: '2'
    //             },
    //             {
    //                 name:
    //                     'BUSD Primary & ' +
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                     'BUSD'
    //                 ],
    //                 primary: 'BUSD',
    //                 value: '3'
    //             }
    //         ];
    //     } else if (products[0]?.attributes?.chainId === '0x1') {
    //         return [
    //             {
    //                 name: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 ),
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     )
    //                 ],
    //                 value: '0',
    //                 primary: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 )
    //             },
    //             { name: 'USDT', token: ['USDT'], value: '1', primary: 'USDT' },
    //             {
    //                 name:
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ) + ' Primary & USDT',
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                     'USDT'
    //                 ],
    //                 primary: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 ),
    //                 value: '2'
    //             },
    //             {
    //                 name:
    //                     'USDT Primary & ' +
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                     'USDT'
    //                 ],
    //                 primary: 'USDT',
    //                 value: '3'
    //             }
    //         ];
    //     } else if (products[0]?.attributes?.chainId === '0xfa') {
    //         return [
    //             {
    //                 name: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 ),
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     )
    //                 ],
    //                 value: '0',
    //                 primary: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 )
    //             },
    //             { name: 'USDC', token: ['USDC'], value: '1', primary: 'USDC' },
    //             {
    //                 name:
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ) + ' Primary & USDC',
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                     'USDC'
    //                 ],
    //                 primary: TokenNameMap(
    //                     products[0]?.attributes?.chainId,
    //                     activeSingle ? false : true
    //                 ),
    //                 value: '2'
    //             },
    //             {
    //                 name:
    //                     'USDC Primary & ' +
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                 token: [
    //                     TokenNameMap(
    //                         products[0]?.attributes?.chainId,
    //                         activeSingle ? false : true
    //                     ),
    //                     'USDC'
    //                 ],
    //                 primary: 'USDC',
    //                 value: '3'
    //             }
    //         ];
    //     } else {
    //         return [];
    //     }
    // };

    // const [paymentTokensSelectList, setPaymentTokensSelectList] = useState(() => {
    //     return getPaymentList();
    // });

    // const paymentMethodList = () => {
    //     if (activeTokens?.token?.length > 0) {
    //         return (
    //             <div
    //                 className="mediaeye-paymentmethod"
    //                 size={activeTokens.token.length}
    //             >
    //                 <div className="mediaeye-paymentmethod-inner">
    //                     {activeTokens.token.map((tokenRow, i) => (
    //                         <>
    //                             {i > 0 ? (
    //                                 <div className="mediaeye-paymentmethod-inner-middle">
    //                                     <span>and</span>
    //                                 </div>
    //                             ) : null}
    //                             <div
    //                                 className={`mediaeye-paymentmethod-box active  ${activeTokens.primary === tokenRow &&
    //                                     activeTokens.token.length > 1
    //                                     ? 'makeprimary'
    //                                     : ''
    //                                     }`}
    //                             >
    //                                 <div className="mediaeye-paymentmethod-box-inner">
    //                                     <div className="mediaeye-paymentmethod-box-btn">
    //                                         <div className="mediaeye-paymentmethod-box-icon">
    //                                             <img src={GetNetworkIcon(tokenRow)} alt={tokenRow} />
    //                                         </div>
    //                                         <div className="mediaeye-paymentmethod-box-content">
    //                                             <div className="mediaeye-paymentmethod-box-content-name">
    //                                                 {tokenRow}
    //                                             </div>
    //                                         </div>
    //                                     </div>

    //                                     <label className="mediaeye-paymentmethod-box-price">
    //                                         <input
    //                                             className={'mediaeye-paymentmethod-box-price-input'}
    //                                             disabled={
    //                                                 activeTokens.primary === tokenRow ? false : true
    //                                             }
    //                                             type="text"
    //                                             placeholder={
    //                                                 activeSingle
    //                                                     ? 'Enter price for one piece'
    //                                                     : 'Enter minimum Bid'
    //                                             }
    //                                             value={prices[i]}
    //                                             onChange={(e) => {
    //                                                 handlePrices(
    //                                                     roundString(allowOnlyNumber(e.target.value), 5),
    //                                                     i
    //                                                 );
    //                                             }}
    //                                         />
    //                                     </label>
    //                                 </div>
    //                             </div>
    //                         </>
    //                     ))}
    //                 </div>
    //             </div>
    //         );
    //     } else {
    //         return <></>;
    //     }
    // };
    // const handlePrices = async (value, index) => {
    //     // handle user input to reflect price of primary token (only primary token is editable )
    //     let newPrices = [...prices];
    //     newPrices[index] = value;
    //     value = value ? value : 0;

    //     if (products[0]?.attributes?.chainId !== '0xfa') {
    //         // check if number is valid before doing conversion
    //         if (
    //             !value.endsWith('.') &&
    //             typeof Number(value) === 'number' &&
    //             Number(value) !== 0 &&
    //             isFinite(Number(value))
    //         ) {
    //             // adjust all prices to match the primary token
    //             for (let i in prices) {
    //                 // if not the primary token, get price from chainlink
    //                 if (index != i) {
    //                     let params = {
    //                         token: activeTokens?.token[index],
    //                         chainId: '0x38',
    //                         price: Moralis.Units.ETH(value),
    //                         native: i === 0 ? true : false // if index is 0, then we are resolving to a native price
    //                     };

    //                     newPrices[i] = roundString(
    //                         Moralis.Units.FromWei(await convertPrice(Moralis, params)),
    //                         5
    //                     );
    //                 }
    //             }
    //         }
    //     }
    //     setPrices(newPrices);
    // };

    return (
        <>
            <div className="listing-stages-inner-title m-t-50">
                <span>Pre Sale</span>
                <div className="mediaeyeform-label mediaeyeswitch">
                    <Switch
                        className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${togglePreSale ? 'active' : ''
                            }`}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onChange={() => {
                            setTogglePreSale(!togglePreSale);
                        }}
                        checked={togglePreSale}
                        height={21}
                        width={50}
                    />
                </div>
            </div>
            {togglePreSale ? (
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
                                        name="nft-name"
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
                    <div className="marketplace-create-page-inner-content-row m-t-50">
                        <h2 className="marketplace-create-page-inner-content-row-title mediaeyeinfo">
                            Select Payment Tokens and Set Sales Price* {' '}

                            <span
                                className="mediaeyeinfo-sign"
                                data-class="mediaeyetooltip"
                                data-tip="Select the accepted form of payment and set the minimum opening bid."
                            >
                                <InfoCircle type="outline" />
                            </span>{' '}
                        </h2>
                        {/* <div className="marketplace-create-page-inner-content-paymentmethod">
                            <SelectSearch
                                placeholder="Select Payment Tokens"
                                className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style marketplace-create-page-inner-content-paymentmethod-select"
                                options={paymentTokensSelectList}
                                value={activePaymentToken}
                                onChange={(opt) => {
                                    setActivePaymentToken(opt);
                                }}
                            />

                            {paymentMethodList()}
                        </div> */}
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
