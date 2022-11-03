import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeActionPopup, toggleGeneralPopup } from '../../../store/app/appSlice';
import { CloseIcon, Refresh } from '../../Icons';
import './ActionPopup.scss'

export default function ActionPopup() {
    const showGenerativeActionPopup = useSelector((state) => state.app.showGenerativeActionPopup);
    const message = useSelector((state) => state.app.actionPopupAction);
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(closeActionPopup());
        dispatch(
            toggleGeneralPopup({
                status: 'info',
                message: 'Successfully updated attribute!',
                textButton: 'OK',
                size: 'sm'
            })
        );
    }
    const handleRegenerate = () => {
        dispatch(closeActionPopup());
        dispatch(toggleGeneralPopup({
            message: '16 Tokens generated',
            textButton: 'View',
            size: 'sm'
        }))
    }
    return (
        <>
            {showGenerativeActionPopup ? (
                <div
                    className={
                        showGenerativeActionPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper"
                        onClick={() => dispatch(closeActionPopup())}
                    >
                        <div
                            className="mediaeye-popup-content action-popup"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="mediaeye-popup-content-inner">
                                <div
                                    className="mediaeye-popup-close"
                                    onClick={() => dispatch(closeActionPopup())}
                                >
                                    <CloseIcon />
                                </div>
                                {message === 'remove' ?
                                    <div className='action-popup-inner'>
                                        <span className='action-popup-inner-title'>You are sure?</span>
                                        <div className='action-popup-inner-content'>
                                            <span className='text-grayShade'>Are you sure you want to delete {"trait name"}? <br /> This action cannot be undone and the preview <br />will need to be regenerated.</span>
                                        </div>
                                        <div className='action-popup-inner-bottom'>
                                            <button type='button' className='btn btn-square btn-transperant' onClick={() => dispatch(closeActionPopup())}>Cancel</button>
                                            <button type='button' className='btn btn-square btn-gaming' onClick={handleDelete}>Delete</button>
                                        </div>
                                    </div>
                                    :
                                    <div className='action-popup-regenrate'>
                                        <span className='action-popup-regenrate-title'>Regenerate Preview</span>
                                        <div className='action-popup-regenrate-subtitle'>16 new Tokens will be generated<br />
                                            The current preview will be replaced.</div>
                                        <div className='action-popup-regenrate-buttonsection'><button className='btn btn-square btn-gaming' onClick={handleRegenerate}><Refresh /><span>Regenerate 16 Tokens</span></button></div>
                                        <div className='action-popup-regenrate-note text-grayShade'>Note: Regeneration may take a few seconds depending <br /> on the number of Tokens and their attributes, traits and <br /> rules.</div>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
