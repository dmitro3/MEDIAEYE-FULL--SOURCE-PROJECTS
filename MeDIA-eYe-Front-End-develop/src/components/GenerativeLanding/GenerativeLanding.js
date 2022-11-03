import React, { useState } from 'react';
import ContentWithSlider from './ContentWithSlider';
import FAQ from './FAQ';
import GenerativeInnerContent from './GenerativeInnerContent';
import './GenerativeLanding.scss';
import GenerativeLandingTop from './GenerativeLandingTop';
import MintedPart from './MintedPart';
import Team from './Team';
import { useHistory } from 'react-router-dom'

export default function GenerativeLanding() {
    const history = useHistory();
    return (
        <div className="mediaeye-layout-content">
            <div className="generative-landing">
                <GenerativeLandingTop />
                <div className='mediaeye-layout-middle'>
                    <div className='generative-landing-inner'>
                        <GenerativeInnerContent />
                        <MintedPart />
                        <ContentWithSlider />
                        <Team />
                        <FAQ />
                    </div>
                </div>
                <div className='text-center' onClick={() => history.push('/generative-publish')}>
                    <button className='btn btn-square btn-gaming'>Publish</button>
                </div>
            </div>
        </div>
    );
}
