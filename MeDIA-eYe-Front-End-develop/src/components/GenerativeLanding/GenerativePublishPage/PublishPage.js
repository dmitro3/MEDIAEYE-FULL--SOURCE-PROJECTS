import React from 'react'
import GenerativeLandingTop from '../GenerativeLandingTop'
import GenerativeInnerContent from '../GenerativeInnerContent'
import MintedPart from '../MintedPart'
import ContentWithSlider from '../ContentWithSlider'
import Team from '../Team'
import FAQ from '../FAQ'
import { useHistory } from 'react-router-dom'

export default function PublishPage() {
    const history = useHistory();
    return (
        <div className="mediaeye-layout-content">
            <div className="generative-landing">
                <GenerativeLandingTop collection={"hidden"} />
                <div className='mediaeye-layout-middle'>
                    <div className='generative-landing-inner'>
                        <GenerativeInnerContent />
                        <MintedPart />
                        <ContentWithSlider />
                        <Team />
                        <FAQ />
                    </div>
                </div>
                <div className='text-center m-t-50' onClick={() => history.push('/generative-landing')}>
                    <button className='btn btn-square btn-gaming'>Edit</button>
                </div>
            </div>
        </div>
    )
}
