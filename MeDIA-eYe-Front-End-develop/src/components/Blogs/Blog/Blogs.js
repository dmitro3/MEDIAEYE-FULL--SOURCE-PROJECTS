import React, { useState, useEffect } from 'react';
import './Blogs.scss';
import BlogBlock from '../BlogBlock/BlogBlock';
import axios from 'axios';
export default function Blogs(props) {
  const [BlogData, setBlogData] = useState([]);
  const [activeTabs, setActiveTabs] = useState('4');
  const limit = 3;
  const page = 1;
  useEffect(() => {
    setBlogData([]);
    axios(
      'https://blog.mediaeyenft.com/wp-json/wp/v2/posts?categories=' + activeTabs + '&per_page=' + limit + '&page=' + page)
      .then(function (response) {
        if (response?.status === 200) {
          let data = response?.data;
          setBlogData(data);
        }
      }).catch(function (error) { });
  }, [activeTabs]);

  return (
    <>
      <div className="mediaeye-blogs-tabs">
        <div className="mediaeye-tabss-lists mediaeye-blogs-tabs-list">
          <div className="mediaeye-blogs-tabs-middle">
            <button type="button" className={`mediaeye-blogs-tabs-list-btn  ${activeTabs === '4' ? 'active-tab' : ''} `} onClick={() => { setActiveTabs('4'); }}>
              ALL NEWS
              <div className="tab-lists-line"></div>
            </button>
            <button type="button" className={`mediaeye-blogs-tabs-list-btn  ${activeTabs === '135' ? 'active-tab' : ''} `} onClick={() => { setActiveTabs('135'); }}>
              SPOTLIGHT
              <div className="tab-lists-line"></div>
            </button>
            <button type="button" className={`mediaeye-blogs-tabs-list-btn  ${activeTabs === '136' ? 'active-tab' : ''} `} onClick={() => { setActiveTabs('136'); }}>
              NFT Collections & Collaborations
              <div className="tab-lists-line"></div>
            </button>
            <button type="button" className={`mediaeye-blogs-tabs-list-btn  ${activeTabs === '137' ? 'active-tab' : ''} `} onClick={() => { setActiveTabs('137'); }}>
              Events & Airdrops
              <div className="tab-lists-line"></div>
            </button>
          </div>
        </div>
        <div className="mediaeye-blogs-tabs-content">
          <div className="mediaeye-blogs-tabs-middle">
            <div className="mediaeye-blogs-row">
              {BlogData.map((blog, i) => (
                <BlogBlock blog={blog} key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
