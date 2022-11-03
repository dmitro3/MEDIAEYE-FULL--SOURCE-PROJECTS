import React, { useEffect, useState } from 'react'
import { CloseIcon } from '../../Icons';
import demo from '../../../assets/img/generativeCollection/rectangleImage.png'
import './EditBackgroundPopup.scss'
import { Slider } from '@mui/material';

export default function EditLayerModal({ open, onClose, layer, onOk }) {
    const [activeHash, setActiveHash] = useState('hash');
    const [currentLayer, setCurrentLayer] = useState();
    const [originalName, setOriginalName] = useState();

    const handleEditName = (e) => {
        setCurrentLayer({ ...currentLayer, name: e.target.value });
    }

    const handleEditFileRarity = (e, i) => {
        let temp = {...currentLayer};
        temp.files[i].rarity = e.target.value;
        setCurrentLayer(temp);
    }

    const handleLayerRarity = (e) => {
        let temp = {...currentLayer};
        temp.rarity = e.target.value;
        setCurrentLayer(temp);
    }

    const handleSave = () => {
        onOk(originalName, currentLayer);
        onClose();
    }

    useEffect(() => {
        if(!layer) return;
        setCurrentLayer(layer);
        setOriginalName(layer.name);
    }, [layer]);
    return (
        <>
            {(open && !!currentLayer) ? (
                <div
                    className={
                        open ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper scrolled"
                        onClick={onClose}
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
                                    onClick={onClose}
                                >
                                    <CloseIcon />
                                </div>
                                <div className='edit-background-inner'>
                                    <div className='edit-background-inner-title'><span>Edit {currentLayer.name} Attribute</span></div>
                                    <div className='edit-background-inner-metadata common-section'>
                                        <span className='edit-background-inner-metadata-maintitle'>Metadata</span>
                                        <span className='edit-background-inner-metadata-subtitle text-grayShade'> Manage how this Attribute appears in your Tokens Metadata.</span>
                                        <div className='edit-background-inner-metadata-attribute m-t-20'>
                                            <label for="collectionName">Attribute Name</label>
                                            <div className="mediaeyeform-group-input m-t-5">
                                                <input
                                                    id="collectionName"
                                                    className='mediaeyeform-input'
                                                    value={currentLayer.name}
                                                    onChange={handleEditName}
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
                                                {
                                                    currentLayer.files.map((file, i) => (
                                                        <div className='edit-background-inner-trait-content-data-inner'>
                                                            <div className='edit-background-inner-trait-content-data-inner-left'>
                                                                <img src={URL.createObjectURL(file.image)} alt="background image" />
                                                                <span>{ file.name }</span>
                                                            </div>
                                                            <div className='edit-background-inner-trait-content-data-inner-right'>
                                                                <div className='edit-background-inner-trait-content-data-inner-right-range'>
                                                                    <Slider
                                                                        disableRipple
                                                                        value={file.rarity}
                                                                        onChange={e=>handleEditFileRarity(e, i)}
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
                                                                    <span className={activeHash === 'hash' ? 'value' : ''} onClick={() => setActiveHash("hash")}>{ Math.trunc(file.rarity) }</span>
                                                                    <span className={activeHash === 'per' ? 'value' : ''} onClick={() => setActiveHash("per")}>%</span>
                                                                </div>
                                                                <span className='edit-background-inner-trait-content-data-inner-right-est'>{ Math.trunc(currentLayer.rarity / file.rarity)}</span>
                                                                <span>{ Math.floor(100 / currentLayer.files.length ) }%</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
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
                                                value={currentLayer.rarity}
                                                onChange={handleLayerRarity}
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
                                            <span className='ratio-button'>{ currentLayer.rarity }%</span>
                                        </div>
                                    </div>
                                    <div className='edit-background-inner-bottom m-t-20'>
                                        <button onClick={onClose} className='btn btn-square btn-transperant'>Discard Changes</button>
                                        <button onClick={handleSave} className='btn btn-square btn-gaming'>Save Changes</button>
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
