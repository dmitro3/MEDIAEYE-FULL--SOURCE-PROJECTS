import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleGeneralPopup } from '../../../store/app/appSlice';
import AgreeBlock from '../../Common/AgreeBlock';
import './AirdropRegisterPopup.scss';
import { AirdropContext } from '../../../context/AirdropContext';

export default function AirdropRegisterPopup(props) {
  const { Moralis, airdrop, toggleAirdropRegisterPopup, registerPopup } = props;
  const { inputValue, setInputValue } = useState('');
  const [termsAgree, setTermsAgree] = useState(false);
  const { completedTasks } = useContext(AirdropContext);
  const dispatch = useDispatch();
  const toggleTermsAgree = () => {
    setTermsAgree(!termsAgree);
  };

  useEffect(() => {
    //  console.log(ethAddress, "eth address");
  });

  const isTasksFinished = () => {
    if (airdrop?.attributes?.tasks.length === 0) {
      return true;
    }

    for (let media in airdrop?.attributes?.tasks) {
      // if key does not exist in completed task return false
      if (completedTasks.hasOwnProperty(media)) {
        for (let task in airdrop?.attributes?.tasks[media]) {
          // if status is not true or task is null in completedTasks dict return false
          if (!completedTasks[media][task]?.attributes?.status) {
            return false;
          }
        }
      } else {
        return false;
      }
    }
    return true;
  };

  const regPressed = async () => {
    // check if all completedTasks are finished
    const isFinished = isTasksFinished();
    console.log('register ready', isFinished);

    if (isFinished) {
      console.log('params', airdrop?.id);
      const res = await Moralis.Cloud.run('RegisterAirdrop', {
        address: 'test',
        airdropId: airdrop?.id
      });
      console.log(res);
      dispatch(
        toggleGeneralPopup({
          status: 'success',
          message: `Registration Successful`,
          textButton: 'OK',
          size: 'sm'
        })
      );
    } else {
      dispatch(
        toggleGeneralPopup({
          status: 'error',
          message:
            'Must complete all tasks to become eligible for registration!',
          textButton: 'OK',
          size: 'sm'
        })
      );
    }
    toggleAirdropRegisterPopup();
  };
  return (
    <>
      {registerPopup ? (
        <div
          className={
            props.registerPopup
              ? 'mediaeye-popup active mediaeye-popup-sm'
              : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => toggleAirdropRegisterPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-register-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div className="mediaeye-popup-content-inner-header">
                  <div className="mediaeye-popup-content-inner-header-title text-center">
                    Join Airdrop
                  </div>
                </div>
                <div className="mediaeyeform-group">
                  <label className="mediaeyeform-label">Wallet Address</label>
                  <div className="mediaeyeform-group-input">
                    <input
                      type="text"
                      className="mediaeyeform-input"
                      value={inputValue}
                    />
                  </div>
                </div>
                {/* <div className="airdrop-register-popup-subtitle">
                  
                </div>
                <div className="airdrop-register-popup-input">
                  <input type="text" value={inputValue} />
                </div> */}
                <div className="airdrop-register-popup-time">
                  <span>Claiming Starts</span>
                  <span>04 hr : 24 min : 46 sec</span>
                </div>
                <div className="airdrop-register-popup-terms">
                  <AgreeBlock
                    agree={termsAgree}
                    toggleAgree={toggleTermsAgree}
                  />
                </div>
                <div className="airdrop-register-popup-bottom">
                  <button
                    type="button"
                    className={
                      termsAgree
                        ? 'btn btn-lg btn-info'
                        : 'btn btn-lg btn-disable'
                    }
                    disabled={!termsAgree}
                    onClick={() => regPressed()}
                  >
                    Register
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
