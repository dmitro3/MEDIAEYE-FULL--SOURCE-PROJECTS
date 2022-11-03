import React, { useState } from "react";
import Slider from "react-slick";
import "./ProfileCreatives.scss";
import VideoPopUp from "../../../Components/Modals/ShowvideoPopUp/ShowvideoPopUp";
import ImagePopUp from "../../../Components/Modals/ShowImagePopUp/ShowImagePopUp";
import PlayCircle from "../../icons/PlayCircle";
import Play from "../../icons/Play";
import AddIcon from "../../icons/Add_icon";
import Gallery from "../../icons/Gallery";
import vid_img_1 from "../../../assets/images/vid-img-1.png";
import ChooseFile from "../../Modals/ChooseFileModal/ChooseFileModal";
import { baseUrl, uploadService } from "../../../services/api.service";
import { CrossIcon } from "../../icons";

const ProfileCreatives = (props) => {
  const { creative, handleCreative, updateUser } = props;
  const [readyPopup, setReady] = useState(false);
  const [readyPopup1, setReady1] = useState();
  const [playMusic, setPlayMusic] = useState();

  const toggleReadyPopup = () => {
    setReady(!readyPopup);
  };
  const toggleReadyPopup1 = (imageSrc) => {
    setReady1(imageSrc);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const onImageChange = async (event) => {
    if (!event.target.files[0]) return;
    const formdata = new FormData();
    formdata.append("file", event.target.files[0]);
    const res = await uploadService.upload(formdata);
    let temp = { ...creative };
    if (!temp.art) temp.art = [];
    temp.art.push(res);
    handleCreative(temp);
  };

  // handle music change
  const handleMusics = (payload) => {
    let temp = { ...creative };
    temp.musics = payload;
    handleCreative(temp);
  };

  // handle music play
  const handleMusicPlay = (index) => {
    const audio = new Audio(
      `${baseUrl}/upload/stream/${creative.musics[index].filename}`
    );
    if (!!playMusic) {
      playMusic.pause();
      setPlayMusic();
    }
    if ((!!playMusic && audio.src !== playMusic.src) || !playMusic) {
      audio.play();
      setPlayMusic(audio);
    }
  };

  const [chooseFile, setChooseFile] = useState(false);

  const toggleChooseFile = (index) => {
    setChooseFile(index);
  };

  return (
    <React.Fragment>
      <div className="creative-modal">
        <VideoPopUp
          readyPopup={readyPopup}
          toggleReadyPopup={toggleReadyPopup}
        />
        <ImagePopUp
          readyPopup1={readyPopup1}
          toggleReadyPopup1={toggleReadyPopup1}
        />
      </div>

      <div className="creatives-wrap">
        <ChooseFile
          chooseFile={chooseFile}
          toggleChooseFile={toggleChooseFile}
          handleMusics={handleMusics}
          musics={creative.musics}
        />
        <div className="creatives-wrap-music">
          <h3 style={{ marginBottom: "0" }} className="creatives-wrap-heading">
            <PlayCircle /> music
          </h3>
          <ul className="creatives-wrap-music-list">
            {!!creative.musics &&
              creative.musics.map((music, i) => (
                <li key={i} className="creatives-wrap-music-list-single">
                  <div
                    onClick={() => handleMusicPlay(i)}
                    style={{ cursor: "pointer" }}
                    className="creatives-wrap-music-list-single-a"
                  >
                    <Play /> {music.originalname}
                  </div>
                  {props.isVisible === "profile" ? (
                    <button
                      className="creatives-wrap-music-list-single-pencil-btn"
                      onClick={() => toggleChooseFile(i + 1)}
                    >
                      <CrossIcon />
                    </button>
                  ) : null}
                </li>
              ))}
          </ul>

          {props.isVisible === "profile" ? (
            <button
              className="creatives-wrap-music-add-btn"
              onClick={() => toggleChooseFile(-1)}
            >
              <AddIcon />
              Add
            </button>
          ) : null}
          {/* {props.isVisible=="profile" ? <button className='creatives-wrap-music-add-btn' onClick={addMusic}> <AddIcon/>Add </button>
              : null} */}
        </div>
        {/* creative videos */}
        <div className="creatives-wrap-video">
          <h3 className="creatives-wrap-heading">
            {" "}
            <Play /> videos{" "}
          </h3>
          <div className="creatives-wrap-com-slider">
            <Slider {...settings}>
              {!!creative.videos &&
                creative.videos.map((video, i) => (
                  <div
                    key={i}
                    className="creatives-wrap-com-slider-single-slide"
                  >
                    <img
                      src={vid_img_1}
                      alt="No img"
                      onClick={() => toggleReadyPopup()}
                    />
                  </div>
                ))}
              {props.isVisible === "profile" ? (
                <div className="creatives-wrap-com-slider-single-slide">
                  <label className="creatives-wrap-com-slider-single-slide-add">
                    <AddIcon />
                    Add
                  </label>
                </div>
              ) : null}
            </Slider>
          </div>
        </div>
        {/* creative art */}
        <div className="creatives-wrap-art">
          <h3 className="creatives-wrap-heading">
            <Gallery /> art
          </h3>

          <div className="creatives-wrap-com-slider">
            <Slider {...settings}>
              {!!creative.art &&
                creative.art.map((image, i) => (
                  <div
                    key={i}
                    className="creatives-wrap-com-slider-single-slide"
                  >
                    <img
                      src={`${baseUrl}/upload/${image.filename}`}
                      alt="No img"
                      onClick={() =>
                        toggleReadyPopup1(`${baseUrl}/upload/${image.filename}`)
                      }
                    />
                  </div>
                ))}
              {props.isVisible === "profile" ? (
                <div className="creatives-wrap-com-slider-single-slide">
                  <label
                    className="creatives-wrap-com-slider-single-slide-add"
                    htmlFor="choose_img"
                  >
                    <AddIcon />
                    Add
                  </label>
                </div>
              ) : null}
            </Slider>
            <div className="choose-img-wrap">
              <input
                type="file"
                onChange={onImageChange}
                className="choose-img-wrap-input"
                id="choose_img"
              />
            </div>
          </div>
        </div>
      </div>
      <button onClick={updateUser} className="btn btn-dark">
        Save
      </button>
    </React.Fragment>
  );
};

export default ProfileCreatives;
