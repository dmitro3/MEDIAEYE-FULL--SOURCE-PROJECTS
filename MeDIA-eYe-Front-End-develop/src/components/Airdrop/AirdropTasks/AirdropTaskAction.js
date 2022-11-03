import React from 'react';
import {
  follow_twitter_user,
  TaskAction
} from '../../../blockchain/functions/Airdrops/TaskAction';
import './AirdropTasks.scss';
import TASKS from './Tasks';
import { useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import { submitTask } from '../../../blockchain/functions/Airdrops';

const AirdropTaskAction = (props) => {
  const dispatch = useDispatch();
  const {
    Moralis,
    airdrop,
    completed,
    onTaskSaved,
    setCurrentFields,
    task,
    media,
    params,
    switchPopup,
    switchCommentPopup,
    refreshTasks
  } = props;
  const msg = TASKS[media][task]?.msg;

  const btnPressed = async () => {
    try {
      // open popup if proof is required
      if (TASKS[media][task].proofRequired) {
        TaskAction({ task: task, params: params });
        // set current task and media in AirdropTasks component
        switchPopup(task, media);
      } else if (TASKS[media][task].inputRequired) {
        // set current task and media in AirdropTasks component
        switchCommentPopup(task, media);
      } else {
        // commit action directly
        TaskAction({ task: task, params: params });
        // confirm task finished
        const currUser = Moralis.User.current();
        await submitTask(Moralis, {
          airdrop: airdrop,
          task: task,
          media: media,
          user: currUser?.attributes?.ethAddress
        });
        // check completed tasks
        refreshTasks();
      }
    } catch (e) {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message: 'Something Went Wrong!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
  };
  return (
    <div className="mediaeye-task-row">
      <button type="button" className={`btn ${TASKS[media].SHORTNAME}`}>
        {media?.toUpperCase()}
      </button>
      <div className="mediaeye-task-row-inner">
        <h6>
          {
            // if msg contains an @, fill with first param
            msg
              ? msg.indexOf('@') !== -1
                ? msg.slice(0, msg.indexOf('@') + 1) +
                  params[Object.keys(params)[0]] +
                  msg.slice(msg.indexOf('@') + 1)
                : msg
              : null
          }
        </h6>

        <button
          type="button"
          onClick={btnPressed}
          className="btn btn-info"
          disabled={completed}
          style={completed ? { background: 'green' } : {}}
        >
          {completed ? 'DONE' : msg?.split(' ')[0]?.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default AirdropTaskAction;
