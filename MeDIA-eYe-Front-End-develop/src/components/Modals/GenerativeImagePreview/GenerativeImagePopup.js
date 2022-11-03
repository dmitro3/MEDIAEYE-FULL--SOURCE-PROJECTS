import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeGenerativeImagePopup } from '../../../store/app/appSlice';
import { CloseIcon, IndicatorLeft, Transfer, Upload } from '../../Icons';
import './GenerativeImagePopup.scss'
import image from '../../../assets/img/generativeCollection/rectangleImage.png'

export default function GenerativeImagePopup(props) {
    const showGenerativeImagePreview = useSelector((state) => state.app.showGenerativeImagePreview);
    const dispatch = useDispatch();
    const handleUpload = () => {
        dispatch(closeGenerativeImagePopup());

    }

    return (
        <>
            {showGenerativeImagePreview ? (
                <div
                    className={
                        showGenerativeImagePreview ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper"
                        onClick={() => dispatch(closeGenerativeImagePopup())}
                    >
                        <div
                            className="mediaeye-popup-content generative-preview-popup"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="mediaeye-popup-content-inner">
                                <div
                                    className="mediaeye-popup-close"
                                    onClick={() => dispatch(closeGenerativeImagePopup())}
                                >
                                    <CloseIcon />
                                </div>
                                <div className='generative-preview-popup-inner'>
                                    <div className='generative-preview-popup-inner-content'>
                                        <div className='generative-preview-popup-inner-content-left'>
                                            <img src={image} alt='Main Image' />
                                        </div>
                                        <div className='generative-preview-popup-inner-content-right'>
                                            <div className='generative-preview-popup-inner-content-right-title text-grayShade'>Collection #287222598</div>
                                            <div className='generative-preview-popup-inner-content-right-name'>Name of NFT # 12/30</div>
                                            <div className='generative-preview-popup-inner-content-right-properties'>
                                                <div className='generative-preview-popup-inner-content-right-properties-title'>
                                                    <IndicatorLeft />
                                                    <span>Properties</span>
                                                </div>
                                                <div className='generative-preview-popup-inner-content-right-properties-inner'>
                                                    <div className='generative-preview-popup-inner-content-right-properties-inner-card'>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-name'>COLLECTION</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-collection'>Genesis</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-traits'>49% have this trait</span>
                                                    </div>
                                                    <div className='generative-preview-popup-inner-content-right-properties-inner-card'>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-name'>COLLECTION</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-collection'>Genesis</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-traits'>49% have this trait</span>
                                                    </div>
                                                    <div className='generative-preview-popup-inner-content-right-properties-inner-card'>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-name'>COLLECTION</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-collection'>Genesis</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-traits'>49% have this trait</span>
                                                    </div>
                                                    <div className='generative-preview-popup-inner-content-right-properties-inner-card'>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-name'>COLLECTION</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-collection'>Genesis</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-traits'>49% have this trait</span>
                                                    </div>
                                                    <div className='generative-preview-popup-inner-content-right-properties-inner-card'>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-name'>COLLECTION</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-collection'>Genesis</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-traits'>49% have this trait</span>
                                                    </div>
                                                    <div className='generative-preview-popup-inner-content-right-properties-inner-card'>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-name'>COLLECTION</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-collection'>Genesis</span>
                                                        <span className='generative-preview-popup-inner-content-right-properties-inner-card-traits'>49% have this trait</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='generative-preview-popup-inner-bottom'>
                                        <div className='generative-preview-popup-inner-bottom-left'>
                                            <button className='btn btn-square btn-transperant'><span>Metadata</span> <Upload /></button>
                                            <button className='btn btn-square btn-transperant'><span>Preview</span> <Upload /></button>
                                        </div>
                                        <div>
                                            <button className='btn btn-square btn-gaming' onClick={() => handleUpload()}>Set as 1 of 1</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
