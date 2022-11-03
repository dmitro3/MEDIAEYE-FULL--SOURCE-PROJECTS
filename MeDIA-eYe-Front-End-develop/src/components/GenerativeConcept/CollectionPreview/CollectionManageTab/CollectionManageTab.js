import React, { useEffect, useState } from 'react'
import { Check, Close, Edit, MinusCloseIcon, Plus, Refresh, Share, Trash } from '../../../Icons'
import './CollectionManageTab.scss'
import bg1 from '../../../../assets/img/generativeCollection/Ellipse 362.png'
import bg2 from '../../../../assets/img/generativeCollection/setup_collection_banner.png'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { Mousewheel } from 'swiper';
import { Scrollbar } from 'swiper'
import { toggleActionPopup, toggleAddAttributeAndTrait, toggleEditBackgroundPopup } from '../../../../store/app/appSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Draggable } from 'drag-react';
import { Slider } from '@mui/material'
import ActionModal from '../../../Modals/ActionModal/ActionModal'
import EditLayerModal from '../../../Modals/EditLayerModal/EditLayerModal'


export default function CollectionManageTab({ layers, delLayer, updateLayer, updateLayers }) {
    const [openDropdown, setOpenDropdown] = useState([]);
    const [toggleEditInput, setToggleEditInput] = useState(false);
    const [showUpdates, setShowUpdates] = useState(false);
    const [newName, setNewName] = useState('');
    const dispatch = useDispatch();
    const [openDelLayerModal, setOpenDelLayerModal] = useState();
    const [selIndex, setSelIndex] = useState();
    const [openEditLayerModal, setOpenEditLayerModal] = useState();
    const [editI, setEditI] = useState();
    const [editJ, setEditJ] = useState();

    const [editLayers, setEditLayers] = useState([]);

    useEffect(() => {
        setEditLayers(layers);
    }, [layers]);




    const removeLayer = () => {
        delLayer(layers[selIndex].name);
        setOpenDelLayerModal();
    }

    const handleEditLayerModal = (index) => {
        setSelIndex(index);
        setOpenEditLayerModal(true);
        handleOpenLayerMenu(index);
    }

    const handleDelLayerModal = (index) => {
        setSelIndex(index);
        setOpenDelLayerModal(true);
        handleOpenLayerMenu(index);
    }

    const handleOpenLayerMenu = (i) => {
        const index = openDropdown.findIndex(item => item === i);
        let temp = [...openDropdown];
        if (index === -1) {
            temp.push(i);
        } else {
            temp.splice(index, 1);
        }
        setOpenDropdown(temp);
    }

    const settingCollection = {
        slidesPerView: 1,
        grabCursor: true,
        modules: [Pagination, Mousewheel, Scrollbar,],
        pagination: {
            el: '.mediaeye-CreateCampaign-collection-pagination',
            enable: true,
            clickable: true
        },
        allowTouchMove: false,
        Mousewheel: {
            forceToAxis: true,
        },
        breakpoints: {
            889: {
                slidesPerView: 2
            },
            1181: {
                slidesPerView: 5
            },
            1280: {
                slidesPerView: 5
            }
        },
    };

    const setEdit = (index) => {
        setToggleEditInput(!toggleEditInput);
    }

    const handleNewName = (e, index) => {
        setNewName(e.target.value);
    }

    const handleEditFileName = async (i, j) => {
        let temp = [...layers];
        temp[i].files[j].name = newName;
        setEditLayers(temp);
        setEditI();
        setEdit(j);
        setShowUpdates(true)
    }

    const handleEditFileRarity = async (i, j , e) => {
        let temp = [...editLayers];
        temp[i].files[j].rarity = e.target.value;
        setEditLayers(temp);
        setShowUpdates(true);
    }

    const handleUpdateLayers = () =>{
        updateLayers(editLayers);
        setShowUpdates();
    }

    return (
        <div className='generative-manage-tab'>
            <ActionModal
                open={openDelLayerModal}
                onClose={() => setOpenDelLayerModal()}
                index={selIndex}
                traitName={layers[selIndex] ? layers[selIndex].name : ''}
                onOk={removeLayer}
            />
            <EditLayerModal
                open={openEditLayerModal}
                onClose={() => setOpenEditLayerModal()}
                layer={layers[selIndex]}
                onOk={updateLayer}
            />
            <div className='mediaeye-layout-container'>
                <div className='generative-manage-tab-top'>
                    <div className='generative-manage-tab-top-left'>
                        <span className='generative-manage-tab-top-left-top'>Attributes</span>
                        <span className='generative-manage-tab-top-left-bottom text-semitransperant'>Organize and edit your attributes and layers.</span>
                    </div>
                    <div className='generative-manage-tab-top-right'>
                        <button className='btn btn-square btn-transperant' onClick={() => dispatch(toggleAddAttributeAndTrait({ status: "attribute" }))}><span>New Attribute</span><Plus /></button>
                    </div>
                </div>
                {showUpdates ?
                    <Draggable
                        style={{ left: '80%', top: '80%' }}
                    >
                        <div className="generative-manage-tab-updates">
                            <div className='generative-manage-tab-updates-inner'>
                                <div className='generative-manage-tab-updates-inner-title'>
                                    <span>Updates available!</span>
                                    <div onClick={() => setShowUpdates(!showUpdates)}><MinusCloseIcon /></div>
                                </div>
                                <div className='generative-manage-tab-updates-inner-buttonsection'><button className='btn btn-square btn-gaming' onClick={handleUpdateLayers}><Refresh /><span>Regenerate Preview</span></button></div>
                            </div>
                        </div>
                    </Draggable>

                    : null}
                {/* attribute list */}
                <div className='generative-manage-tab-content'>
                    {
                        editLayers.map((layer, i) => (
                            <div key={i} className='generative-manage-tab-content-row'>
                                <div className='generative-manage-tab-content-row-title'>
                                    <div className='generative-manage-tab-content-row-title-left'><span onClick={() => handleOpenLayerMenu(i)}>{layer.name}</span></div>
                                    <div className='generative-manage-tab-content-row-title-right text-semitransperant'>5 layers</div>
                                    {
                                        openDropdown.includes(i) ?
                                            <div className='generative-manage-tab-content-row-title-dropdown'>
                                                <div className='generative-manage-tab-content-row-title-dropdown-inner'>
                                                    <ul>
                                                        <li onClick={() => dispatch(toggleAddAttributeAndTrait({ status: "trait" }))}>Add Traits</li>
                                                        <li style={{ cursor: 'pointer' }} onClick={() => handleEditLayerModal(i)}>Edit Attribute</li>
                                                        <li style={{ cursor: 'pointer' }} onClick={() => handleDelLayerModal(i)}>Delete</li>
                                                    </ul>
                                                </div>
                                            </div>
                                            : null
                                    }

                                </div>
                                <div className='generative-manage-tab-content-row-list'>
                                    <Swiper
                                        {...settingCollection}
                                        mousewheel={{ forceToAxis: true }}
                                        className="mediaeye-collection-pagination m-t-30"
                                    >
                                        {layer.files.map((item, j) =>
                                            <>
                                                <SwiperSlide key={j}>
                                                    <div className='generative-manage-tab-content-row-list-block'>
                                                        <div style={{ height: '270px' }} className='generative-manage-tab-content-row-list-block-image'>
                                                            <img style={{ top: 0, position: 'absolute' }} src={URL.createObjectURL(item.image)} />
                                                            <div className='generative-manage-tab-content-row-list-block-image-delete' onClick={() => dispatch(
                                                                toggleActionPopup({
                                                                    message: 'remove'
                                                                })
                                                            )}><Trash /></div>
                                                        </div>
                                                        <div style={{ position: 'absolute', width: '225px', opacity: 0.7, bottom: 0 }} className='generative-manage-tab-content-row-list-block-content'>
                                                            <div className='generative-manage-tab-content-row-list-block-content-editname'>
                                                                {editI === i && editJ === j ? <div><input type="text" className="generative-manage-tab-content-row-list-block-content-editname-input" value={newName} onChange={(e) => handleNewName(e, i)} /></div> : <span>{item.name}</span>}
                                                                {editI === i && editJ === j ? <div className='svg-group'><div onClick={() => handleEditFileName(i, j)}><Check /></div><div onClick={() => {setEditI();setEditJ()}}><Close /></div></div> : <div onClick={() => {setEditI(i);setEditJ(j);setNewName(item.name)}}><Edit /></div>}
                                                            </div>
                                                            <Slider
                                                                value={item.rarity}
                                                                onChange={e=>handleEditFileRarity(i, j, e)}
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
                                                            <div className='generative-manage-tab-content-row-list-block-content-estimate'>
                                                                <span className='text-semitransperant'>Estimated {Math.floor(100 / layer.files.length)}%</span>
                                                                <div className='generative-manage-tab-content-row-list-block-content-estimate-right'>
                                                                    <span className='hash'>{ Math.trunc(item.rarity) }</span>
                                                                    <span className='per'>%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            </>
                                        )}
                                    </Swiper>
                                    <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-CreateCampaign-collection-pagination"></div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}
