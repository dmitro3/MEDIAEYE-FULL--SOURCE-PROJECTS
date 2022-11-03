import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeEditBackgroundPopup } from '../../../store/app/appSlice';
import { CloseIcon } from '../../Icons';
import demo from '../../../assets/img/generativeCollection/rectangleImage.png'
import './EditBackgroundPopup.scss'
import { Slider } from '@mui/material';

export default function EditBackgroundPopup() {
    const dispatch = useDispatch();
    const showEditBackgroundPopup = useSelector((state) => state.app.showEditBackgroundPopup);
    const [activeHash, setActiveHash] = useState('hash');
    return (
        <>
            {showEditBackgroundPopup ? (
                <div
                    className={
                        showEditBackgroundPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper scrolled"
                        onClick={() => dispatch(closeEditBackgroundPopup())}
                    >
                        <div
                            className="mediaeye-popup-content edit-background"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="mediaeye-popup-content-inner">
                                <div
                                    className="mediaeye-popup-close"
                                    onClick={() => dispatch(closeEditBackgroundPopup())}
                                >
                                    <CloseIcon />
                                </div>
                                <div className='edit-background-inner'>
                                    <div className='edit-background-inner-title'><span>Edit Background Attribute</span></div>
                                    <div className='edit-background-inner-metadata common-section'>
                                        <span className='edit-background-inner-metadata-maintitle'>Metadata</span>
                                        <span className='edit-background-inner-metadata-subtitle text-grayShade'> Manage how this Attribute appears in your Tokens Metadata.</span>
                                        <div className='edit-background-inner-metadata-attribute m-t-20'>
                                            <label for="collectionName">Attribute Name</label>
                                            <div className="mediaeyeform-group-input m-t-5">
                                                <input
                                                    id="collectionName"
                                                    className='mediaeyeform-input'
                                                    value={'Background'}
                                                    type="text"
                                                    name="Collection-name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='edit-background-inner-trait common-section'>
                                        <span className='edit-background-inner-trait-head'>Trait Rarity</span>
                                        <span className='edit-background-inner-trait-subhead text-grayShade'>Modify the Rarity Weight to change the estimated quantity and percentage of these Traits.</span>
                                        <div className='edit-background-inner-trait-content'>
                                            <div className='edit-background-inner-trait-content-heading'>
                                                <span>Est.#</span>
                                                <span>Est.%</span>
                                            </div>
                                            <div className='edit-background-inner-trait-content-data'>
                                                <div className='edit-background-inner-trait-content-data-inner'>
                                                    <div className='edit-background-inner-trait-content-data-inner-left'>
                                                        <img src={demo} alt="background image" />
                                                        <span>Blue</span>
                                                    </div>
                                                    <div className='edit-background-inner-trait-content-data-inner-right'>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-range'>
                                                            <Slider
                                                                disableRipple
                                                                sx={{
                                                                    color: "#FFF",
                                                                    '& .MuiSlider-thumb': {
                                                                        width: 12,
                                                                        height: 12
                                                                    },
                                                                    '& .MuiSlider-thumb:hover': {
                                                                        boxShadow: "none!important"
                                                                    }
                                                                }} />
                                                        </div>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-hashper'>
                                                            <span className={activeHash === 'hash' ? 'value' : ''} onClick={() => setActiveHash("hash")}>#</span>
                                                            <span className={activeHash === 'per' ? 'value' : ''} onClick={() => setActiveHash("per")}>%</span>
                                                        </div>
                                                        <span className='edit-background-inner-trait-content-data-inner-right-est'>119</span>
                                                        <span>11.88%</span>
                                                    </div>
                                                </div>
                                                <div className='edit-background-inner-trait-content-data-inner'>
                                                    <div className='edit-background-inner-trait-content-data-inner-left'>
                                                        <img src={demo} alt="background image" />
                                                        <span>Blue</span>
                                                    </div>
                                                    <div className='edit-background-inner-trait-content-data-inner-right'>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-range'>
                                                            <Slider
                                                                disableRipple
                                                                sx={{
                                                                    color: "#FFF",
                                                                    '& .MuiSlider-thumb': {
                                                                        width: 12,
                                                                        height: 12
                                                                    },
                                                                    '& .MuiSlider-thumb:hover': {
                                                                        boxShadow: "none!important"
                                                                    }
                                                                }} /></div>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-hashper'>
                                                            <span className={activeHash === 'hash' ? 'value' : ''} onClick={() => setActiveHash("hash")}>#</span>
                                                            <span className={activeHash === 'per' ? 'value' : ''} onClick={() => setActiveHash("per")}>%</span>
                                                        </div>
                                                        <span className='edit-background-inner-trait-content-data-inner-right-est'>119</span>
                                                        <span>11.88%</span>
                                                    </div>
                                                </div>
                                                <div className='edit-background-inner-trait-content-data-inner'>
                                                    <div className='edit-background-inner-trait-content-data-inner-left'>
                                                        <img src={demo} alt="background image" />
                                                        <span>Blue</span>
                                                    </div>
                                                    <div className='edit-background-inner-trait-content-data-inner-right'>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-range'>
                                                            <Slider
                                                                disableRipple
                                                                sx={{
                                                                    color: "#FFF",
                                                                    '& .MuiSlider-thumb': {
                                                                        width: 12,
                                                                        height: 12
                                                                    },
                                                                    '& .MuiSlider-thumb:hover': {
                                                                        boxShadow: "none!important"
                                                                    }
                                                                }} />
                                                        </div>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-hashper'>
                                                            <span className={activeHash === 'hash' ? 'value' : ''} onClick={() => setActiveHash("hash")}>#</span>
                                                            <span className={activeHash === 'per' ? 'value' : ''} onClick={() => setActiveHash("per")}>%</span>
                                                        </div>
                                                        <span className='edit-background-inner-trait-content-data-inner-right-est'>119</span>
                                                        <span>11.88%</span>
                                                    </div>
                                                </div>
                                                <div className='edit-background-inner-trait-content-data-inner'>
                                                    <div className='edit-background-inner-trait-content-data-inner-left'>
                                                        <img src={demo} alt="background image" />
                                                        <span>Blue</span>
                                                    </div>
                                                    <div className='edit-background-inner-trait-content-data-inner-right'>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-range'>
                                                            <Slider
                                                                disableRipple
                                                                sx={{
                                                                    color: "#FFF",
                                                                    '& .MuiSlider-thumb': {
                                                                        width: 12,
                                                                        height: 12
                                                                    },
                                                                    '& .MuiSlider-thumb:hover': {
                                                                        boxShadow: "none!important"
                                                                    }
                                                                }} />
                                                        </div>
                                                        <div className='edit-background-inner-trait-content-data-inner-right-hashper'>
                                                            <span className={activeHash === 'hash' ? 'value' : ''} onClick={() => setActiveHash("hash")}>#</span>
                                                            <span className={activeHash === 'per' ? 'value' : ''} onClick={() => setActiveHash("per")}>%</span>
                                                        </div>
                                                        <span className='edit-background-inner-trait-content-data-inner-right-est'>119</span>
                                                        <span>11.88%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='edit-background-inner-trait common-section'>
                                        <span className='edit-background-inner-trait-head'>Trait Rarity</span>
                                        <span className='edit-background-inner-trait-subhead text-grayShade'>Manage these Attributes overall Rarity. e.g Setting this to 20% means that about 20% of your Tokens will have the “Background” Attribute.</span>
                                        <span className='edit-background-inner-trait-head text-grayShade m-t-20'>Rarity Weight</span>
                                        <div className='edit-background-inner-trait-ratio'>
                                            <span>50%</span>
                                            <Slider
                                                disableRipple
                                                sx={{
                                                    color: "#FFF",
                                                    '& .MuiSlider-thumb': {
                                                        width: 12,
                                                        height: 12
                                                    },
                                                    '& .MuiSlider-thumb:hover': {
                                                        boxShadow: "none!important"
                                                    }
                                                }} />
                                            <span className='ratio-button'>50%</span>
                                        </div>
                                    </div>
                                    <div className='edit-background-inner-bottom m-t-20'>
                                        <button className='btn btn-square btn-transperant'>Discard Changes</button>
                                        <button className='btn btn-square btn-gaming'>Save Changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
