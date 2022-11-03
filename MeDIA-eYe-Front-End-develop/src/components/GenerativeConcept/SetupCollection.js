import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Switch from 'react-switch';
import VerticalDouble from '../Icons/VerticalDouble';
import { SortablePane, Pane } from 'react-sortable-pane';
import Dexie from 'dexie';

const SampleImage = ({ traits, order }) => {
    // const draw = (context) => {
    //     order.map(index => {
    //         if (traits[Number(index)].active) {
    //             const image = new Image();
    //             image.src = URL.createObjectURL(traits[Number(index)].files[0]);
    //             image.onload = () => {
    //                 context.drawImage(image, 0, 0, 314, 314);
    //             }
    //         }
    //     });
    // }
    // const canvas = useRef();
    // useEffect(() => {
    //     const context = canvas.current.getContext('2d');
    //     draw(context);
    // });
    return (
        <div>
            {
                order.map((index, i) => (
                    traits[index].active && <img style={{ position: 'absolute', borderRadius: '5px' }} key={i} src={URL.createObjectURL(traits[index].files[0])} />
                ))
            }
            {/* <canvas ref={canvas} width="314px" height="314px" /> */}
        </div>
    );
}

export default function SetupCollection() {
    const history = useHistory();
    const [folderList, setFolderList] = useState([]);
    const [order, setOrder] = useState([]);
    const [isDragging, setIsDragging] = useState();


    // indexed db
    const db = new Dexie('ReactDexie');
    db.version(1).stores({
        traits: "folder, files, order",
        layers: "name, files, folder, rarity"
    });

    // get all traits from user db
    useEffect(() => {
        async function getTraits() {
            const allTraits = await db.traits.toArray();
            setFolderList(Object.values(allTraits).sort((a, b) => a.order - b.order));
            setOrder(Array.from(Array(Object.values(allTraits).length), (_, i) => i));
        }
        getTraits();
    }, []);

    const handleNext = async () => {
        order.map(async (index, i) => {
            await db.traits.update(folderList[Number(index)].folder, { order: i, active: folderList[Number(index)].active });
        });
        await db.layers.clear();
        // save as layers
        const updatedTraits = await db.traits.toArray();
        const sortedTraits = Object.values(updatedTraits).sort((a, b) => a.order - b.order).filter(trait => trait.active === true);
        let temp = [];
        sortedTraits.map(trait => {
            if (trait.active) {
                let tempFiles = [];
                trait.files.map(file => {
                    tempFiles.push({
                        name: file.name.split('.')[0],
                        rarity: 100 / trait.files.length,
                        image: file
                    });
                })
                temp.push(
                    {
                        name: trait.folder,
                        rarity: 100,
                        files: tempFiles,
                        folder: trait.folder
                    }
                );
            }
        });
        db.layers.bulkAdd(temp);
        history.push({
            pathname: '/setup-collection/preview'
        });
    };

    // handle drag and drop
    const handleDnd = (orderArray) => {
        setIsDragging(true);
        setOrder(orderArray);
    }

    // handle toggle
    const handleToggle = (index, val, e) => {
        if (e.target.className !== 'react-switch-bg') return;
        let temp = [...folderList];
        temp[index].active = val;
        setFolderList(temp);
    }
    return (
        <div className="mediaeye-layout-content">
            <div className="mediaeye-layout-container setup-collection-page">
                <div className="setup-collection-page-heading">
                    <span>Setup Collection</span>
                </div>
                <div className="setup-collection-page-content">
                    <div className="setup-collection-page-content-title">
                        Adjust Default Template
                    </div>
                    <div className="setup-collection-page-content-subtitle text-grayShade">
                        Templates are used to set the layer order for each of the attribute
                        groups in your collection. You can add more templates later to
                        generate different types of tokens.
                    </div>
                    <div className={`setup-collection-page-content-inner ${folderList.length <= 6 ? 'above6' : folderList.length <= 9 ? 'above9' : folderList.length <= 15 ? 'above15' : ''}`}>
                        <div className="setup-collection-page-content-inner-left">
                            <SortablePane
                                direction="vertical"
                                onOrderChange={(val, $event) => handleDnd(val, $event)}
                                disableEffect={true}
                                onDragStop={() => setIsDragging()}
                            >
                                {Array.from(folderList).map((item, i) => {
                                    return (
                                        <Pane id={i} key={i} className="mainsss" resizable={false}>
                                            <div className="setup-collection-page-content-inner-left-element">
                                                <VerticalDouble />
                                                <label className="mediaeyeform-label mediaeyeswitch">
                                                    {item.folder}
                                                    <Switch
                                                        className={`mediaeyeswitch-btn mediaeyeswitch-left mediaeyeswitch-right ${item.active ? 'active' : ''
                                                            }`}
                                                        checkedIcon={false}
                                                        uncheckedIcon={false}
                                                        onChange={(val, $event) => handleToggle(i, val, $event)}
                                                        checked={item.active}
                                                        height={21}
                                                        width={50}
                                                        type="toggle"
                                                    />
                                                </label>
                                            </div>
                                        </Pane>
                                    )
                                })}
                            </SortablePane>
                        </div>
                        <div className="setup-collection-page-content-inner-right">
                            {
                                !isDragging && (
                                    <SampleImage order={order} traits={folderList} />
                                )
                            }
                        </div>
                    </div>
                    <div className="text-center m-t-50">
                        <button
                            className="btn btn-square btn-gaming"
                            onClick={() => handleNext()}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
