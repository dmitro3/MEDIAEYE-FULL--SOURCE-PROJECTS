import React, { useState } from 'react';
import {
    Angle,
    Charity,
    Heart,
    HeartLike,
    InfoCircle,
    Radiobox,
    RightSideArrow,
    SearchIcon,
    Upload
} from '../../../Icons';
import './CollectionSettings.scss';
import ChangeChainRequest from '../../../../blockchain/functions/ChangeChain/ChangeChainRequest';
import { GetNetworkIcon } from '../../../../blockchain/functions/Utils';
import { useSelector } from 'react-redux';
import Switch from 'react-switch';
import charityImage from '../../../../assets/img/charity.png'
import { allowOnlyNumber } from '../../../../blockchain/functions/Utils';

export default function CollectionSettings() {
    const activeNetwork = useSelector((state) => state.app.activeNetwork);
    const [activeToken, setActiveToken] = useState('ERC721');
    const [toggleDelayedReveal, setToggleDelayedReveal] = useState(true);
    const [placeholderImage, setPlaceholderImage] = useState([]);
    const [livestatus, setlivestatus] = useState('Yes');
    const ROYALTY_MAX = 25;
    const [totalNFT, setTotalNFT] = useState('');
    const [createRoyalties, setCreatorRoyalties] = useState('');
    const [hideMetadataPurchase, setHideMetadataPurchase] = useState(true);
    const [hideEntireMetadata, setHideEntireMetadata] = useState(true);
    const [charities, setCharities] = useState('');
    const [charity, setCharity] = useState('');
    const [charityPercentage, setCharityPercenetage] = useState('');
    const [proceedSplit, setProceedSplit] = useState('');
    const [prceedPercentage, setPrceedPercentage] = useState('');

    const handlePlaceholderImage = (e) => {
        setPlaceholderImage(e.target.files);

    }
    console.log(placeholderImage, "PlaceholderImage")

    const mediaeyenetworks = () => {
        return (
            <>
                <div
                    className={`mediaeyetoken-box ${activeNetwork === process.env.REACT_APP_BSC_CHAIN_NAME
                        ? 'active'
                        : ''
                        }`}
                >
                    <div
                        className="mediaeyetoken-box-inner"
                        onClick={async () => {
                            if (activeNetwork != process.env.REACT_APP_BSC_CHAIN_NAME) {
                                await ChangeChainRequest(process.env.REACT_APP_BSC_CHAIN_NAME);
                            }
                        }}
                    >
                        <div className="mediaeyetoken-box-circle"></div>
                        <div className="mediaeyetoken-box-icon">
                            <img src={GetNetworkIcon('BNB')} alt="BNB" />
                        </div>
                        <div className="mediaeyetoken-box-content">
                            <div className="mediaeyetoken-box-content-name">BSC</div>
                        </div>
                    </div>
                </div>

                <div
                    className={`mediaeyetoken-box ${activeNetwork === 'ETH' ? 'active' : ''
                        }`}
                >
                    <div
                        className="mediaeyetoken-box-inner"
                        onClick={async () => {
                            if (activeNetwork != 'ETH') {
                                await ChangeChainRequest('ETH');
                            }
                        }}
                    >
                        <div className="mediaeyetoken-box-circle"></div>
                        <div className="mediaeyetoken-box-icon">
                            <img src={GetNetworkIcon('ETH')} alt="ETH" />
                        </div>
                        <div className="mediaeyetoken-box-content">
                            <div className="mediaeyetoken-box-content-name">ETH</div>
                        </div>
                    </div>
                </div>

                <div
                    className={`mediaeyetoken-box ${activeNetwork === 'FTM' ? 'active' : ''
                        }`}
                >
                    <div
                        className="mediaeyetoken-box-inner"
                        onClick={async () => {
                            if (activeNetwork != 'FTM') {
                                await ChangeChainRequest('FTM');
                            }
                        }}
                    >
                        <div className="mediaeyetoken-box-circle"></div>
                        <div className="mediaeyetoken-box-icon">
                            <img src={GetNetworkIcon('FTM')} alt="FTM" />
                        </div>
                        <div className="mediaeyetoken-box-content">
                            <div className="mediaeyetoken-box-content-name">FTM</div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div className="Collection-setting-page">
            <div className="mediaeye-layout-container">
                <div className="mediaeye-layout-container-header">
                    <div className="mediaeye-layout-container-header-heading">
                        <h2>Base Settings</h2>
                    </div>
                </div>
                <div className="Collection-setting-page-inner m-b-50">
                    <div className="Collection-setting-page-inner-blockchain-collection">
                        <div className="Collection-setting-page-inner-blockchain-collection-card">
                            <div className="Collection-setting-page-inner-blockchain-collection-card-header">
                                <div className="Collection-setting-page-inner-blockchain-collection-card-header-heading">
                                    Choose Blockchain
                                </div>
                            </div>
                            <div className="Collection-setting-page-inner-blockchain-collection-card-body m-t-20">
                                <div className="mediaeyetoken" size={3}>
                                    {mediaeyenetworks()}
                                </div>
                            </div>
                        </div>
                        <div className="Collection-setting-page-inner-blockchain-collection-content m-t-30">
                            <div className="mediaeyeform-group Collection-setting-page-inner-blockchain-collection-content-shorinput">
                                <label className="mediaeyeform-label" htmlFor="collectionName">
                                    Collection Name
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <input
                                        id="collectionName"
                                        className="mediaeyeform-input"
                                        type="text"
                                        name="Collection-name"
                                    />
                                </div>
                            </div>
                            <div className="Collection-setting-page-inner-blockchain-collection-content-inner m-t-30">
                                <div className="mediaeyeform-group">
                                    <label
                                        className="mediaeyeform-label mediaeyeinfo"
                                        htmlFor="creatorRoyalties"
                                    >
                                        Total Number of NFTs
                                        <span
                                            className="mediaeyeinfo-sign"
                                            data-class="mediaeyetooltip"
                                            data-tip="Royaties payout to be sent to the current wallet address"
                                        >
                                            <InfoCircle type="outline-white" />
                                        </span>{' '}
                                    </label>
                                    <div className="mediaeyeform-group-input">
                                        <input
                                            id="creatorRoyalties"
                                            type="text"
                                            className="mediaeyeform-input"
                                            placeholder="10 000"
                                            value={totalNFT}
                                            onChange={(e) => {
                                                const re = /^[0-9\b]+$/;
                                                let value = allowOnlyNumber(e.target.value, false);
                                                if (value === '' || re.test(value)) {
                                                    value <= 10000 ? setTotalNFT(value) : setTotalNFT(10000);
                                                }
                                            }}
                                        />
                                        <span className="mediaeyeform-group-input-max">MAX</span>
                                    </div>
                                    <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                        <span>Amount of tokens that will be generated</span>
                                    </div>
                                </div>
                                <div className="mediaeyeform-group">
                                    <label
                                        className="mediaeyeform-label"
                                        htmlFor="collectionName"
                                    >
                                        Token Symbol
                                    </label>
                                    <div className="mediaeyeform-group-input">
                                        <input
                                            id="collectionName"
                                            className="mediaeyeform-input"
                                            type="text"
                                            name="Collection-name"
                                        />
                                    </div>
                                    <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                        <span>Short name for your Token</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Collection-setting-page-inner-metadata">
                        <div className="Collection-setting-page-inner-metadata-header">
                            Metadata
                        </div>
                        <span className="m-t-5 text-semitransperant">
                            Format your Collection Metadata
                        </span>
                        <div className="Collection-setting-page-inner-metadata-inner">
                            <div className="Collection-setting-page-inner-metadata-inner-left">
                                <div className="mediaeyeform-group">
                                    <label className="mediaeyeform-label" htmlFor="nftName">
                                        NFT Name
                                    </label>
                                    <div className="mediaeyeform-group-input">
                                        <input
                                            id="nftName"
                                            className="mediaeyeform-input"
                                            type="text"
                                            name="nft-name"
                                            placeholder="{{collection}} #{{id}}"
                                        />
                                    </div>
                                    <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                        <span>Naming pattern to generate a name for each NFT.</span>
                                    </div>
                                </div>
                                <div className="mediaeyeform-group m-t-30">
                                    <label className="mediaeyeform-label" htmlFor="external-url">
                                        NFT External URL
                                    </label>
                                    <div className="mediaeyeform-group-input">
                                        <input
                                            id="collectionName"
                                            className="mediaeyeform-input"
                                            type="text"
                                            name="external-url"
                                            placeholder="https://example.com/token/{{id}}"
                                        />
                                    </div>
                                    <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                        <span>
                                            This URL will appear next to the NFT and will allow users
                                            to see the NFT on your site.
                                        </span>
                                    </div>
                                </div>
                                <div className="mediaeyeform-group m-t-30">
                                    <label className="mediaeyeform-label" htmlFor="description">
                                        NFT Description
                                    </label>
                                    <div className="mediaeyetextarea">
                                        <textarea
                                            id="description"
                                            className="mediaeyetextarea-input"
                                            rows="5"
                                            placeholder="Create a short description for your NFT. "
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="Collection-setting-page-inner-metadata-inner-right">
                                <div className="mediaeyefancyScroll Collection-setting-page-inner-metadata-inner-right-data">
                                    <span>
                                        attributes [9]
                                        <br />
                                        <br />
                                        <br />0{2}
                                        <br />
                                        trait_type:"1.Background"
                                        <br />
                                        value :"turquoise"
                                        <br />1{8}
                                        <br />2{7}
                                        <br />3{5}
                                        <br />4{2}
                                        <br />5{2}
                                        <br />6{3}
                                        <br />7{2}
                                        <br />8{2}
                                        <br />
                                        name:"131313"
                                        <br />
                                        external_url:"1313131313"
                                        <br />
                                        description:"A human readable
                                        <br />
                                        description of your
                                        <br />
                                        Collection. Markdown is
                                        <br />
                                        supported."
                                        <br />
                                        name:"131313"
                                        <br />
                                        external_url:"1313131313"
                                        <br />
                                        description:"A human readable
                                        <br />
                                        description of your
                                        <br />
                                        Collection. Markdown is
                                        <br />
                                        supported."
                                        <br />
                                        name:"131313"
                                        <br />
                                        external_url:"1313131313"
                                        <br />
                                        description:"A human readable
                                        <br />
                                        description of your
                                        <br />
                                        Collection. Markdown is
                                        <br />
                                        supported."
                                        <br />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Collection-setting-page-inner-reveal">
                        <div className="Collection-setting-page-inner-reveal-header">
                            <span className="Collection-setting-page-inner-reveal-header-title">
                                Delayed Reveal
                            </span>
                            <div className="mediaeyeform-label mediaeyeswitch">
                                <Switch
                                    className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${toggleDelayedReveal ? 'active' : ''
                                        }`}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    onChange={() => {
                                        setToggleDelayedReveal(!toggleDelayedReveal);
                                    }}
                                    checked={toggleDelayedReveal}
                                    height={21}
                                    width={50}
                                />
                            </div>
                        </div>
                        <span className="m-t-5 text-semitransperant">
                            Turning this OFF will reveal tokens as they are minted.
                        </span>
                        <div className="Collection-setting-page-inner-reveal-uploader m-t-30">
                            <span className="Collection-setting-page-inner-reveal-uploader-title">
                                Placeholder Image
                            </span>
                            <div className="Collection-setting-page-inner-reveal-uploader-input m-t-10 m-b-10">
                                <input type="file" onChange={handlePlaceholderImage} />
                                {
                                    placeholderImage.length > 0 ?

                                        <img src={URL.createObjectURL(placeholderImage[0])} />
                                        :
                                        <div className="Collection-setting-page-inner-reveal-uploader-input-text">
                                            <div>
                                                <RightSideArrow />
                                            </div>
                                            <span className="text-semitransperant">Choose file</span>
                                        </div>
                                }
                            </div>
                            <span className="Collection-setting-page-inner-reveal-uploader-subtitle m-t-10 text-semitransperant">
                                This will be the image for the NFT until you <br /> trigger the
                                reveal.
                            </span>
                        </div>
                        <div className="Collection-setting-page-inner-reveal-bottom m-t-30">

                            <div className='Collection-setting-page-inner-reveal-bottom-radiobtn'>
                                <div className='Collection-setting-page-inner-reveal-bottom-radio' onClick={() => setHideMetadataPurchase(!hideMetadataPurchase)}><Radiobox type={hideMetadataPurchase} /></div>
                                <label htmlFor="Yes">
                                    Hide metadata of entire collection to be shown at once
                                </label>
                            </div>
                            <div className='Collection-setting-page-inner-reveal-bottom-radiobtn'>
                                <div className='Collection-setting-page-inner-reveal-bottom-radio' onClick={() => setHideEntireMetadata(!hideEntireMetadata)}><Radiobox type={hideEntireMetadata} /></div>
                                <label htmlFor="Yes">
                                    Hide metadata of entire collection to be shown at once
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="Collection-setting-page-inner-bottom">
                        <div className="Collection-setting-page-inner-bottom-title">
                            Splitting the proceeds
                        </div>
                        <div className="Collection-setting-page-inner-bottom-row m-t-50">
                            <div className="mediaeyeform-group">
                                <label
                                    className="mediaeyeform-label mediaeyeinfo"
                                    htmlFor="creatorRoyalties"
                                >
                                    Creator Royalties
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <input
                                        id="creatorRoyalties"
                                        type="number"
                                        className="mediaeyeform-input"
                                        placeholder="5.00"
                                        value={createRoyalties}
                                        onChange={(e) => { e.target.value > 0 && e.target.value <= 5 ? setCreatorRoyalties(e.target.value) : setCreatorRoyalties(0) }}
                                    />
                                    <span className="mediaeyeform-group-input-max">MAX</span>
                                </div>
                                <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                    <span>% of Creator royalties.</span>
                                </div>
                            </div>
                            <div className="mediaeyeform-group">
                                <label
                                    className="mediaeyeform-label mediaeyeinfo"
                                    htmlFor="creatorRoyalties"
                                >
                                    <img src={charityImage} /> <span className="m-l-5">Charity</span>
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <div className="mediaeye-searchbar">
                                        <input type="number" placeholder="Select Charity"
                                            value={charity}
                                            onChange={(e) => { e.target.value > 0 ? setCharity(e.target.value) : setCharity('') }}
                                        />
                                    </div>
                                    <input
                                        id="creatorRoyalties"
                                        type="number"
                                        className="mediaeyeform-input"
                                        value={charityPercentage}
                                        onChange={(e) => { e.target.value > 0 ? setCharityPercenetage(e.target.value) : setCharityPercenetage('') }}
                                    />
                                    <span className="mediaeyeform-group-input-max">%</span>
                                </div>
                                <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                    <span>
                                        % of the royalties to donate to a <br />
                                        Charitable Organization.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="Collection-setting-page-inner-bottom-row shortInput m-t-20">
                            <div className="mediaeyeform-group">
                                <label
                                    className="mediaeyeform-label mediaeyeinfo"
                                    htmlFor="creatorRoyalties"
                                >
                                    Set Proceed Split
                                    <span
                                        className="mediaeyeinfo-sign"
                                        data-class="mediaeyetooltip"
                                        data-tip="Royaties payout to be sent to the current wallet address"
                                    >
                                        <InfoCircle type="outline-white" />
                                    </span>{' '}
                                </label>
                                <div className="mediaeyeform-group-input">
                                    <input
                                        id="creatorRoyalties"
                                        type="number"
                                        className="mediaeyeform-input"
                                        placeholder="0bbx....3434"
                                        value={proceedSplit}
                                        onChange={(e) => { e.target.value > 0 ? setProceedSplit(e.target.value) : setProceedSplit('') }}
                                    />
                                    <input
                                        id="creatorRoyalties"
                                        type="number"
                                        className="mediaeyeform-input shortone"
                                        placeholder="10"
                                        value={prceedPercentage}
                                        onChange={(e) => { e.target.value > 0 && e.target.value <= 10 ? setPrceedPercentage(e.target.value) : setPrceedPercentage('') }}
                                    />
                                    <span className="mediaeyeform-group-input-max">MAX %</span>
                                </div>
                                <div className="mediaeyeform-group-input-error-message text-semitransperant">
                                    <span>Share revenue with selected wallet.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-square btn-gaming">Save</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
