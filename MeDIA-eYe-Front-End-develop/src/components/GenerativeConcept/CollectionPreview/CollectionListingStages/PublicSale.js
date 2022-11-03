import React, { useState } from 'react';
import './CollectionListingStages.scss';
import Switch from 'react-switch';
import { InfoCircle } from '../../../Icons';
import SelectSearch from 'react-select-search';

export default function PublicSale() {
    const [togglePublicSale, setTogglePublicSale] = useState(true);
    const [selectStages, setSelectStages] =
        useState('Free Mint');
    const stages = [
        {
            name: 'Free Mint',
            value: 'Free Mint'
        },
        {
            name: 'Pre Sale',
            value: 'Pre Sale'
        },
        {
            name: 'Public Sale',
            value: 'Public Sale'
        }
    ];
    return (
        <div className='listing-stages-inner-publicsale'>
            <div className="listing-stages-inner-title m-t-50">
                <span >Public Sale</span>
            </div>
            <div className='listing-stages-inner-publicsale-content m-t-50'>
                <div className='listing-stages-inner-publicsale-content-row'>
                    <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="price">
                            Price
                        </label>
                        <div className="mediaeyeform-group-input">
                            <img className='mediaeyeform-group-input-image' src="/img/token/34/ETH.png" />
                            <input
                                id="price"
                                className="mediaeyeform-input withimage"
                                type="number"
                                max={5}
                                placeholder='5.00'
                            />
                        </div>
                        <div className="mediaeyeform-group-input-error-message text-semitransperant">
                            <span>Set the base price (in ETH) for your NFTs.<br />
                                Input “0” if you want them to be free of charge.</span>
                        </div>
                    </div>
                    <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="supply">
                            Supply
                        </label>
                        <div className="mediaeyeform-group-input">
                            <input
                                id="supply"
                                className="mediaeyeform-input"
                                type="number"
                                placeholder='9495'
                            />
                        </div>
                        <div className="mediaeyeform-group-input-error-message text-semitransperant">
                            <span>This is the maximum supply of your contract based<br />
                                on how many tokens you generated with MEDIA EYE</span>
                        </div>
                    </div>
                </div>
                <div className='listing-stages-inner-publicsale-content-row m-t-50'>
                    <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="prewallet">
                            Max NFTs Per-Wallet
                        </label>
                        <div className="mediaeyeform-group-input">
                            <input
                                id="prewallet"
                                className="mediaeyeform-input"
                                type="number"
                                placeholder='1000'
                            />
                        </div>
                        <div className="mediaeyeform-group-input-error-message text-semitransperant">
                            <span>Specify maximum number of NFTs that can be
                                minted per wallet.</span>
                        </div>
                    </div>
                    <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="preTrans">
                            Max NFTs Per-Transaction
                        </label>
                        <div className="mediaeyeform-group-input">
                            <input
                                id="preTrans"
                                className="mediaeyeform-input"
                                type="number"
                                placeholder='20'
                            />
                            <span className="mediaeyeform-group-input-max">MAX</span>
                        </div>
                        <div className="mediaeyeform-group-input-error-message text-semitransperant">
                            <span>Specify maximum number of NFTs that can be<br />
                                minted per transaction.</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='listing-stages-inner-publicsale-price m-t-50'>
                <div className="mediaeyeform-group m-0">
                    <label className="mediaeyeform-label mediaeyeinfo">
                        Select Payment Tokens and Set Sales Price* {' '}
                        <span
                            className="mediaeyeinfo-sign"
                            data-html={true}
                            data-class="mediaeyetooltip"
                            data-tip=""
                        >
                            <InfoCircle type="outline-white" />
                        </span>
                    </label>
                </div>
                <div className='listing-stages-inner-publicsale-price-sale'>
                    <div className='listing-stages-inner-publicsale-price-sale-title'>
                        <span>Increase Price After Number of Sales </span>
                        <div className="mediaeyeform-label mediaeyeswitch">
                            <Switch
                                className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${togglePublicSale ? 'active' : ''
                                    }`}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onChange={() => {
                                    setTogglePublicSale(!togglePublicSale);
                                }}
                                checked={togglePublicSale}
                                height={21}
                                width={50}
                            />
                        </div>
                    </div>
                    <div className='listing-stages-inner-publicsale-content-row m-t-50'>
                        <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label" htmlFor="sales">
                                Sales
                            </label>
                            <div className="mediaeyeform-group-input">
                                <input
                                    id="price"
                                    className="mediaeyeform-input withimage"
                                    type="number"
                                    placeholder='100'
                                />
                            </div>
                        </div>
                        <div className="mediaeyeform-group">
                            <label className="mediaeyeform-label" htmlFor="rateIncrease">
                                Rate Increases
                            </label>
                            <div className="mediaeyeform-group-input double">
                                <SelectSearch
                                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                    size="lg"
                                    options={stages}
                                    value={selectStages}
                                    placeholder={selectStages}
                                    onChange={(opt) =>
                                        setSelectStages(opt)
                                    }
                                />
                                <input
                                    id="price"
                                    className="mediaeyeform-input withimage"
                                    type="number"
                                    placeholder='100'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
