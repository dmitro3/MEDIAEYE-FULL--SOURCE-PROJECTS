import React, { useRef, useState, useEffect } from 'react';
import './CreateProductMintBlock.scss';
import Close from '../../Icons/Close';
import { Model3dSmall } from '../../3d/Model3d';
import { Edit, ImagePlug } from '../../Icons';

const CreateProductMintBlock = (props) => {
  const {
    product,
    addImage,
    activeToken,
    lazyMint,
    tokenIds,
    content,
    addAmount,
    removeContent,
    index,
    onClickEdit
  } = props;
  const id = content.id;
  const [tokenId, setTokenId] = useState('');
  const [amount, setAmount] = useState(1);
  const [activeImage, setActiveImage] = useState(false);

  const handleRemoveContent = () => {
    removeContent(index);
  };

  return (
    <div className="create_mint_block">
      <div className="create_mint_block_img">
        <div className="create_mint_block_img_wrapper">
          <button
            className="create_mint_block_close"
            onClick={(event) => {
              event.stopPropagation();
              handleRemoveContent();
            }}
          >
            <Close />
          </button>

          {content.file ? (
            content.filesType === 'video/mp4' ? (
              <video
                style={{
                  aspectRatio: '1/1',
                  objectFit: 'contain',
                  maxWidth: '140px',
                  margin: '0 auto'
                }}
                preload="metadata"
                src={content.file.url}
                loop
                controls
                playsInline
                className={null}
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            ) : content.filesType === 'gltf' || content.filesType === 'obj' || content.filesType === 'glb' ? (
              <Model3dSmall model={content.file.url} type={content.filesType} />
            ) : (
              <img src={content.file.url} alt="product" className={null} />
            )
          ) : (
            <ImagePlug />
          )}
        </div>
      </div>

      <div className="create_mint_block_info">
        <h6>{content.name}</h6>
        <div className="create_mint_block_wrapper" onClick={onClickEdit}>
          <button>Edit Content </button>
          <Edit type={'square'} />
        </div>
      </div>
    </div>
  );
};

export default CreateProductMintBlock;
