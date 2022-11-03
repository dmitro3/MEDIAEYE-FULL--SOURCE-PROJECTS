import React from 'react'
import { Horizontal } from '../Icons'
import './GenerativeLanding.scss'

export default function GenerativeInnerContent() {
    return (


        <div className='generative-landing-inner-head m-t-20'>
            <div className="mediaeyeform-group">
                <div className="mediaeyetextarea">
                    <textarea
                        className="mediaeyetextarea-input"
                        rows="3"
                        placeholder='Description'
                    ></textarea>
                </div>
            </div>
            <div className='generative-landing-inner-head-right'>
                <div className='generative-landing-inner-head-right-freemint'>
                    <div className='generative-landing-inner-head-right-freemint-left'>
                        <span className='generative-landing-inner-head-right-freemint-left-text'>Free Mint</span>
                        <span className='text-semitransperant'>Starts in</span>
                    </div>
                    <div className='generative-landing-inner-head-right-freemint-middle'>
                        <div className='generative-landing-inner-head-right-freemint-middle-box'>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-letter'>3</span>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-time text-semitransperant'>Days</span>
                        </div>
                        <div className='generative-landing-inner-head-right-freemint-middle-box'>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-letter'>13</span>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-time text-semitransperant'>Hrs</span>
                        </div>
                        <div className='generative-landing-inner-head-right-freemint-middle-box'>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-letter'>11</span>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-time text-semitransperant'>Mins</span>
                        </div>
                        <div className='generative-landing-inner-head-right-freemint-middle-box'>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-letter'>17</span>
                            <span className='generative-landing-inner-head-right-freemint-middle-box-time text-semitransperant'>Secs</span>
                        </div>
                    </div>
                    <div className='generative-landing-inner-head-right-freemint-end'>
                        <Horizontal />
                    </div>
                </div>
            </div>
        </div>
    )
}
