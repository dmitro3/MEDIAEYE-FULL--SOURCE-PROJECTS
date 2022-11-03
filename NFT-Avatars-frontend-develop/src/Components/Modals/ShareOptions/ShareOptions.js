import React from "react";
import "./ShareOptions.scss";
import Cross from "../../icons/CrossIcon";
import Search from "../../icons/Search";

const ShareOptions = (props) => {
  const { toggleShareOptions, shareOptions } = props;

  return (
    <>
      {shareOptions ? (
        <div className="share-modal">
          <div className="share-modal-ct">
            <button
              className="share-modal-close"
              onClick={() => {
                toggleShareOptions();
              }}
            >
              {" "}
              <Cross />{" "}
            </button>
            <h1 className="share-modal-heaidng">Share options</h1>
            <div className="share-modal-all-followers">
              <div>
                <input
                  type="checkbox"
                  className="share-modal-all-followers-input"
                  id="follower"
                />
                <label className="share-modal-all-followers-input-box"></label>
              </div>
              <label className="share-modal-all-followers-label" htmlFor="follower">
                All My Followers
              </label>
            </div>
            <div className="share-modal-search">
              <Search />{" "}
              <input
                className="share-modal-search-input"
                type="text"
                placeholder="Search"
              />
            </div>
            <ul className="share-modal-follower-list">
              <li className="share-modal-follower-list-single">
                <span>Mickey Mouse</span>{" "}
                <button className="share-modal-follower-list-single-cross">
                  {" "}
                  <Cross />{" "}
                </button>
              </li>
              <li className="share-modal-follower-list-single">
                <span>Mickey Mouse</span>{" "}
                <button className="share-modal-follower-list-single-cross">
                  {" "}
                  <Cross />{" "}
                </button>
              </li>
              <li className="share-modal-follower-list-single">
                <span>Mickey Mouse</span>{" "}
                <button className="share-modal-follower-list-single-cross">
                  {" "}
                  <Cross />{" "}
                </button>
              </li>
              <li className="share-modal-follower-list-single">
                <span>Mickey Mouse</span>{" "}
                <button className="share-modal-follower-list-single-cross">
                  {" "}
                  <Cross />{" "}
                </button>
              </li>
              <li className="share-modal-follower-list-single">
                <span>Mickey Mouse</span>{" "}
                <button className="share-modal-follower-list-single-cross">
                  {" "}
                  <Cross />{" "}
                </button>
              </li>
              <li className="share-modal-follower-list-single">
                <span>Mickey Mouse</span>{" "}
                <button className="share-modal-follower-list-single-cross">
                  {" "}
                  <Cross />{" "}
                </button>
              </li>
            </ul>
            <div className="share-modal-blacklist">
              <h3 className="share-modal-blacklist-heading">blacklist</h3>
              <div className="share-modal-search">
                <Search />{" "}
                <input
                  className="share-modal-search-input"
                  type="text"
                  placeholder="Search"
                />
              </div>
              <ul className="share-modal-follower-list">
                <li className="share-modal-follower-list-single blacklist">
                  <span>Mickey Mouse</span>{" "}
                  <button className="share-modal-follower-list-single-cross">
                    {" "}
                    <Cross />{" "}
                  </button>
                </li>
                <li className="share-modal-follower-list-single blacklist">
                  <span>Mickey Mouse</span>{" "}
                  <button className="share-modal-follower-list-single-cross">
                    {" "}
                    <Cross />{" "}
                  </button>
                </li>
              </ul>
            </div>
            <button className="btn btn-dark">Save</button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShareOptions;
