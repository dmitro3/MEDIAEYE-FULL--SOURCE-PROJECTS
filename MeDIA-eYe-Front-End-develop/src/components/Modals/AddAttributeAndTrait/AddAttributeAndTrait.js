import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeAddAttributeAndTrait } from '../../../store/app/appSlice';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Pagination } from 'swiper';
import { CloseIcon } from '../../Icons';
import background from '../../../assets/img/generativeCollection/setup_collection_banner.png';
import uploadedImg from '../../../assets/img/generativeCollection/complete.png';
import './AddAttributeAndTrait.scss'

export default function AddAttributeAndTrait() {
    const showAddAttributeAndTrait = useSelector((state) => state.app.showAddAttributeAndTrait);
    const status = useSelector((state) => state.app.statusAddAttributeAndTraits);
    const [uploads, setUploads] = useState([]);
    const [showUpdated, setShowUpdated] = useState(false);
    const [nameOfFolder, setNameOfFolder] = useState();
    const anchorVisible = useRef();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        console.log(e.target.files);
        setUploads(e.target.files);
    };
    useEffect(() => {
        processUploads();
    }, [uploads]);
    const processUploads = async () => {
        console.log('starting uploads', uploads.length);
        const files = Array.from(uploads);
        const folders = new Set(
            files.map((file) => {
                const path = file.webkitRelativePath;
                const splittedPath = path.split('/');
                const folderName = splittedPath[splittedPath.length - 2];
                const rootFolderPath = splittedPath[0];
                setNameOfFolder(folderName);
                // return rootFolderPath + "/" + folderName;
                return file.type.includes('image') && folderName;
            })
        );
    };
    const settingCollection = {
        slidesPerView: 1,
        grabCursor: true,
        modules: [Pagination],
        pagination: {
            el: '.mediaeye-addattribute',
            enable: true,
            clickable: true
        },
        breakpoints: {
            889: {
                slidesPerView: 2
            },
            1181: {
                slidesPerView: 4
            },
            1280: {
                slidesPerView: 4
            }
        }
    };
    return (
        <>
            {showAddAttributeAndTrait ? (
                <div
                    className={
                        showAddAttributeAndTrait ? 'mediaeye-popup active' : 'mediaeye-popup'
                    }
                >
                    <div
                        className="mediaeye-popup-wrapper"
                        onClick={() => dispatch(closeAddAttributeAndTrait())}
                    >
                        <div
                            className="mediaeye-popup-content attribute-trait-popup"
                            onClick={(event) => {
                                event.stopPropagation();
                            }}
                        >
                            <div className="mediaeye-popup-content-inner">
                                <div className='attribute-trait-popup-inner'>
                                    <div
                                        className="mediaeye-popup-close"
                                        onClick={() => { dispatch(closeAddAttributeAndTrait()); setUploads([]) }}
                                    >
                                        <CloseIcon />
                                    </div>
                                    {uploads.length > 0 ?
                                        <div className='attribute-trait-popup-inner-afterupload'>
                                            <div className='attribute-trait-popup-inner-afterupload-inner'>
                                                {status === 'attribute' ? <span className='attribute-trait-popup-inner-afterupload-inner-title'>Create Attribute</span>
                                                    : <span className='attribute-trait-popup-inner-afterupload-inner-title'>Upload 2.Body</span>}
                                                {showUpdated ?
                                                    <div className='attribute-trait-popup-inner-afterupload-inner-finaluploaded'>
                                                        <div className='attribute-trait-popup-inner-afterupload-inner-finaluploaded-image'><img src={uploadedImg} alt='uploaded banner' /></div>
                                                        <div className='attribute-trait-popup-inner-afterupload-inner-finaluploaded-bottom'>
                                                            <div className='attribute-trait-popup-inner-afterupload-inner-finaluploaded-bottom-top'>Uploaded 2 components</div>
                                                            <div className='attribute-trait-popup-inner-afterupload-inner-finaluploaded-bottom-data text-grayShade'>
                                                                Great job, you can now view your new components. Don’t forget to update your templates if you added new attributes.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <>
                                                        <div className='attribute-trait-popup-inner-afterupload-inner-datalist'>
                                                            <div className='attribute-trait-popup-inner-afterupload-inner-datalist-head'>
                                                                <span>{nameOfFolder}</span>
                                                                <span className='text-grayShade'>{uploads.length} trait</span>
                                                            </div>

                                                            <div className='attribute-trait-popup-inner-afterupload-inner-datalist-data'>
                                                                <Swiper
                                                                    {...settingCollection}
                                                                    className="mediaeye-collection-pagination m-t-30"
                                                                >

                                                                    {Array.from(uploads).map((item, i) =>
                                                                        <>
                                                                            <SwiperSlide key={i}>
                                                                                <div className='attribute-trait-popup-inner-afterupload-inner-datalist-data-cards'>
                                                                                    <div className='attribute-trait-popup-inner-afterupload-inner-datalist-data-cards-top'>
                                                                                        <img src={URL.createObjectURL(item)} />
                                                                                        <span>NEW</span>
                                                                                    </div>
                                                                                    <div className='attribute-trait-popup-inner-afterupload-inner-datalist-data-cards-bottom'>{item.name.split('.')[0]}</div>
                                                                                </div>
                                                                            </SwiperSlide>
                                                                        </>
                                                                    )}
                                                                    <div ref={anchorVisible}></div>
                                                                </Swiper>
                                                                <div className="m-t-30 mediaeye-swiper-pagination mediaeye-swiper-pagination-center withscroll mediaeye-addattribute"></div>

                                                            </div>
                                                        </div>
                                                        <div className='attribute-trait-popup-inner-afterupload-inner-bottom'>
                                                            {
                                                                status === 'attribute' ?
                                                                    <>
                                                                        <button type='button' className='btn btn-square btn-transperant' onClick={() => dispatch(closeAddAttributeAndTrait())}>Discard Changes</button>
                                                                        <button type='button' className='btn btn-square btn-gaming'>Save Changes</button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <button type='button' className='btn btn-square btn-transperant' onClick={() => dispatch(closeAddAttributeAndTrait())}>Back</button>
                                                                        <button type='button' className='btn btn-square btn-gaming' onClick={() => setShowUpdated(!showUpdated)}>Upload</button>
                                                                    </>
                                                            }

                                                        </div>
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        :
                                        <div className='attribute-trait-popup-inner-content'>
                                            <div className='attribute-trait-popup-inner-content-title'>
                                                {status === "attribute" ?
                                                    <span>Create Attribute</span>
                                                    :
                                                    <span>Upload 2.Body</span>
                                                }
                                            </div>
                                            <div className="collection-setup-page-uploader">
                                                <div className="collection-setup-page-uploader-inner">
                                                    <div className="collection-setup-page-uploader-inner-background">
                                                        <img src={background} />
                                                        <div className="collection-setup-page-uploader-inner-background-hoverText">
                                                            Drop files to upload
                                                        </div>
                                                        <div className="collection-setup-page-uploader-inner-background-text">
                                                            <span className="collection-setup-page-uploader-inner-background-text-head">
                                                                Drag n’ Drop assets
                                                            </span>
                                                            <div className="collection-setup-page-uploader-inner-background-text-bottom text-grayShade">
                                                                Or manually <span>choose a folder</span>to get started
                                                            </div>
                                                        </div>
                                                        <input
                                                            className="collection-setup-page-uploader-inner-background-input"
                                                            type="file"
                                                            webkitdirectory="true"
                                                            multiple
                                                            id="filebrowser"
                                                            // className="hidden"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
