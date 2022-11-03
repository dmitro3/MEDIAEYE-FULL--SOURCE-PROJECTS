import { UploadIcon } from '../../../components/Icons';
import { Model3dSmall } from '../../../components/3d/Model3d';
export const fileUploaderLayout = (content) => {
  return (
    <div
      className={`mediaeyefileUploader-box ${content?.file?.url ? 'mediaeyefileUploader-box-uploaded' : ''
        }`}
    >
      {content?.file?.url ? (
        content?.file.name.split('.').pop() === 'gltf' ||
          content?.file.name.split('.').pop() === 'obj' ||
          content?.file.name.split('.').pop() === 'glb' ? (
          <div className="mediaeyefileUploader-box-content">
            <Model3dSmall model={content?.file.url} type={content?.file.name.split('.').pop()} />
          </div>
        ) : content?.file.type === 'video/mp4' ? (
          <div className="mediaeyefileUploader-box-content">
            <video
              className="mediaeyefileUploader-box-video"
              src={content?.file.url}
              loop
              controls
              playsInline
              controlsList="nodownload"
            />
          </div>
        ) : (
          <div className="mediaeyefileUploader-box-content">
            <img
              src={content?.file.url}
              className="mediaeyefileUploader-box-image"
              alt={content?.file.name}
            />
          </div>
        )
      ) : null}
      <div className="mediaeyefileUploader-box-info">
        <div className="mediaeyefileUploader-box-icon">
          <UploadIcon />
        </div>

        <div className="mediaeyefileUploader-box-title">
          Drag and Drop <br /> file here or browse
        </div>

        {content?.allowType ? (
          <div className="mediaeyefileUploader-box-files">
            <div className="mediaeyefileUploader-box-files-text">
              File types supported:{' '}
            </div>
            <div className="mediaeyefileUploader-box-files-value">
              {content?.allowType.join(', ')}
            </div>
          </div>
        ) : null}
        {content?.maxSize ? (
          <div className="mediaeyefileUploader-box-size">
            <div className="mediaeyefileUploader-box-size-text">
              Maximum upload file size:{' '}
            </div>
            <div className="mediaeyefileUploader-box-size-value">
              {' '}
              {content?.maxSize} MB.
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
