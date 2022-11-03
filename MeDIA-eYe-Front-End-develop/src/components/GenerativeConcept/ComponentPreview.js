import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import formatAdddress from '../../utils/formatAdddress';
import './GenerativeConcept.scss';

export default function ComponentPreview(props) {
    const { counts, traits } = props;
    // const [getFileNames, SetGetFileNames] = useState(allFolders);
    const history = useHistory();
    const someEventHandler = (event) => {
        history.push({
            pathname: '/setup-collection'
        });
    };
    return (
        <div className="Component-preview-page m-t-50">
            <div className="collection-setup-page-header text-center">
                <span className="collection-setup-page-header-head">
                    Components Preview
                </span>
            </div>
            <div className="">
                <div className="Component-preview-page-total-item">
                    <span>{counts} Components</span>
                </div>
                <div className="Component-preview-page-alldata m-b-20">
                    {traits.map((trait ,i) => {
                        return (
                            <div key={i} className="Component-preview-page-alldata-row">
                                <div className="Component-preview-page-alldata-row-title">
                                    <span className="Component-preview-page-alldata-row-title-name">
                                        {trait.folder}
                                    </span>
                                    <span className="Component-preview-page-alldata-row-title-items text-grayShade">
                                        {trait.files.length} traits
                                    </span>
                                </div>
                                {trait.files.map((item, j) => {
                                    return (
                                        <div key={j} className="Component-preview-page-alldata-row-cards">
                                            <div className="Component-preview-page-alldata-row-cards-section">
                                                <div className="Component-preview-page-alldata-row-cards-section-block">
                                                    <img src={URL.createObjectURL(item)} />
                                                </div>
                                                {/* <span>{(item.name.split('.')[0]).length > 13 ? formatAdddress(
                                                    item.name.split('.')[0]
                                                ) : item.name.split('.')[0]}</span> */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="text-center m-t-50" onClick={() => someEventHandler()}>
                    <button className="btn btn-square btn-gaming">Next</button>
                </div>
            </div>
        </div>
    );
}
