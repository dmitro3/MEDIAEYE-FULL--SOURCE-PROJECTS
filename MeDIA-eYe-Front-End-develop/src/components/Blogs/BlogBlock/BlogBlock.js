import React from 'react';
import './BlogBlock.scss';

export default function BlogBlock(props) {
  const { blog } = props;

  return (
    <div className="mediaeye-blogs-card">
      <a
        target="_blank"
        href={blog?.link}
        className="mediaeye-blogs-card-inner"
        title={blog?.title?.rendered}
      >
        <div className="mediaeye-blogs-card-inner-imgbox">
          <div className="mediaeye-blogs-card-inner-imgbox-slide">
            <img
              src={blog?.yoast_head_json?.og_image[0]?.url}
              alt={blog?.title?.rendered}
            />
          </div>
        </div>

        <div className="mediaeye-blogs-card-inner-content">
          <div className="mediaeye-blogs-card-inner-content-title">
            {blog?.title?.rendered}
          </div>
          <div
            className="mediaeye-blogs-card-inner-content-des"
            dangerouslySetInnerHTML={{ __html: blog?.excerpt?.rendered }}
          ></div>
        </div>
      </a>
    </div>
  );
}
