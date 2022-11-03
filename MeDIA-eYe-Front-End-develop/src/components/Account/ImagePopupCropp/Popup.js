import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Popup.scss';
import CloseIcon from '../../Icons/CloseIcon';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeImagePopupCropp,
  updateImagePopupCroppCoordinate
} from '../../../store/app/appSlice';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Popup = (props) => {
  const showPopup = useSelector((state) => state.app.showImagePopupCropp);
  const file = useSelector((state) => state.app.ImagePopupCroppFile);
  const aspect = useSelector((state) => state.app.imagePopupCroppAspect);
  const [src, setSrc] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    height: 50,
    width: 50,
    aspect: 1 / 1
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (aspect) {
      setCrop({
        unit: 'px',
        height: aspect[1] * 30,
        width: aspect[0] * 30,
        aspect: aspect[0] / aspect[1]
      });
    }
  }, [aspect]);

  useEffect(() => {
    if (file) {
      let url = URL.createObjectURL(file);
      setSrc(url);
      setCrop({
        unit: 'px',
        height: aspect[1] * 30,
        width: aspect[0] * 30,
        aspect: aspect[0] / aspect[1]
      });
    }
  }, [file]);

  // useEffect(() => {
  //   console.log(completedCrop);
  // }, [completedCrop]);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);

  return (
    <React.Fragment>
      {showPopup ? (
        <div className={showPopup ? 'popup active' : 'popup'}>
          <div
            className="popup-wrapper image_popup_cropp"
            onClick={() => dispatch(closeImagePopupCropp())}
          >
            <div onClick={(event) => event.stopPropagation()}>
              <div className="container marketplace">
                <div className="main_add_popup">
                  <div
                    className="close"
                    onClick={() => dispatch(closeImagePopupCropp())}
                  >
                    <CloseIcon />
                  </div>

                  <div className="image_popup_field">
                    <ReactCrop
                      src={src}
                      crop={crop}
                      onImageLoaded={onLoad}
                      onChange={(c, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c, percentCrop) => {
                        setCompletedCrop(percentCrop);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    className="download_button"
                    onClick={() =>
                      dispatch(updateImagePopupCroppCoordinate(completedCrop))
                    }
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default Popup;
