import React from "react";
import MainHome from "../Components/MainHome/MainHome";
import WhatHome from "../Components/WhatHome/WhatHome";
import CustomHome from "../Components/CustomHome/CustomHome";

const Home = () => {
  return (
    <React.Fragment>
      <div className="mediaeyeAvatar-home ">
        <div className="mediaeyeAvatar-home-mainNoise"></div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymou" />
        <link
          href="https://fonts.googleapis.com/css2?family=Goldman&display=swap"
          rel="stylesheet"
        />
        <div className="mediaeyeAvatar-home-mainback"></div>
        <div className="mediaeyeAvatar-home-mainbackg topMT"></div>
        <div className="mediaeyeAvatar-home-mainbackr"></div>
        <div className="mediaeyeAvatar-layout-content">
          <MainHome />
          <WhatHome />
          <CustomHome />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
