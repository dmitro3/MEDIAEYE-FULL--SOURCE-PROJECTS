import React, { useState } from 'react'
import './CollectionListingStages.scss';
import SelectSearch from 'react-select-search';
import DatePicker from 'react-datepicker';

export default function StageDuration() {
    const [selectStages, setSelectStages] =
        useState('Free Mint');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [single, setSingle] = useState('one');
    const stages = [
        {
            name: 'Free Mint',
            value: 'Free Mint'
        },
        {
            name: 'Pre Sale',
            value: 'Pre Sale'
        },
        {
            name: 'Public Sale',
            value: 'Public Sale'
        }
    ];
    const allItems = [
        {
            name: "one",
            value: "one"
        },
        {
            name: "two",
            value: "two"
        }
    ]
    const onChangeDate = (dates) => {
        const [start] = dates;
        setStartDate(start);
    };
    const onEndDateChange = (dates) => {
        const [end] = dates;
        setStartDate(end);
    };

    const handleDateChangeRaw = (e) => {
        e.stopPropagation();
    }


    return (
        <div className='listing-stages-inner-stageduration'>
            <div className="listing-stages-inner-title">
                <span >Stage duration</span>
            </div>
            <div className='listing-stages-inner-stageduration-content m-t-50'>
                <div className="mediaeyeform-group shortone">
                    <label className="mediaeyeform-label">
                        Select Stages
                    </label>
                    <div className="mediaeyeform-group-input">
                        <SelectSearch
                            className="mediaeye-selectsearch mediaeye-selectsearch-white-arrow dark-style"
                            size="lg"
                            options={stages}
                            value={selectStages}
                            placeholder={selectStages}
                            onChange={(opt) =>
                                setSelectStages(opt)
                            }
                        />
                    </div>
                </div>

                <div className='listing-stages-inner-stageduration-content-row m-t-20'>
                    <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="startdate">
                            Starting
                        </label>
                        <div className="mediaeyeform-group-input">
                            <div className='mediaeye-datepicker'>
                                <DatePicker
                                    selected={startDate}
                                    id="startingDate"
                                    className="mediaeyeform-input"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(date) => setStartDate(date)}
                                    closeOnScroll
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mediaeyeform-group">
                        <label className="mediaeyeform-label" htmlFor="enddata">
                            Ending
                        </label>
                        <div className="mediaeyeform-group-input">
                            <div className="mediaeye-datepicker">
                                <DatePicker
                                    selected={endDate}
                                    className="mediaeyeform-input"
                                    dateFormat="yyyy-MM-dd"
                                    onChange={(date) => setEndDate(date)}
                                    closeOnScroll
                                    placeholderText='22-07-12'
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className='listing-stages-inner-stageduration-content-row'>
                    <div className="mediaeyeform-group">
                        <div className="mediaeyeform-group-input">
                            <input
                                id="startdate"
                                className="mediaeyeform-input"
                                type="text"
                                placeholder='18:00'
                            />
                        </div>
                    </div>
                    <div className="mediaeyeform-group">
                        <div className="mediaeyeform-group-input">
                            <input
                                id="enddata"
                                className="mediaeyeform-input"
                                type="text"
                                placeholder='19:00'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='listing-stages-inner-stageduration-bottom m-t-50'>
                <div className='listing-stages-inner-stageduration-bottom-block'>
                    <div className='listing-stages-inner-stageduration-bottom-block-top m-b-20'>
                        <span className='listing-stages-inner-stageduration-bottom-block-top-left text-semitransperant'>Free Mint</span>
                        <div className='listing-stages-inner-stageduration-bottom-block-top-right'>
                            <span className='text-semitransperant'>STARTS IN</span>
                            <div className='listing-stages-inner-stageduration-bottom-block-top-right-box'>
                                <span>3</span>
                                <span>13</span>
                                <span>11</span>
                                <span>17</span>
                            </div>
                        </div>
                    </div>
                    <span className='listing-stages-inner-stageduration-bottom-block-middle m-t-20'>September 21 at 3:00 PM</span>
                    <div className='listing-stages-inner-stageduration-bottom-block-last'>
                        <span className='text-semitransperant'>Stage Description</span>
                        <div className='listing-stages-inner-stageduration-bottom-block-last-right'>
                            <span className='text-semitransperant'>Price</span>
                            <span className='token-row'>0.06 <img src='/img/token/34/ETH.png' /></span>
                            <span className='text-semitransperant'>MAX PER WALLET</span>
                            <span>20</span>
                        </div>
                    </div>
                </div>
                <div className='listing-stages-inner-stageduration-bottom-block m-t-20'>
                    <div className='listing-stages-inner-stageduration-bottom-block-top m-b-20'>
                        <span className='listing-stages-inner-stageduration-bottom-block-top-left text-semitransperant'>Pre-Sale</span>
                        <div className='listing-stages-inner-stageduration-bottom-block-top-right'>
                            <span className='text-semitransperant'>STARTS IN</span>
                            <div className='listing-stages-inner-stageduration-bottom-block-top-right-box'>
                                <span>4</span>
                                <span>13</span>
                                <span>11</span>
                                <span>17</span>
                            </div>
                        </div>
                    </div>
                    <span className='listing-stages-inner-stageduration-bottom-block-middle m-t-20'>September 22 at 8:00 PM</span>
                    <div className='listing-stages-inner-stageduration-bottom-block-last'>
                        <span className='text-semitransperant'>Stage Description</span>
                        <div className='listing-stages-inner-stageduration-bottom-block-last-right'>
                            <span className='text-semitransperant'>Price</span>
                            <span className='token-row'>0.06 <img src='/img/token/34/ETH.png' /></span>
                            <span className='text-semitransperant'>MAX PER WALLET</span>
                            <span>20</span>
                        </div>
                    </div>
                </div>
                <div className='listing-stages-inner-stageduration-bottom-block m-t-20'>
                    <div className='listing-stages-inner-stageduration-bottom-block-top m-b-20'>
                        <span className='listing-stages-inner-stageduration-bottom-block-top-left text-semitransperant'>public</span>
                        <div className='listing-stages-inner-stageduration-bottom-block-top-right'>
                            <span className='text-semitransperant'>STARTS IN</span>
                            <div className='listing-stages-inner-stageduration-bottom-block-top-right-box'>
                                <span>5</span>
                                <span>13</span>
                                <span>11</span>
                                <span>17</span>
                            </div>
                        </div>
                    </div>
                    <span className='listing-stages-inner-stageduration-bottom-block-middle m-t-20'>September 23 at 10:00 PM</span>
                    <div className='listing-stages-inner-stageduration-bottom-block-last'>
                        <span className='text-semitransperant'>Stage Description</span>
                        <div className='listing-stages-inner-stageduration-bottom-block-last-right'>
                            <span className='text-semitransperant'>Price</span>
                            <span className='token-row'>0.06 <img src='/img/token/34/ETH.png' /></span>
                            <span className='text-semitransperant'>MAX PER WALLET</span>
                            <span>20</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
