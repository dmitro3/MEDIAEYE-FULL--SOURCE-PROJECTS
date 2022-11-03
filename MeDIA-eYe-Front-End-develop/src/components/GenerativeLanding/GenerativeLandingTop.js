import React, { useState } from 'react'
import { Copy, Discord, Globe, Instagram, InstagramIcon, MinusCloseIcon, Refresh, RightSideArrow, Telegram, Twitter, Upload, Varify } from '../Icons'
import './GenerativeLanding.scss'
import banner from '../../assets/img/generativeCollection/landingBanner.png'
import { useHistory } from 'react-router-dom';

export default function GenerativeLandingTop(props) {
    const { collection } = props;
    const [bannerUpload, setBannerUpload] = useState();
    const history = useHistory();

    const handleBannerupload = (e) => {
        setBannerUpload(e.target.files);
    };
    return (
        <div className="generative-landing-top">
            {
                collection ? null :

                    <input
                        className="generative-landing-top-input"
                        type="file"
                        onChange={handleBannerupload}
                    />
            }

            {!bannerUpload && !collection ? (
                <div className="generative-landing-top-uploadtext">
                    <div className="generative-landing-top-uploadtext-icon">
                        <Upload upload={'arrowWithLine'} />
                    </div>
                    <span className="generative-landing-top-uploadtext-title">
                        Choose file
                    </span>
                    <span className="text-semitransperant">Size 1920x480px</span>
                </div>
            ) : null}
            {bannerUpload?.length > 0 && !collection ? (
                <img
                    className="generative-landing-top-banner"
                    src={URL.createObjectURL(bannerUpload[0])}
                />
            ) : null}
            {
                collection ?
                    <img
                        className="generative-landing-top-banner"
                        src={banner}
                    />
                    :
                    null
            }
            {bannerUpload?.length > 0 && !collection ? (
                <>
                    <div className="generative-landing-top-reupload">
                        <div className="generative-landing-top-reupload-icon">
                            <Refresh />
                        </div>
                        <input
                            className="generative-landing-top-reupload-input"
                            type="file"
                            onChange={handleBannerupload}
                        />
                    </div>
                </>
            ) : null}
            <div className="generative-landing-top-profiletext">
                <div className="generative-landing-top-profiletext-title">
                    <span>AZUKI</span>
                    {/* <Varify /> */}
                </div>
                <div className='flex-between'>
                    <div className="generative-landing-top-profiletext-details m-t-50">
                        <button className="btn btn-square btn-gaming" onClick={() => history.push('/collections')}>
                            {collection === 'minting' ? 'Minting' : collection === 'hidden' ? "Edit Landing Page" : 'View Collection'}
                        </button>
                        <div className="generative-landing-top-profiletext-details-icons">
                            <div className="generative-landing-top-profiletext-details-icons-globe">
                                {' '}
                                <Globe />
                            </div>
                            <div className="generative-landing-top-profiletext-details-icons-insta">
                                {' '}
                                <Instagram type={'outlined'} />
                            </div>
                            <div className="generative-landing-top-profiletext-details-icons-telegram">
                                {' '}
                                <Telegram />
                            </div>
                            <div className="generative-landing-top-profiletext-details-icons-twitter">
                                <Twitter />
                            </div>
                            <div className="generative-landing-top-profiletext-details-icons-discord">
                                <Discord />
                            </div>
                        </div>
                        <div className="generative-landing-top-profiletext-details-data">
                            <div className="generative-landing-top-profiletext-details-data-row1">
                                <span className="text-semitransperant">Created by</span>
                                <span>Artist_98756</span>
                            </div>
                            <div className="generative-landing-top-profiletext-details-data-row2">
                                <span className="text-semitransperant">Address</span>
                                <span>
                                    0x306...f989 <Copy />
                                </span>
                            </div>
                        </div>
                    </div>
                    {
                        collection === 'minting' ?
                            <div className='generative-landing-top-profiletext-right'>
                                <div className='generative-landing-top-profiletext-right-block'>
                                    <span>7.5 K </span>
                                    <span className='subtitle'>Items</span>
                                </div>
                                <div className='generative-landing-top-profiletext-right-block'>
                                    <span>102 </span>
                                    <span className='subtitle'>Owners</span>
                                </div>
                                <div className='generative-landing-top-profiletext-right-block'>
                                    <span>0.012 ETH </span>
                                    <span className='subtitle'>Floor price</span>
                                </div>
                                <div className='generative-landing-top-profiletext-right-block'>
                                    <span>3.9 ETH</span>
                                    <span className='subtitle'>Volume traded</span>
                                </div>
                                <div className='generative-landing-top-profiletext-right-block'>
                                    <span>9%</span>
                                    <span className='subtitle'>Royalty</span>
                                </div>
                                <div className='generative-landing-top-profiletext-right-block'>
                                    <span>16%</span>
                                    <span className='subtitle'>Listed</span>
                                </div>
                                <div className='generative-landing-top-profiletext-right-block no-border'>
                                    <span>2022-09-23</span>
                                    <span className='subtitle'>Created</span>
                                </div>
                            </div>
                            : null
                    }

                </div>
            </div>
        </div>

    )
}
