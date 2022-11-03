import React, { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toggleGeneralPopup } from '../../store/app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import './GenerativeConcept.scss';
import { useMoralis } from 'react-moralis';
import { fileUploaderLayout } from '../../blockchain/functions/Utils';
import background from '../../assets/img/generativeCollection/setup_collection_banner.png';
import ComponentPreview from './ComponentPreview';
import Resizer from 'react-image-file-resizer';
import Dexie from 'dexie';
import { async } from 'validate.js';

export default function DragAndDropSection() {
    const dispatch = useDispatch();
    const { Moralis, user, isInitialized, web3 } = useMoralis();
    const [uploads, setUploads] = useState([]);
    const [imageCounts, setImageCounts] = useState(0);
    const [traits, setTraits] = useState([]);

    const db = new Dexie('ReactDexie');
    db.version(1).stores({
        traits: "folder, files, active, order",
        layers: "name, rarity, files, folder"
    });

    useEffect(() => {
        processUploads();
    }, [uploads]);

    useEffect(() => {
        async function getTraits() {
            const allTraits = await db.traits.toArray();
            setTraits(Object.values(allTraits));
            let temp = 0;
            Object.values(allTraits).map(trait => {
                temp += trait.files.length;
                console.log(temp);
            });
            setImageCounts(temp);
        }
        getTraits();
    }, []);


    const handleChange = (e) => {
        const finalFolder = Array.from(e.target.files)
            .filter((x) => x.type === 'image/png' || x.type === 'image/jpeg' || x.type === 'image/jpg' || x.type === 'image/gif').map((item) => {
                return item;
            })
        setUploads(finalFolder);
    };
    const processUploads = async () => {
        const files = Array.from(uploads);
        const folders = new Set(
            files.map((file) => {
                const path = file.webkitRelativePath;
                const splittedPath = path.split('/');
                const folderName = splittedPath[splittedPath.length - 2];
                const rootFolderPath = splittedPath[0];

                // return rootFolderPath + "/" + folderName;
                return file.type.includes('image') && folderName;
            })
        );
        const filesWithFolder = Array.from(folders)
            .filter((x) => x)
            .map((folder, order) => {
                return {
                    folder,
                    files: files.filter((file) =>
                        file.webkitRelativePath.includes(folder)
                    ),
                    active: true,
                    order: order,
                };
            });
        setTraits(filesWithFolder);
        db.traits.bulkAdd(filesWithFolder);
        let temp = 0;
        filesWithFolder.map(folder => {
            temp += folder.files.length;
            setImageCounts(temp);
        });
    };

    return (
        <div className="collection-setup-page">
            <div className={imageCounts > 0 ? '' : 'mediaeye-layout-content'}>
                <div className="mediaeye-layout-container">
                    {imageCounts > 0 ? (
                        <ComponentPreview
                            counts={imageCounts}
                            traits={traits}
                        />
                    ) : (
                        <div className="">
                            <div className="collection-setup-page-header text-center">
                                <span className="collection-setup-page-header-head">
                                    Setup Collection
                                </span>
                                <span className="collection-setup-page-header-bottom text-grayShade">
                                    Be creative and individual and then you will be noticed
                                </span>
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
                                                Or <span>choose a folder</span>to get started
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
                                            accept="image/png, image/gif, image/jpeg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
