import React, { useState, useEffect, useScript } from 'react';
import './AirdropSocialPostPopup.scss';
import { useDispatch, useSelector } from 'react-redux';
import { closeSocialPopup } from '../../../store/app/appSlice';
import { CloseIcon } from '../../Icons';
import ScriptTag from 'react-script-tag';

export default function AirdropSocialPostPopup(props) {
  const { showPostPopup, switchSocialPostPopup, txt, title, link } = props;

  const showSocialPostPopup = useSelector(
    (state) => state.app.showSocialPostPopup
  );
  const dispatch = useDispatch();
  if (props.title === 'Eventbrite: Attend an Event') {
    var s = document.createElement('script');
    s.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
    s.onload = function () {
      window.EBWidgets.createWidget({
        widgetType: 'checkout',
        // eventId: '101283469584',
        eventId: props.link,
        iframeContainerId: 'eventbrit'
      });
    };
    document.body.appendChild(s);
  }

  return (
    <>
      {props.showPostPopup ? (
        <div
          className={
            props.showPostPopup ? 'mediaeye-popup active' : 'mediaeye-popup'
          }
        >
          <div
            className="mediaeye-popup-wrapper"
            onClick={() => props.switchSocialPostPopup()}
          >
            <div
              className="mediaeye-popup-content airdrop-social-post-popup"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <div className="mediaeye-popup-content-inner">
                <div
                  className="mediaeye-popup-close"
                  onClick={() => props.switchSocialPostPopup()}
                >
                  <CloseIcon />
                </div>
                <div className="airdrop-social-post-popup-main-content">
                  <h4 className="airdrop-social-post-popup-main-content-head">
                    {' '}
                    {props.title}{' '}
                  </h4>
                  <div className="airdrop-social-post-popup-main-content-widgetscript">
                    {props.title === 'Telegram Post' ? (
                      <ScriptTag
                        async
                        src="https://telegram.org/js/telegram-widget.js?19"
                        data-telegram-post={props.link}
                        data-width="100%"
                        data-dark="1"
                      />
                    ) : props.title === 'Tumblr Post Like' ? (
                      <div className="airdrop-social-post-popup-main-content-widgetscript-tumblr">
                        <div
                          className="tumblr-post"
                          data-href={props.link}
                        ></div>
                        <ScriptTag
                          async
                          src="https://assets.tumblr.com/post.js"
                        ></ScriptTag>
                      </div>
                    ) : props.title === 'Flickr Post Like' ? (
                      <div className="airdrop-social-post-popup-main-content-widgetscript-flickr">
                        <a
                          data-flickr-embed="true"
                          data-header="true"
                          data-context="true"
                          href={props.link}
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
                    ) : props.title === 'Eventbrite: Attend an Event' ? (
                      <div className="airdrop-social-post-popup-main-content-widgetscript-spotify">
                        <div id="eventbrit"></div>
                        <ScriptTag src="https://www.eventbrite.com/static/widgets/eb_widgets.js"></ScriptTag>
                      </div>
                    ) : props.title === 'Instagram Post Like' ? (
                      <div className="airdrop-social-post-popup-main-content-widgetscript-insta">
                        <blockquote
                          className="instagram-media"
                          data-instgrm-permalink={props.link}
                          data-instgrm-version="14"
                        >
                          <div className="instagram-media-main">
                            <a
                              href={props.link}
                              className="instagram-media-main-link"
                              target="_blank"
                            >
                              <div className="instagram-media-main-link-flow">
                                <div className="instagram-media-main-link-flow-bg"></div>
                                <div className="instagram-media-main-link-flow-flex">
                                  <div className="instagram-media-main-link-flow-flex-one"></div>
                                  <div className="instagram-media-main-link-flow-flex-two"></div>
                                </div>
                              </div>
                              <div className="instagram-media-main-link-padd"></div>
                              <div className="instagram-media-main-link-disblock">
                                <svg
                                  width="50px"
                                  height="50px"
                                  viewBox="0 0 60 60"
                                  version="1.1"
                                  xmlns="https://www.w3.org/2000/svg"
                                >
                                  <g
                                    stroke="none"
                                    strokeWidth="1"
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <g
                                      transform="translate(-511.000000, -20.000000)"
                                      fill="#000000"
                                    >
                                      <g>
                                        <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              <div className="instagram-media-main-link-paddeight">
                                <div className="instagram-media-main-link-paddeight-font">
                                  View this post on Instagram
                                </div>
                              </div>
                              <div className="instagram-media-main-link-paddtewelve"></div>
                              <div className="instagram-media-main-link-flexdirrow">
                                <div>
                                  <div className="instagram-media-main-link-flexdirrow-transone"></div>
                                  <div className="instagram-media-main-link-flexdirrow-transtwo"></div>
                                  <div className="instagram-media-main-link-flexdirrow-transthree"></div>
                                </div>
                                <div className="instagram-media-main-link-flexdirrow-mareight">
                                  <div className="instagram-media-main-link-flexdirrow-mareight-one"></div>
                                  <div className="instagram-media-main-link-flexdirrow-mareight-two"></div>
                                </div>
                                <div className="instagram-media-main-link-flexdirrow-marauto">
                                  <div className="instagram-media-main-link-flexdirrow-marauto-one"></div>
                                  <div className="instagram-media-main-link-flexdirrow-marauto-two"></div>
                                  <div className="instagram-media-main-link-flexdirrow-marauto-three"></div>
                                </div>
                              </div>
                              <div className="instagram-media-main-link-flexdircolumn">
                                <div className="instagram-media-main-link-flexdircolumn-bgcolorone"></div>
                                <div className="instagram-media-main-link-flexdircolumn-bgcolortwo"></div>
                              </div>
                            </a>
                            <p className="instagram-media-main-para">
                              <a
                                href={props.link}
                                className="instagram-media-main-para-link"
                                target="_blank"
                              ></a>
                            </p>
                          </div>
                        </blockquote>
                        <ScriptTag
                          async
                          src="//www.instagram.com/embed.js"
                        ></ScriptTag>
                      </div>
                    ) : null}
                  </div>
                  <button
                    className="btn btn-info"
                    onClick={() => props.switchSocialPostPopup(props.title)}
                  >
                    {' '}
                    {props.txt}{' '}
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
