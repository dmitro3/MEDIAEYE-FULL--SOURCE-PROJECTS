import React from 'react'
import { closeActionPopup, toggleGeneralPopup } from '../../../store/app/appSlice';
import { CloseIcon, Refresh } from '../../Icons';
import './ActionPopup.scss'

export default function ActionModal({ open, onClose, onOk, index, traitName }) {
    return (
        <>
            {open ? (
                <div
                    className={
                        open ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper"
                        onClick={onClose}
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
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </div>
                                <div className='action-popup-inner'>
                                    <span className='action-popup-inner-title'>Are you sure?</span>
                                    <div className='action-popup-inner-content'>
                                        <span className='text-grayShade'>Are you sure you want to delete { traitName }? <br /> This action cannot be undone and the preview <br />will need to be regenerated.</span>
                                    </div>
                                    <div className='action-popup-inner-bottom'>
                                        <button type='button' className='btn btn-square btn-transperant' onClick={onClose}>Cancel</button>
                                        <button type='button' className='btn btn-square btn-gaming' onClick={onOk}>Delete</button>
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
