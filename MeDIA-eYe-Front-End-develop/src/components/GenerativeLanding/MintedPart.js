import { Slider } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toggleGeneratiedAccessPass } from '../../store/app/appSlice';
import './GenerativeLanding.scss'
import InputField from './InputField/InputField'

export default function MintedPart() {
    const [mainImage, setMainImage] = useState();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(0);
    return (
        <div className='generative-landing-inner-minted m-t-30'>
            <div className='generative-landing-inner-minted-content'>
                <div className='generative-landing-inner-minted-content-left'>
                    <div className='generative-landing-inner-minted-content-left-main'>
                        <div className='generative-landing-inner-minted-content-left-main-title'>
                            <div className='generative-landing-inner-minted-content-left-main-title-heading'>
                                <span>Total minted</span>
                                <div className='generative-landing-inner-minted-content-left-main-title-heading-text'>44% <span className='text-semitransperant'>(2 125/5 550)</span></div>
                            </div>
                            <Slider
                                disableRipple
                                value={44}
                                sx={{
                                    color: "#FFF",
                                    '& .MuiSlider-thumb': {
                                        width: 4,
                                        height: 4
                                    },
                                    '& .MuiSlider-thumb:hover': {
                                        boxShadow: "none!important"
                                    }
                                }} />
                        </div>
                        <div className='generative-landing-inner-minted-content-left-main-imguploader'>
                            <InputField mainImage={mainImage} />
                        </div>
                    </div>
                    <div className='generative-landing-inner-minted-content-left-subblock'>
                        <div className='generative-landing-inner-minted-content-left-subblock-box'>
                            <InputField />
                        </div>
                        <div className='generative-landing-inner-minted-content-left-subblock-box'>
                            <InputField />
                        </div>
                    </div>
                </div>
                <div className='generative-landing-inner-minted-content-right'>
                    <div className='generative-landing-inner-minted-content-right-title'>
                        <span>Mint schedule</span>
                        <button className='btn btn-square btn-transperant' onClick={() => dispatch(toggleGeneratiedAccessPass({ accessFrom: 'mint' }))}>Access Passes</button>
                    </div>
                    <div className='generative-landing-inner-minted-content-right-list'>
                        <div className='generative-landing-inner-minted-content-right-list-box'>
                            <span className='generative-landing-inner-minted-content-right-list-box-heading'>Free Mint</span>
                            <span >September 21 at 3:00 PM </span>
                            <div className='generative-landing-inner-minted-content-right-list-box-data'>
                                <span className='text-semitransperant'> Stage Description</span>
                                <div className='generative-landing-inner-minted-content-right-list-box-data-right'>
                                    <span className='text-semitransperant'>Price</span>
                                    <div>0.06 ETH</div>
                                    <span className='text-semitransperant'>max per wallet</span>
                                    <div>20</div>
                                </div>
                            </div>
                        </div>
                        <div className='generative-landing-inner-minted-content-right-list-box'>
                            <span className='generative-landing-inner-minted-content-right-list-box-heading'>Pre-Sale</span>
                            <span >September 21 at 3:00 PM </span>
                            <div className='generative-landing-inner-minted-content-right-list-box-data'>
                                <span className='text-semitransperant'> Stage Description</span>
                                <div className='generative-landing-inner-minted-content-right-list-box-data-right'>
                                    <span className='text-semitransperant'>Price</span>
                                    <div>0.06 ETH</div>
                                    <span className='text-semitransperant'>max per wallet</span>
                                    <div>20</div>
                                </div>
                            </div>
                        </div>
                        <div className='generative-landing-inner-minted-content-right-list-box'>
                            <span className='generative-landing-inner-minted-content-right-list-box-heading'>Public</span>
                            <span >September 21 at 3:00 PM </span>
                            <div className='generative-landing-inner-minted-content-right-list-box-data'>
                                <span className='text-semitransperant'> Stage Description</span>
                                <div className='generative-landing-inner-minted-content-right-list-box-data-right'>
                                    <span className='text-semitransperant'>Price</span>
                                    <div>0.06 ETH</div>
                                    <span className='text-semitransperant'>max per wallet</span>
                                    <div>20</div>
                                </div>
                            </div>
                        </div>
                        <div className='generative-landing-inner-minted-content-right-list-box promo'>
                            <span className='generative-landing-inner-minted-content-right-list-box-heading'>I have Promo Code</span>
                            <div className='generative-landing-inner-minted-content-right-list-box-data'>
                                <div className='generative-landing-inner-minted-content-right-list-box-data-right'>
                                    <div className="mediaeyeform-group-input whitelisted">
                                        <input
                                            className="mediaeyeform-input"
                                            type="text"
                                            placeholder='Check if you are Whitelisted'
                                        />
                                    </div>
                                    <button className='btn btn-square btn-transperant'>Check</button>
                                </div>
                                <div className='generative-landing-inner-minted-content-right-list-box-data-right'>
                                    <div className="mediaeyeform-group-input">
                                        <span className='mediaeyeform-group-input-plus' onClick={() => { inputValue > 0 ? setInputValue(inputValue - 1) : setInputValue(inputValue) }}>-</span>
                                        <input
                                            className="mediaeyeform-input"
                                            type="number"
                                            placeholder='10'
                                            value={inputValue}
                                        />
                                        <span className='mediaeyeform-group-input-max' onClick={() => setInputValue(inputValue + 1)}>+</span>
                                    </div>
                                    <button className='btn btn-square btn-gaming'>Mint NFT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
