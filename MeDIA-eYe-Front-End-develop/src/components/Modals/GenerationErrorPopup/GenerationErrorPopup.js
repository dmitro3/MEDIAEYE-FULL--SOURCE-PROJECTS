import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeGenerationErrorPopup } from '../../../store/app/appSlice';
import { CloseIcon } from '../../Icons';
import './GenerationErrorPopup.scss'

export default function GenerationErrorPopup() {
    const shoeGenerationErrorPopup = useSelector((state) => state.app.showGenerationErrorPopup);
    const dispatch = useDispatch();
    return (
        <>
            {shoeGenerationErrorPopup ? (
                <div
                    className={
                        shoeGenerationErrorPopup
                            ? 'mediaeye-popup active mediaeye-popup-sm burn-popup'
                            : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper generationerror-popup"
                        onClick={() => dispatch(closeGenerationErrorPopup())}
                    >
                        <div
                            className="mediaeye-popup-content"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="mediaeye-popup-content-inner">
                                <div
                                    className="mediaeye-popup-close"
                                    onClick={() => dispatch(closeGenerationErrorPopup())}
                                >
                                    <CloseIcon />
                                </div>
                                <div className='generationerror-popup-inner m-t-20'>
                                    <div className='generationerror-popup-inner-title text-center'>
                                        <span>Generation Errors</span>
                                    </div>
                                    <div className='generationerror-popup-inner-subtitle text-center m-t-20 m-b-30'>
                                        <span className='text-semitransperant'>Reached the max of unique tokens possible after a total of 118 iterations in less than 1 second.</span>
                                    </div>
                                    <div className='generationerror-popup-inner-contentbox'>
                                        <div className='generationerror-popup-inner-contentbox-inner'>
                                            <span>Reason</span>
                                            <span>Exhausted all possible combinations for your template(s), you do not have enough traits.
                                            </span>
                                            <span>Solution
                                            </span>
                                            <span className='text-semitransperant'>Add more components <br />Upload 1/1</span>
                                        </div>
                                    </div>
                                    <div className='text-center m-t-20'>
                                        <button className='btn btn-square btn-transperant'>Close</button>
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
