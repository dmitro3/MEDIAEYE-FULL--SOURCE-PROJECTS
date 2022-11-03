import React, { useCallback, useEffect, useRef } from 'react';
import "./Following.scss";
import Cross from "../../icons/CrossIcon";
import Follow from "../../../assets/images/mickey_pig.png";
import { userService } from '../../../services/api.service';

const Following = (props) => {
  const { toggleReadyPopup, readyPopup, users, setSkip, followings, setFollowings } = props;
  // const [addActive, setAddActive] = useState();

  const followRef = useRef();

  // scroll listener
  const handleScroll = useCallback((event) => {
    setSkip(Math.floor(event.currentTarget.scrollTop / 265 * 10));
  }, []);

  // attach scroll listener to the div
  useEffect(() => {
    const div = followRef.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
    }
  }, [handleScroll, followRef.current, readyPopup]);

  

  const handleFollowing = async(user) => {
    const index = followings.findIndex(following => following.id === user.id);
    let temp = [...followings];
    if(index === -1) {
      temp.push(user);     
    } else {
      temp.splice(index, 1);
    }
    await userService.handleFollowing(temp); 
    setFollowings(temp);
  }

  // check following
  const isFollowing = (user) => {
    const index = followings.findIndex(following => following.id === user.id);
    return index === -1 ? false : true;
  }

  return (
    <>
      {readyPopup ? (
        <div className='follow-modal'>
          <div className='follow-modal-ct'>
            <div className='follow-main-modal'>
              <div className='follow-main-modal-header'>
                <h2 className='title'>FOLLOWING</h2>
                <button className="follow-btn"
                  onClick={() => { toggleReadyPopup(); }}
                ><Cross />
                </button>
              </div>
              <div ref={followRef} className='follow-main-modal-body'>
                {
                  users.map((user, i) => (
                    <div key={i} className='follow-main-modal-body-inner'>
                      <img className="user-logo" src={!!user.avatar ? user.avatar : Follow} alt="user" />
                      <div className='follow-data'>
                        <p className='username'>{!!user.username ? user.username : user.email}</p>
                        <p style={{ width: '230px' }} className='user-description'>
                          {user.bio}
                        </p>
                      </div>
                      <button
                        className={
                          !!isFollowing(user)
                            ? "active btn btn-grey"
                            : " btn btn-info"
                        }
                        onClick={() => handleFollowing(user)}
                      >
                        {!!isFollowing(user) ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  ))
                }
              </div>
            </div>


          </div>
        </div>) : null}
    </>
  )
}

export default Following;
