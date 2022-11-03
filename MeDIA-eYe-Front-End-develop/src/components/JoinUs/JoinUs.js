import React, { useEffect } from 'react';
import './JoinUs.scss';
import { useDispatch } from 'react-redux';

// Images & media
import join_us_mov from '../../assets/media/join_us_mov.MP4';
import PlayPause from '../../assets/img/about_us/youtube_1.svg';
import { useSelector } from 'react-redux';
import { togglePartnersPopup } from '../../store/app/appSlice';
import PlayPauseIcon from '../Icons/PlayPauseIcon';
const JoinUs = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const video = document.getElementById('videoc');
    const videocontainer = document.getElementById('video-play');
    const circlePlayButton = document.getElementById('square-play-b');

    function togglePlayV() {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    videocontainer.addEventListener('click', togglePlayV);
    video.addEventListener('playing', function () {
      circlePlayButton.style.opacity = 0;
    });
    video.addEventListener('pause', function () {
      circlePlayButton.style.opacity = 1;
    });
  });

  return (
    <div className="join_us">
      <div className="webp no-webp main_join_us">
        <h2 className="join_us_title">
          <span>
            MEDIA EYE is nft<span>s</span> unbound!
            <br />
          </span>
          OPENING THE GATE to the metaverse
        </h2>
        <div className="join_us_video_box">
          <div className="join_us_video" id="video-play">
            <video id="videoc" src={join_us_mov}></video>
            <div className="play-button-wrapper">
              <div title="Play video" className="play-gif" id="square-play-b">
                <PlayPauseIcon />
                {/* <img src={PlayPause} alt="VideoBtn"/> */}
              </div>
            </div>
          </div>
        </div>
        <h6 className="join_us_para">
          protocols, creators, influencers, promoters, brands, businesses,
          charities... join us
        </h6>
        <button
          type="button"
          onClick={() => dispatch(togglePartnersPopup())}
          className="btn btn-main"
        >
          Become a partner
        </button>
      </div>
    </div>
  );
};

export default JoinUs;
