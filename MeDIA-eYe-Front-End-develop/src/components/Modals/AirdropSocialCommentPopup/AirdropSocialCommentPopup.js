import React, { useState, useEffect, useScript } from 'react';
import './AirdropSocialCommentPopup.scss';
import { CloseIcon } from '../../Icons';
import ScriptTag from 'react-script-tag';
import TASKS from '../../Airdrop/AirdropTasks/Tasks';
import { submitTask, TaskAction } from '../../../blockchain/functions/Airdrops';

export default function AirdropSocialCommentPopup(props) {
  const {
    airdrop,
    showCommentPopup,
    switchCommentPopup,
    media,
    task,
    link,
    Moralis,
    refreshTasks
  } = props;
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [redditUrl, setRedditUrl] = useState(null);

  const submitPressed = async () => {
    setLoading(true);
    TaskAction({
      task: task,
      params: airdrop?.attributes?.tasks[media][task],
      inputs: { comment: msg }
    });
    const currUser = Moralis.User.current();
    await submitTask(Moralis, {
      airdrop: airdrop,
      task: task,
      media: media,
      user: currUser?.attributes?.ethAddress
    });
    // check completed tasks
    refreshTasks();
    setLoading(false);
    switchCommentPopup();
  };

  useEffect(() => {
    if (task === 'REDDIT_COMMENT' || task === 'REDDIT_SAVE') {
      fetchRedditUrl();
    }
  }, [task]);

  const fetchRedditUrl = async () => {
    const res = await (
      await fetch(
        `https://www.reddit.com/comments/${airdrop?.attributes?.tasks[media][task]['postId']}/.json`
      )
    ).json();
    setRedditUrl(res[0]?.data?.children[0]?.data?.url);
  };
  return (
    <>
      {showCommentPopup ? (
        <div
          className={
            showCommentPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => switchCommentPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-social-comment-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => switchCommentPopup()}
                >
                  <CloseIcon />
                </div>
                <form
                  className="airdrop-social-comment-popup-main-content"
                  onSubmit={(e) => {
                    e.preventDefault();
                    //  props.switchSocialCommentPopup(props.txt, retweethashtag);
                  }}
                >
                  <h4 className="airdrop-social-comment-popup-main-content-head">
                    {media && task ? TASKS[media][task]?.title : null}
                  </h4>
                  <div className="airdrop-social-comment-popup-main-content-comment">
                    {props.title === 'Comment on Youtube Video' ? (
                      <div className="airdrop-social-comment-popup-main-content-comment-box">
                        <iframe
                          className="airdrop-social-comment-popup-main-content-comment-box-iframe"
                          src="https://www.youtube.com/embed/YrHCD7nx29o?controls=0"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                        <textarea
                          onChange={(e) => setMsg(e.target.value)}
                          className="airdrop-social-comment-popup-main-content-comment-box-textarea"
                          placeholder="Comment here..."
                          rows={5}
                          required
                        ></textarea>
                      </div>
                    ) : props.title === 'Retweet Twitter Post' ? (
                      <div className="airdrop-social-comment-popup-main-content-comment-box">
                        <div className="airdrop-social-comment-popup-main-content-comment-box-twitter">

                          <blockquote
                            className="twitter-tweet"
                            data-dnt="true"
                            data-theme="dark"
                          >
                            <a href={props.link}></a>
                          </blockquote>
                          <ScriptTag
                            async
                            src="https://platform.twitter.com/widgets.js"
                            charset="utf-8"
                          ></ScriptTag>
                        </div>
                      </div>
                    ) : props.title === 'Retweet Post with Hashtag' ? (
                      <div className="airdrop-social-comment-popup-main-content-comment-box">
                        <div className="airdrop-social-comment-popup-main-content-comment-box-twitter">
                          <blockquote
                            class="twitter-tweet"
                            data-dnt="true"
                            data-theme="dark"
                          >
                            <a href={props.link}></a>
                          </blockquote>
                          <ScriptTag
                            async
                            src="https://platform.twitter.com/widgets.js"
                            charset="utf-8"
                          ></ScriptTag>
                        </div>
                      </div>
                    ) : props.title === 'Tumblr Post Comment' ? (
                      <div className="airdrop-social-comment-popup-main-content-comment-box">
                        <div className="airdrop-social-comment-popup-main-content-comment-box-twitter">
                          <div
                            className="tumblr-post"
                            data-href={props.link}
                          ></div>
                          <ScriptTag
                            async
                            src="https://assets.tumblr.com/post.js"
                          ></ScriptTag>
                        </div>
                        <textarea
                          onChange={(e) => setMsg(e.target.value)}
                          className="airdrop-social-comment-popup-main-content-comment-box-textarea"
                          placeholder="Comment here..."
                          rows={5}
                          required
                        ></textarea>
                      </div>
                    ) : props.title === 'Flickr Post Comment' ? (
                      <div className="airdrop-social-comment-popup-main-content-comment-box">
                        <div className="airdrop-social-comment-popup-main-content-comment-box-twitter">
                          <a
                            data-flickr-embed="true"
                            data-header="true"
                            data-context="true"
                            href="https://www.flickr.com/photos/155052579@N02/50398977807/"
                          >
                            <img
                              src="https://live.staticflickr.com/65535/50398977807_8237e2f5c1_k.jpg"
                              alt="staticFlickr"
                            />
                          </a>
                          <ScriptTag
                            async
                            src="//embedr.flickr.com/assets/client-code.js"
                            charset="utf-8"
                          ></ScriptTag>
                        </div>
                        <textarea
                          onChange={(e) => setMsg(e.target.value)}
                          className="airdrop-social-comment-popup-main-content-comment-box-textarea"
                          placeholder="Comment here..."
                          rows={5}
                          required
                        ></textarea>
                      </div>
                    ) : props.title === 'Reddit Save Post' ? (
                      <div className="airdrop-social-comment-popup-main-content-comment-box">
                        <a
                          className="airdrop-social-comment-popup-main-content-comment-box-link"
                          href={redditUrl}
                        >
                          {redditUrl}
                        </a>
                      </div>
                    ) : props.title === 'Reddit Post Comment' ? (
                      <div className="airdrop-social-comment-popup-main-content-comment-box">
                        <a
                          className="airdrop-social-comment-popup-main-content-comment-box-link"
                          href={redditUrl}
                        >
                          {redditUrl}
                        </a>
                        <textarea
                          onChange={(e) => setMsg(e.target.value)}
                          className="airdrop-social-comment-popup-main-content-comment-box-textarea"
                          placeholder="Comment here..."
                          rows={5}
                          required
                        ></textarea>
                      </div>
                    ) : null}
                  </div>
                  <button
                    className="btn btn-info"
                    type="submit"
                    onClick={() => submitPressed()}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
