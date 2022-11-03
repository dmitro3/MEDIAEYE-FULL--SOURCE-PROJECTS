import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeGeneratedAccessPass } from '../../../store/app/appSlice';
import { CloseIcon } from '../../Icons';
import './GeneratedAccessPasses.scss'

export default function GeneratedAccessPasses() {
    const showGeneratedAccessPass = useSelector((state) => state.app.showGeneratedAccessPass);
    const accessFrom = useSelector((state) => state.app.generativeAccessPassFrom);
    console.log(accessFrom, "access from")
    const dispatch = useDispatch();
    return (
        <>
            {showGeneratedAccessPass ? (
                <div
                    className={
                        showGeneratedAccessPass ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper"
                        onClick={() => dispatch(closeGeneratedAccessPass())}
                    >
                        <div
                            className="mediaeye-popup-content generated-access"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="mediaeye-popup-content-inner">
                                <div
                                    className="mediaeye-popup-close"
                                    onClick={() => dispatch(closeGeneratedAccessPass())}
                                >
                                    <CloseIcon />
                                </div>
                                <div className='generated-access-inner m-t-20'>
                                    <div className='generated-access-inner-title text-center m-b-30'><span>Generated Access Passes</span></div>
                                    {
                                        accessFrom === 'listing' ?
                                            <>
                                                <div className='mediaeyefancyscrollbar'>
                                                    <div className='generated-access-inner-content'>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                        <div className='generated-access-inner-content-row m-b-20'>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                            <span>23-XY-PM-00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='generated-access-inner-bottom m-t-30'>
                                                    <button className='btn btn-square btn-transperant'>EXPort to CSV</button>
                                                    <span>Copy</span>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='generated-access-inner-landing m-t-30'>
                                                    <div className='mediaeyefancyscrollbar'>
                                                        <div className='generated-access-inner-landing-passes'>
                                                            <div className='generated-access-inner-landing-passes-title'>
                                                                Free Mint Passes
                                                            </div>
                                                            <div className='generated-access-inner-landing-passes-values m-t-20'>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                            </div>
                                                            <div className='generated-access-inner-landing-passes-title'>
                                                                Pre-Sale Passes
                                                            </div>
                                                            <div className='generated-access-inner-landing-passes-values m-t-20'>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                                <div className='generated-access-inner-content-row m-b-20'>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                    <span>23-XY-PM-00</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className='text-center m-t-30'>
                                                    <button className='btn btn-square btn-transperant'>OK</button>
                                                </div>
                                            </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
