import React from 'react';
import { useHistory } from 'react-router-dom';
import { uploadService, baseUrl } from '../../../services/api.service';
import { BackArrow, CloseIcon } from '../../Icons';
import './ImagePreviewPopup.scss';

export default function CollectionImagePreviewPopup(props) {
  const history = useHistory();

  const { images, createNFT, generatedCount,  totalNfts} = props;

  const create = async () => {
    let metaArray = [];
    images.map((image) => {
      metaArray.push(image.metadata);
    });
    await createNFT(metaArray);
    props.togglePopup();
  };

  return (
    <>
      {props.showPopup ? (
        <div
          className={
            props.showPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div className="mediaeye-popup-wrapper scrolled image-preview-popup">
            <div
              className="mediaeye-popup-content "
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="image-preview-popup-header">
                  <span>Preview</span>
                </div>
                <div className="image-preview-popup-content">
                  {images.map((item) => (
                    <div className="image-preview-popup-content-col">
                      <img
                        src={item.img}
                        className="image-preview-popup-content-col-img"
                        alt="Avatar"
                      />
                    </div>
                  ))}
                </div>
                <div className="image-preview-popup-bottom_row">
                  <button
                    type="button"
                    className="btn btn-transperant m-r-20"
                    onClick={() => props.togglePopup()}
                  >
                    Go Back
                  </button>
                  <a
                    href={props.downloadable ? `${baseUrl}upload/download/${props.collection.userId}/${props.collection.name}`: '#'}
                    type="button"
                    className="btn btn-transperant m-l-30 m-r-20"
                  >
                    { totalNfts > generatedCount ? `${generatedCount}/${totalNfts}` : 'Download' }
                  </a>
                  <button
                    type="button"
                    onClick={create}
                    className="btn btn-creative m-l-30"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
