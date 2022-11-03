import React, { useState } from 'react'
import './CollectionListingStages.scss'
import PublicSale from './PublicSale';
import StageDuration from './StageDuration';
import FreeMint from './FreeMint';
import PreSale from './PreSale';



export default function CollectionListingStages() {


    return (
        <div className='listing-stages m-t-50'>
            <div className='mediaeye-layout-container'>
                <div className='listing-stages-inner'>
                    <FreeMint />
                    <PreSale />
                    <PublicSale />
                    <StageDuration />
                    <div className='text-center' ><button className='btn btn-square btn-gaming'>Save</button></div>
                </div>
            </div>
        </div>
    )
}
