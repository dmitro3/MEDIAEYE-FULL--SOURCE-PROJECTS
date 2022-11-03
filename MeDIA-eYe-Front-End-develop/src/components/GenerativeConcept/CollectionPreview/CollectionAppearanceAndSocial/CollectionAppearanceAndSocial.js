import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ConnectSocial from '../../../CreateProduct/Addons/ConnectSocial/ConnectSocial';
import { ImagePlug, RightSideArrow, User } from '../../../Icons';
import './CollectonAppreanceAndSocial.scss'

export default function CollectionAppearanceAndSocial() {
    const [uploads, setUploads] = useState([]);
    const [collectionpreview, setCollectionPreview] = useState([]);
    const [logo, setLogo] = useState([]);
    const [cardLogo, setCardLogo] = useState([]);
    const [links, setLinks] = useState({
        website: '',
        discord: '',
        twitter: '',
        instagram: '',
        medium: '',
        telegram: '',
        twitch: '',
        flickr: '',
        linkedin: '',
        spotify: ''
    });

    const changeSocialLinks = (link, value) => {
        setLinks({ ...links, [link]: value });
    };

    const handleChange = (e) => {
        console.log(e.target.files);
        setUploads(e.target.files);
    };
    const handleCardLogo = (e) => {
        setCardLogo(e.target.files)
    }

    const handleCollectionPreview = (e) => {
        setCollectionPreview(e.target.files)
    }
    const handleLogo = (e) => {
        setLogo(e.target.files)
    }

    return (
        <div className='appearance-and-social m-t-50'>
            <div className='mediaeye-layout-container'>
                <div className='appearance-and-social-inner'>
                    <div className='flex-align'>
                        <div className='appearance-and-social-inner-cardpreview'>
                            <span className='appearance-and-social-inner-cardpreview-title'>Collection Card Preview</span>
                            <div className="mediaeye-collection-card m-t-10">
                                <div
                                    className="mediaeye-collection-card-inner"
                                >
                                    <div className="mediaeye-collection-card-inner-imgbox">

                                        <div className='mediaeye-collection-card-inner-imgbox-text'>
                                            <div><RightSideArrow /></div>
                                            <span>Choose file</span>
                                        </div>
                                        <input className='mediaeye-collection-card-inner-imgbox-input' type="file" onChange={handleChange} />
                                        {
                                            uploads.length > 0 ?
                                                <div className='mediaeye-collection-card-inner-imgbox-slide'>
                                                    <img className="mediaeye-collection-card-inner-imgbox-slide-img" src={URL.createObjectURL(uploads[0])} />
                                                </div>
                                                :
                                                null
                                        }

                                        <div className="mediaeye-collection-card-inner-content-logo">

                                            {cardLogo.length > 0 ?
                                                <img className='mediaeye-collection-card-inner-content-logo-image' src={URL.createObjectURL(cardLogo[0])} />
                                                :
                                                <>
                                                    <input className='mediaeye-collection-card-inner-content-logo-input' type="file" onChange={handleCardLogo} />
                                                    <div>
                                                        <User />
                                                    </div>
                                                    {/* <img
                                                    src="'/img/user/elon_musk.png'"
                                                    className="mediaeye-collection-card-inner-content-logo-img"
                                                    alt="Logo"
                                                /> */}
                                                </>
                                            }
                                        </div>
                                    </div>
                                    <div className="mediaeye-collection-card-inner-content">
                                        <div className="mediaeye-collection-card-inner-content-inner">
                                            <div className="mediaeye-collection-card-inner-content-top">
                                                <div className="mediaeye-collection-card-inner-content-top-left">
                                                    <div className="mediaeye-collection-card-inner-content-title">
                                                        Enter Name
                                                    </div>
                                                    <div className="mediaeye-collection-card-inner-content-creator">
                                                        <div className="mediaeye-collection-card-inner-content-creator-heading">
                                                            Creator:
                                                        </div>
                                                        User
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mediaeye-collection-card-inner-content-middle">
                                                <div className="mediaeye-collection-card-inner-content-des">
                                                    Here will be a description that the creator of NFT came up with for his work. A limit on the number of characters will be displayed in the corner
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='appearance-and-social-inner-collectiondes m-t-20'>
                            <div className='appearance-and-social-inner-collectiondes-inner'>
                                <div className="mediaeyeform-group">
                                    <label className="mediaeyeform-label">Collection Description</label>
                                    <div className="mediaeyetextarea">
                                        <textarea
                                            className="mediaeyetextarea-input"
                                            rows="12"
                                            placeholder='Create a short description for your NFT. '
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='appearance-and-social-inner-collectionpreview m-t-50'>
                        <span className='appearance-and-social-inner-collectionpreview-title'>Collection Page Preview</span>
                        <div className='appearance-and-social-inner-collectionpreview-inner'>
                            {collectionpreview.length > 0 ?
                                <img src={URL.createObjectURL(collectionpreview[0])} /> : null}

                            <input className={collectionpreview.length > 0 ? 'available' : null} type="file" onChange={handleCollectionPreview} />
                            {collectionpreview.length > 0 ?
                                null
                                :
                                <div className='appearance-and-social-inner-collectionpreview-inner-text'>
                                    <div><RightSideArrow /></div>
                                    <span>Choose file</span>
                                    <div className='text-semitransperant'>Size 1920x480px</div>
                                </div>
                            }
                        </div>
                        <div className='appearance-and-social-inner-collectionpreview-logo'>
                            {logo.length > 0 ? null : <div className='appearance-and-social-inner-collectionpreview-logo-text'>
                                <div className='m-t-10'><RightSideArrow /></div> </div>}
                            <input type="file" onChange={handleLogo} />
                            {logo.length > 0 ? <img src={URL.createObjectURL(logo[0])} /> : null}

                        </div>
                    </div>
                    <div className='appearance-and-social-inner-social m-t-50'>
                        <ConnectSocial
                            socialLinks={links}
                            changeSocialLinks={changeSocialLinks}
                        />
                    </div>
                    <div className='m-t-50 text-center'><button className='btn btn-square btn-gaming'>Save</button></div>
                </div>
            </div>
        </div>
    )
}
