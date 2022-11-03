import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeGenerativeUploadPopup } from '../../../store/app/appSlice';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { CloseIcon, Stats, Upload, FilterProperty, Plus, PlusSquare, PlusSquare2, Edit } from '../../Icons';
import './GenerativeUpload1of1.scss';
import demoImage from '../../../assets/img/generativeCollection/rectangleImage.png';

const data = [
    {
        img: demoImage,
        name: 'NFT #1'
    },
    {
        img: demoImage,
        name: 'NFT #2'
    },
    {
        img: demoImage,
        name: 'NFT #3'
    },
    {
        img: demoImage,
        name: 'NFT #4'
    },
    {
        img: demoImage,
        name: 'NFT #5'
    },
    {
        img: demoImage,
        name: 'NFT #6'
    }
]

export default function GenerativeUpload1of1() {
    const showGenerativeUploadPopup = useSelector((state) => state.app.showGenerativeUploadPopup);
    const dispatch = useDispatch();
    const [productToShow, setproductToShow] = useState(data);
    const anchorVisible = useRef();
    const [imageFile, setImageFile] = useState([]);

    const settingCollection = {
        slidesPerView: 1,
        grabCursor: true,
        modules: [Pagination],
        pagination: {
            el: '.mediaeye-CreateCampaign-collection-pagination',
            enable: true,
            clickable: true
        },
        breakpoints: {
            889: {
                slidesPerView: 2
            },
            1181: {
                slidesPerView: 3
            },
            1280: {
                slidesPerView: 3
            }
        }
    };

    return (
        <>
            {showGenerativeUploadPopup ? (
                <div
                    className={
                        showGenerativeUploadPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper"
                        onClick={() => dispatch(closeGenerativeUploadPopup())}
                    >
                        <div
                            className="mediaeye-popup-content generative-upload-popup"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="mediaeye-popup-content-inner">
                                <div
                                    className="mediaeye-popup-close"
                                    onClick={() => dispatch(closeGenerativeUploadPopup())}
                                >
                                    <CloseIcon />
                                </div>
                                <div className='generative-upload-popup-inner'>
                                    <div className='generative-upload-popup-inner-uploads'>
                                        <span>Upload 1 of 1 NFT</span>
                                        <label className="generative-upload-popup-inner-uploads-sections">
                                            <input
                                                type="file"
                                                className=""
                                                accept="image/png, image/gif, image/jpeg"
                                                onChange={(e) =>
                                                    setImageFile(e.target.files)
                                                }
                                            />
                                            <Upload upload={'folder'} />
                                            Upload 1 of 1 Image
                                        </label>
                                    </div>
                                    <div className='generative-upload-popup-inner-properties'>
                                        <div className='generative-upload-popup-inner-properties-title'><FilterProperty /><span>Properties</span></div>
                                        <div className='generative-upload-popup-inner-properties-content'>
                                            <span className='text-grayShade'>1.</span>
                                            <input type="text" placeholder="1 of 1 name" />
                                            <input type="text" placeholder='value' />
                                            <div><CloseIcon /></div>
                                        </div>
                                    </div>
                                    <button className='btn btn-transperant m-t-30'>Save Changes</button>
                                    <div className='generative-upload-popup-inner-slider'>
                                        <Swiper
                                            {...settingCollection}
                                            className="mediaeye-collection-pagination m-t-30"
                                        >
                                            {imageFile.length > 0 ?
                                                <SwiperSlide>
                                                    {Array.from(imageFile).map((item) => {
                                                        return (
                                                            <div className='generative-upload-popup-inner-slider-card'>
                                                                <div className='generative-upload-popup-inner-slider-card-image'>
                                                                    <img src={URL.createObjectURL(item)} />
                                                                    <div className='generative-upload-popup-inner-slider-card-image-close'><CloseIcon /></div>
                                                                    <div className='generative-upload-popup-inner-slider-card-image-edit'><Edit /><span>Edit</span></div>
                                                                </div>
                                                                <div className='generative-upload-popup-inner-slider-card-tag'><span>{item.name}</span></div>
                                                            </div>
                                                        )
                                                    })}
                                                </SwiperSlide>
                                                : null}

                                            {productToShow.map((collection, i) =>
                                                <>
                                                    <SwiperSlide key={i}>
                                                        <div className='generative-upload-popup-inner-slider-card'>
                                                            <div className='generative-upload-popup-inner-slider-card-image'>
                                                                <img src={collection.img} />
                                                                <div className='generative-upload-popup-inner-slider-card-image-close'><CloseIcon /></div>
                                                                <div className='generative-upload-popup-inner-slider-card-image-edit'><Edit /><span>Edit</span></div>
                                                            </div>
                                                            <div className='generative-upload-popup-inner-slider-card-tag'><span>{collection.name}</span></div>
                                                        </div>
                                                    </SwiperSlide>
                                                </>
                                            )}
                                            <SwiperSlide>
                                                <div className='generative-upload-popup-inner-slider-nftcard'>
                                                    <div className='generative-upload-popup-inner-slider-nftcard-inner'>
                                                        <PlusSquare2 />
                                                    </div>
                                                    <div className='text-center m-t-10'><span>Add NFT</span></div>
                                                </div>
                                            </SwiperSlide>
                                            <div ref={anchorVisible}></div>
                                        </Swiper>
                                        <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-CreateCampaign-collection-pagination"></div>
                                    </div>
                                    <div className='text-center m-t-30'>
                                        <button className='btn btn-square btn-gaming' onClick={() => dispatch(closeGenerativeUploadPopup())}>Upload</button>
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
