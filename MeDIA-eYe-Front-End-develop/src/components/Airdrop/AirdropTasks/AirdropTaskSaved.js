import React, { useState } from 'react';
import './AirdropTasks.scss';
import TASKS from './Tasks';
import { Edit, Close } from '../../Icons/';

const AirdropTaskSaved = (props) => {
  const { onTaskSaved, editBox, params, task, media, removeTask } = props;
  const [savedFields, setSavedFields] = useState(params);

  const fields = () => {
    let fieldList = [];
    for (const field in params) {
      fieldList.push(
        <input
          key={field}
          type="text"
          placeholder={field}
          value={params[field]}
          className="mediaeyeform-input mediaeyeform-input-round"
          disabled
        />
      );
    }
    return fieldList;
  };
  return (
    <div className="mediaeyesocialtask-airsocial-socialmedia editBox">
      <div className="mediaeyesocialtask-airsocial-socialmedia-boxLeft">
        <button className={`btn ${TASKS[media].SHORTNAME}`}>
          {media.charAt(0).toUpperCase() +
            media.toLowerCase().substring(1, media.length)}
        </button>
        <div className="mediaeyeform-group-input">
          {fields()}

          <button
            className="mediaeyeform-group-input-btn mediaeyesocialtask-airsocial-socialmedia-boxright-icon"
            onClick={() => {
              // TODO: change edit button to save button and make field editable
            }}
          >
            <Edit />
          </button>
        </div>
      </div>
      <div className="btn btn-info mediaeyesocialtask-airsocial-socialmedia-boxright">
        <button
          onClick={() => {
            removeTask(media, task);
          }}
          className=""
        >
          <Close />
        </button>
      </div>
    </div>
  );
};

export default AirdropTaskSaved;
