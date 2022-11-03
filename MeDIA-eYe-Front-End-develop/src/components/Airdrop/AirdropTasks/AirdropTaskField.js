import React from 'react';
import './AirdropTasks.scss';
import TASKS from './Tasks';

const AirdropTaskField = (props) => {
  const {
    currentFields,
    onTaskSaved,
    onTaskCancel,
    params,
    setCurrentFields,
    task,
    media,
    airdropTasksFromId,
    airdropTaskInputError
  } = props;
  return (
    <div
      className="mediaeyesocialtask-airsocial-socialmedia singlebox"
      id={airdropTasksFromId}
    >
      <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
        <button
          className={`mediaeyesocialtask-airsocial-socialmedia-boxLeft-button btn ${TASKS[media].SHORTNAME}`}
        >
          {media.charAt(0).toUpperCase() +
            media.toLowerCase().substring(1, media.length)}
        </button>
        {params.map((field) => {
          return (
            <div className="mediaeyeform-group">
              <label className="mediaeyeform-label">{field.name}</label>
              <div className="mediaeyeform-group-input">
                <input
                  className={
                    airdropTaskInputError?.name
                      ? 'mediaeyeform-input mediaeyeform-group-input-error-border'
                      : 'mediaeyeform-input'
                  }
                  type="text"
                  placeholder={`Enter ${field.name}`}
                  onChange={(e) => {
                    const newFields = { ...currentFields };
                    newFields[`${field.id}`] = e.target.value;
                    setCurrentFields(newFields);
                  }}
                  name="name"
                />
              </div>
              {airdropTaskInputError?.name ? (
                <div className="mediaeyeform-group-input-error-message">{`${field.name} can't be blank`}</div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mediaeyesocialtask-airsocial-socialmedia-boxadd">
        <button
          className="mediaeyesocialtask-airsocial-socialmedia-boxadd-button btn btn-info"
          onClick={() =>
            onTaskSaved(TASKS[media][task].id, media, currentFields)
          }
        >
          Save
        </button>
        <button
          className="mediaeyesocialtask-airsocial-socialmedia-boxadd-button btn btn-featured"
          onClick={() => onTaskCancel(media, task)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AirdropTaskField;
