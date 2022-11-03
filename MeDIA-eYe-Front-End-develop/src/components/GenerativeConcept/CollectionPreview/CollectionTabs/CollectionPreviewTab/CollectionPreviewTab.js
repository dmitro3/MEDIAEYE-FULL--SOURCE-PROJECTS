import React, { useEffect, useState, useRef } from 'react';
import SelectSearch from 'react-select-search';
import { Angle, Close, CloseIcon, Error, Gear, Refresh } from '../../../../Icons';
import './CollectionPreviewTab.scss';
import demoImage from '../../../../../assets/img/generativeCollection/rectangleImage.png';
import { toggleGenerativeImagePopup, toggleGenerativeUploadPopup, toggleGenerationErrorPopup } from '../../../../../store/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import formatAdddress from '../../../../../utils/formatAdddress';

const DemoImage = ({ folders, dna }) => {
    const draw = (context) => {
        if (folders.length == 0) return;
        dna.split('-').map(async(index, i) => {
            const image = new Image();
            image.src = URL.createObjectURL(folders[i].files[Number(index)].image);
            image.onload = () => {
               context.drawImage(image, 0, 0, 200, 200);
            }
        });
    }
    const canvas = useRef();
    useEffect(() => {
        const context = canvas.current.getContext('2d');
        setTimeout(() => {
            draw(context);
        }, 400);
    }, [folders, dna]);
    return (
        <div>
            <canvas ref={canvas} width="200px" height="200px" />
        </div>
    );
}

export default function CollectionPreviewTab(props) {

    const { allFolders, demoList } = props;

    const dispatch = useDispatch();
    const [data, setData] = useState(props.data);
    const [dropdown, setDropdown] = useState(false);
    const [dropdownNumber, setDropdownNumber] = useState();
    const [oneOnOne, setOneOnOne] = useState(false);
    const [single, setSingle] = useState('Token number');
    const [activeButton, setActiveButton] = useState('All');
    const [imagePreview, setImagePreview] = useState(false);
    const [refreshItem, setRefreshItem] = useState(false);
    const [showError, setShowError] = useState(true);

    const handleOpenDropdown = (i) => {
        setDropdown(!dropdown);
        if (i === dropdownNumber) {
            setDropdown(null);
        } else {
            setDropdownNumber(i);
        }
    };

    const bodyData = [
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage }
    ];
    const bodayData1 = [
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage },
        { img: demoImage }
    ];
    const allItems = [
        { value: 'Token number', name: 'Token number' },
        { value: 'Rarity score', name: 'Rarity score' },
        { value: 'Average rarity', name: 'Average rarity' }
    ];
    const handleTogglePreview = () => {
        setImagePreview(!imagePreview);
    };

    useEffect(() => {
        if (refreshItem === true) {
            setTimeout(() => {
                setRefreshItem(false);
            }, 3000);
        }
    }, [refreshItem]);

    return (
        <div className="collection-preview-tab">
            <div className="collection-preview-tab-holder">
                {refreshItem ?
                    <div className='collection-preview-tab-holder-generator' >
                        <div className='collection-preview-tab-holder-generator-content'>
                            <Refresh />
                            <span className='text-semitransperant'>Generating...</span>
                            <span>18000/20 000</span>
                        </div>
                    </div>
                    : null
                }

                <div className="collection-preview-tab-holder-left">
                    <div
                        className="collection-preview-tab-holder-left-upper"
                    >
                        <div className='collection-preview-tab-holder-left-upper-icontitle'>
                            <Gear />  <span>20 000</span>
                        </div>
                        <div onClick={() => setRefreshItem(true)}><Refresh /></div>
                    </div>
                    <div className="collection-preview-tab-holder-left-list">
                        {Array.from(data).map((item, i) => {
                            return (
                                <>
                                    <div className="collection-preview-tab-holder-left-list-item">
                                        <div
                                            className="collection-preview-tab-holder-left-list-item-inner"
                                            onClick={() => handleOpenDropdown(i)}
                                        >
                                            <span>{item.folder.length > 13 ? formatAdddress(
                                                item.folder
                                            ) : item.folder}</span>
                                            <div>
                                                <Angle side={dropdown && i === dropdownNumber ? 'up' : 'down'} />
                                            </div>
                                        </div>
                                        {dropdown && i === dropdownNumber
                                            ? item.files.map((item) => {
                                                return (
                                                    <div className="collection-preview-tab-holder-left-list-item-itemlist">
                                                        <div className="collection-preview-tab-holder-left-list-item-itemlist-inner">
                                                            <div className="collection-preview-tab-holder-left-list-item-itemlist-inner-left">
                                                                <input type="checkbox" />
                                                                <span >{formatAdddress(
                                                                    item.name.split('.')[0]
                                                                )}</span>
                                                            </div>
                                                            <div className="collection-preview-tab-holder-left-list-item-itemlist-inner-right">
                                                                22
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            : null}
                                    </div>
                                </>
                            );
                        })}

                        <div className="collection-preview-tab-holder-left-list-item">
                            <div
                                className="collection-preview-tab-holder-left-list-item-inner"
                                onClick={() => setOneOnOne(!oneOnOne)}
                            >
                                <span>1 of 1</span>
                                <div>
                                    <Angle side={oneOnOne ? 'up' : 'down'} />
                                </div>
                            </div>
                            {oneOnOne
                                ? Array.from(data).map((item, i) => {
                                    return (
                                        <div className="collection-preview-tab-holder-left-list-item-itemlist">
                                            <div className="collection-preview-tab-holder-left-list-item-itemlist-inner">
                                                <div className="collection-preview-tab-holder-left-list-item-itemlist-inner-left">
                                                    <input type="checkbox" />
                                                    <span>{item.folder}</span>
                                                </div>
                                                <div className="collection-preview-tab-holder-left-list-item-itemlist-inner-right">
                                                    22
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                : null}
                        </div>
                    </div>
                </div>
                <div className="collection-preview-tab-holder-right">
                    <div className="collection-preview-tab-holder-right-inner">
                        <div className="collection-preview-tab-holder-right-inner-top">
                            <div className="collection-preview-tab-holder-right-inner-top-left">
                                <button
                                    className="btn btn-square btn-transperant"
                                    onClick={() => setActiveButton('All')}
                                >
                                    All
                                </button>
                                <button
                                    className="btn btn-square btn-transperant"
                                    onClick={() => setActiveButton('One')}
                                >
                                    1 of 1
                                </button>
                            </div>
                            <div className="collection-preview-tab-holder-right-inner-top-right">
                                <button
                                    className="btn btn-square btn-gaming"
                                    onClick={() => dispatch(toggleGenerativeUploadPopup())}
                                >
                                    upload 1 of 1
                                </button>
                            </div>
                        </div>
                        <div className="collection-preview-tab-holder-right-inner-subtop">
                            <div className="collection-preview-tab-holder-right-inner-subtop-left">
                                <span className="text-grayShade m-r-20 cursor-pointer">100 result</span>
                                <div className="collection-preview-tab-holder-right-inner-subtop-left-filter cursor-pointer">
                                    <div>
                                        <span className="text-grayShade">background: </span>Green
                                    </div>
                                    <Close />
                                </div>
                                <div className="collection-preview-tab-holder-right-inner-subtop-left-filter cursor-pointer">
                                    <div>
                                        <span>Accessories: </span>purple medal{' '}
                                    </div>
                                    <Close />
                                </div>
                            </div>
                            <div className="collection-preview-tab-holder-right-inner-subtop-right">
                                <SelectSearch
                                    className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                                    size="sm"
                                    options={allItems}
                                    value={single}
                                    onChange={(opt) => setSingle(opt)}
                                />
                            </div>
                        </div>
                        <div className="collection-preview-tab-holder-right-inner-body">
                            <div className="collection-preview-tab-holder-right-inner-body-inner">
                                {
                                    demoList.map((demo, i) => {
                                        return (
                                            <div
                                                className="collection-preview-tab-holder-right-inner-body-inner-section"
                                                onClick={() => {
                                                    dispatch(toggleGenerativeImagePopup());
                                                }}
                                            >
                                                <DemoImage key={i} dna={demo} folders={allFolders} />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            {
                                bodyData.length > 15 && showError && activeButton === 'All' ?
                                    <div className='collection-preview-tab-holder-right-inner-body-error cursor-pointer'>
                                        <div className='collection-preview-tab-holder-right-inner-body-error-icon' onClick={() => dispatch(toggleGenerationErrorPopup())}><Error /></div>
                                        <span className='text-semitransperant' onClick={() => dispatch(toggleGenerationErrorPopup())}>Error</span>
                                        <div onClick={() => setShowError(false)}><CloseIcon /></div>
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
