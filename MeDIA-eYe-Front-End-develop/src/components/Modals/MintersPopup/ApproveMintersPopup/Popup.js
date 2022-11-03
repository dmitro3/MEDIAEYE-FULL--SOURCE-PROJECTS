import React from 'react'
import CloseIcon from '../../../Icons/CloseIcon';
import { useHistory } from 'react-router-dom';

const Popup = (props) => {
  const { showPopup, togglePopup, minter, handleGrantRole } = props;
  let history = useHistory();

  return (
    <React.Fragment>
      <div
        className={
          showPopup
            ? ' popup active '
            : ' popup popup_minter_approve'
        }
      >
        <div
          className={

            'popup-wrapper popup-wrapper_general create_campaign'
          }
        >
          <div
            className="container"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={

                ' main_add_popup general_popup create_campaign_block'
              }
            >
              <div className="close" onClick={() => togglePopup()}>
                <CloseIcon />
              </div>
              <div
                className={

                  ' add_block_colletion create_campaign_block'
                }
              >
                <div className="active_minters_block">
                  <img src={minter?.img} alt="avatar" />
                  <h5 onClick={() => history.push('/account')}>
                    {minter?.value}
                  </h5>
                  <span>{minter?.address}</span>
                </div>
                <h3>Confirm Minter?</h3>
                <button
                  type="butotn"
                  className="btn btn-info"
                  onClick={() => {
                    handleGrantRole(minter);
                  }}
                >
                  Confirm Minters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Popup;
