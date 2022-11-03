import React, { Component } from 'react';
import axios from 'axios';
import {
  getRedditUrl,
  getSpotifyAPiUrl,
  getFlickrAPiUrl
} from '../Profile/socialconnection';
import TASKS from '../../../components/Airdrop/AirdropTasks/Tasks';

export const TaskAction = async (req) => {
  try {
    if (req.task === 'FLICKR_FOLLOW') {
      followFlickr(req.params['userId']);
    }
    if (req.task === 'FLICKR_COMMENT') {
      commentFlickr(req.params['photoId'], req.inputs['comment']);
    }
    if (req.task === 'MEDIUM_FOLLOW') {
      followMedium(req.params['username']);
    }
    if (req.task === 'MEDIUM_LIKE') {
      likeMedium(req.params['postLink']);
    }
    if (req.task === 'MEDIUM_COMMENT') {
      commentMedium(req.params['postLink']);
    }
    if (req.task === 'REDDIT_JOIN') {
      joinReddit(req.params['userId']);
    }
    if (req.task === 'REDDIT_SAVE') {
      saveReddit(req.params['postId']);
    }
    if (req.task === 'REDDIT_COMMENT') {
      commentReddit(req.params['postId'], req.inputs['comment']);
    }
    if (req.task === 'SOUNDCLOUD_FOLLOW') {
    }
    if (req.task === 'SPOTIFY_FOLLOW') {
      followSpotify();
    }
    if (req.task === 'TIKTOK_FOLLOW') {
      followTiktok();
    }
    // TODO: return success/fail response value depending on api call result
    return true;
  } catch (e) {
  }
};

const followFlickr = async (username) => {
  let apidata = await getFlickrAPiUrl();
  if (apidata.key === 1) {
    localStorage.setItem('flickrsecretkey', apidata.requestSecret);
    localStorage.setItem('joinflickr', 'true');
    localStorage.setItem('flickrgroupname', username);
    window.open(apidata.url);
  }
};
const commentFlickr = async (photoId, comment) => {
  let apidata = await getFlickrAPiUrl();
  if (apidata.key === 1) {
    localStorage.setItem('flickrsecretkey', apidata.requestSecret);
    localStorage.setItem('commentflickrimage', 'true');
    localStorage.setItem('flickr_commentimage', photoId);
    localStorage.setItem('flickr_commenttxt', comment);
    window.open(apidata.url);
  }
};

const followMedium = async (username) => {
  let url = `https://medium.com/@${username}`;
  window.open(url);
};

const likeMedium = async (postLink) => {
  let url = postLink;
  window.open(url);
};

const commentMedium = async (postLink) => {
  let url = postLink;
  window.open(url);
};

const joinReddit = async (username) => {
  let apidata = await getRedditUrl();
  if (apidata.key === 1) {
    localStorage.setItem('joinreddit', 'true');
    localStorage.setItem('joinredditusername', username);
    window.open(apidata.url);
  }
};

const saveReddit = async (postId) => {
  let apidata = await getRedditUrl();
  if (apidata.key === 1) {
    localStorage.setItem('savereddit', 'true');
    localStorage.setItem('saveredditpostid', `t3_${postId}`);
    window.open(apidata.url);
  }
};

const commentReddit = async (postId, comment) => {
  let apidata = await getRedditUrl();
  if (apidata.key === 1) {
    localStorage.setItem('commentreddit', 'true');
    localStorage.setItem('saveredditpostid', `t3_${postId}`);
    localStorage.setItem('commentText', comment);
    window.open(apidata.url);
  }
};

const followSpotify = async (username) => {
  let apidata = await getSpotifyAPiUrl();
  if (apidata.key === 1) {
    localStorage.setItem('followspotify', 'true');
    localStorage.setItem('spotify_artistName', username);
    window.open(apidata.url);
  }
};

const likeSpotify = async (songId) => {
  let apidata = await getSpotifyAPiUrl();
  if (apidata.key === 1) {
    localStorage.setItem('likespotifysong', 'true');
    localStorage.setItem('liksepotifysongId', songId);
    window.open(apidata.url);
  }
};
const followSoundcloud = async () => {
  let url = `https://soundcloud.com/`;
  window.open(url);
};
const followTiktok = async () => {
  let apidata = await tiktokAuth();
  if (apidata.key === 1) {
    window.open(apidata.url);
  }
};
export const follow_twitter_user = async (
  follow_twitter_username,
  accessToken,
  accessSecret,
  id
) => {
  return new Promise(async (_resolve, _reject) => {
    let twitterApi = process.env.REACT_APP_FOLLOW_TWITTER_USER;
    let data = {
      follow_user: follow_twitter_username,
      accessToken: accessToken,
      accessSecret: accessSecret,
      id: id
    };

    let config = {
      method: 'post',
      url: twitterApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 400) {
          resdata.key = 0;
          _resolve(resdata);
        }
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 202) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 203) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        _resolve(resdata);
      });
  });
};

export const retweet_post = async (accessToken, accessSecret, postlink) => {
  return new Promise(async (_resolve, _reject) => {
    let twitterApi = process.env.REACT_APP_RETWEET_POST;
    let data = {
      accessToken: accessToken,
      accessSecret: accessSecret,
      postlink: postlink
    };

    let config = {
      method: 'post',
      url: twitterApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          _resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          _resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        _resolve(resdata);
      });
  });
};

export const retweetwithhashtag_post = async (
  accessToken,
  accessSecret,
  postlink,
  retweetpostlinktag
) => {
  return new Promise(async (_resolve, _reject) => {
    let twitterApi = process.env.REACT_APP_RETWEETWITHHASHTAG_POST;
    let data = {
      accessToken: accessToken,
      accessSecret: accessSecret,
      postlink: postlink,
      tweet_msg: retweetpostlinktag
    };

    let config = {
      method: 'post',
      url: twitterApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 202) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          _resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        _resolve(resdata);
      });
  });
};

export const followspotify = async (accessToken, artistId) => {
  return new Promise(async (_resolve, _reject) => {
    let spotifyApi = process.env.REACT_APP_SPOTIFY_FOLLOW;
    let data = {
      accessToken: accessToken,
      artistId: artistId
    };

    let config = {
      method: 'post',
      url: spotifyApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          _resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        _resolve(resdata);
      });
  });
};

export const likespotifysong = async (accessToken, songId) => {
  return new Promise(async (resolve, reject) => {
    let spotifyApi = process.env.REACT_APP_SPOTIFY_LIKE_SONG;
    let data = {
      accessToken: accessToken,
      songId: songId
    };

    let config = {
      method: 'post',
      url: spotifyApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const hubSpotEmail = async (hubspot_key, email) => {
  return new Promise(async (resolve, reject) => {
    let hubspotApi = process.env.REACT_APP_HUBSPOT_ADD_EMAIL;
    let data = {
      key: hubspot_key,
      email: email
    };
    let config = {
      method: 'post',
      url: hubspotApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 202) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const getSendGridList = async (key) => {
  return new Promise(async (resolve, reject) => {
    let sendgridApi = process.env.REACT_APP_SENDGRID_KEY;
    let data = {
      key: key.sendgrid_key
    };
    let config = {
      method: 'post',
      url: sendgridApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resdata.list = response.data.resdataarr;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const addSendGridEmail = async (sendgrid_key, sendgridlistid, email) => {
  return new Promise(async (resolve, reject) => {
    let sendgridApi = process.env.REACT_APP_SENDGRID_ADDEMAIL;
    let data = {
      key: sendgrid_key,
      listid: sendgridlistid,
      email: email
    };
    let config = {
      method: 'post',
      url: sendgridApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const getmailchimplist = async (key) => {
  return new Promise(async (resolve, reject) => {
    let mailchimpApi = process.env.REACT_APP_MAILCHIMP_KEY;
    let data = {
      key: key.mailchimp_key
    };
    let config = {
      method: 'post',
      url: mailchimpApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resdata.list = response.data.resdataarr;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const addEmailMailChimp = async (
  email,
  mailchimplistname,
  mailchimp_key
) => {
  return new Promise(async (resolve, reject) => {
    let mailchimpApi = process.env.REACT_APP_MAILCHIMP_ADDEMAIL;
    let data = {
      key: mailchimp_key,
      listname: mailchimplistname,
      email: email
    };
    let config = {
      method: 'post',
      url: mailchimpApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const joinflickrgroup = async (
  accessToken,
  accessSecret,
  flickrgroupName
) => {
  return new Promise(async (resolve, reject) => {
    let flickrApi = process.env.REACT_APP_FLICKR_JOIN_GROUP;
    let data = {
      token: accessToken,
      secret: accessSecret,
      group_id: flickrgroupName
    };
    let config = {
      method: 'post',
      url: flickrApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        console.log(response, 'join flickr ');
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const commentflickrimage = async (
  accessToken,
  accessSecret,
  flickr_commentimage,
  flickr_commenttxt
) => {
  return new Promise(async (resolve, reject) => {
    let flickrApi = process.env.REACT_APP_FLICKR_COMMENT_IMAGE;
    let data = {
      token: accessToken,
      secret: accessSecret,
      imageid: flickr_commentimage,
      comment_text: flickr_commenttxt
    };
    let config = {
      method: 'post',
      url: flickrApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        console.log(response, 'comment flickr image');
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const likeflickrimage = async (
  accessToken,
  accessSecret,
  flickrimage
) => {
  return new Promise(async (resolve, reject) => {
    let flickrApi = process.env.REACT_APP_FLICKR_LIKE_IMAGE;
    let data = {
      token: accessToken,
      secret: accessSecret,
      imageid: flickrimage
    };
    let config = {
      method: 'post',
      url: flickrApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        console.log(response, 'like flickr image');
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const followInstagram = async (username, password, userId) => {
  return new Promise(async (resolve, reject) => {
    let instagramApi = process.env.REACT_APP_INSTAGRAM_FOLLOW;
    let data = {
      username: username,
      password: password,
      userid: userId
    };
    let config = {
      method: 'post',
      url: instagramApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const likeInstagram = async (
  instaUser,
  instaPassword,
  like_instapost
) => {
  return new Promise(async (resolve, reject) => {
    let instagramApi = process.env.REACT_APP_INSTAGRAM_LIKE;
    let data = {
      username: instaUser,
      password: instaPassword,
      mediaId: like_instapost
    };
    let config = {
      method: 'post',
      url: instagramApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const followtwitch = async (verify, twitchchannelId) => {
  return new Promise(async (resolve, reject) => {
    let twitchApi = process.env.REACT_APP_TWITCH_FOLLOW;
    let data = {
      accessToken: verify,
      channelId: twitchchannelId
    };
    let config = {
      method: 'post',
      url: twitchApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const joindiscordpage = async (accesskey, discordpagename) => {
  return new Promise(async (resolve, reject) => {
    const discordAPi = process.env.REACT_APP_DISCORD_JOINPAGE;
    let data = {
      accesskey: accesskey,
      guildId: discordpagename
    };
    let config = {
      method: 'post',
      url: discordAPi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const tumblerfollow = async (
  _oauthAccessToken,
  _oauthAccessTokenSecret,
  followtumblername
) => {
  return new Promise(async (resolve, reject) => {
    let tumblerAPi = process.env.REACT_APP_TUMBLER_FOLLOW;
    let data = {
      _oauthAccessToken: _oauthAccessToken,
      _oauthAccessTokenSecret: _oauthAccessTokenSecret,
      followuser: followtumblername
    };
    let config = {
      method: 'post',
      url: tumblerAPi,
      data: data
    };

    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const tumblerlike = async (
  _oauthAccessToken,
  _oauthAccessTokenSecret,
  tumblerlikeimageId,
  reblog_key
) => {
  return new Promise(async (resolve, reject) => {
    let tumblerAPi = process.env.REACT_APP_TUMBLER_LIKE;
    let data = {
      _oauthAccessToken: _oauthAccessToken,
      _oauthAccessTokenSecret: _oauthAccessTokenSecret,
      postId: tumblerlikeimageId,
      reblog_key: reblog_key
    };
    let config = {
      method: 'post',
      url: tumblerAPi,
      data: data
    };

    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const tumblercomment = async (
  _oauthAccessToken,
  _oauthAccessTokenSecret,
  tumblerlikeimageId,
  reblog_key,
  tumblerlog,
  commenttxt
) => {
  return new Promise(async (resolve, reject) => {
    let tumblerAPi = process.env.REACT_APP_TUMBLER_COMMENT;
    let data = {
      _oauthAccessToken: _oauthAccessToken,
      _oauthAccessTokenSecret: _oauthAccessTokenSecret,
      postId: tumblerlikeimageId,
      commentText: commenttxt,
      reblog_key: reblog_key,
      tumblelog: tumblerlog
    };

    let config = {
      method: 'post',
      url: tumblerAPi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resdata.message = response.data.message;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const getfollowvimeo = async (verify, followvimeouser) => {
  return new Promise(async (resolve, reject) => {
    let vimeoAPi = process.env.REACT_APP_VIMEO_FOLLOW_USER;
    let data = {
      AccessToken: verify,
      userId: followvimeouser
    };
    let config = {
      method: 'post',
      url: vimeoAPi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const getvimeovideolike = async (verify, likevimeovideoId) => {
  return new Promise(async (resolve, reject) => {
    let vimeoAPi = process.env.REACT_APP_VIMEO_LIKE_VIDEO;
    let data = {
      AccessToken: verify,
      videoId: likevimeovideoId
    };
    let config = {
      method: 'post',
      url: vimeoAPi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const joinreddituser = async (joinredditusername) => {
  return new Promise(async (resolve, reject) => {
    let redditApi = process.env.REACT_APP_REDDIT_JOIN_USER;
    let data = {
      username: joinredditusername
    };

    let config = {
      method: 'post',
      url: redditApi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const saveredditpost = async (redditpostid) => {
  return new Promise(async (resolve, reject) => {
    let redditApi = process.env.REACT_APP_DISCORD_SAVE_POST;
    let data = {
      redditpostid: redditpostid
    };

    let config = {
      method: 'post',
      url: redditApi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const commentredditpost = async (redditpostid, commentText) => {
  return new Promise(async (resolve, reject) => {
    let redditApi = process.env.REACT_APP_REDDIT_COMMENT_ON_POST;
    let data = {
      redditpostid: redditpostid,
      commentText: commentText
    };

    let config = {
      method: 'post',
      url: redditApi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const youtubAuth = async () => {
  return new Promise(async (resolve, reject) => {
    let youtubeApi = process.env.REACT_APP_YOUTUBE_AUTH;
    let config = {
      method: 'get',
      url: youtubeApi
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.url = response.data.ytUrl;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const youtubauthverify = async (verify) => {
  return new Promise(async (resolve, reject) => {
    let youtubeApi = process.env.REACT_APP_YOUTUBE_AUTH_VERIFY;
    let data = {
      code: verify
    };
    let config = {
      method: 'post',
      url: youtubeApi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.accessToken = response.data.tokens.access_token;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const youtubechannelsubscribe = async (subscribeyoutubechannelId) => {
  return new Promise(async (resolve, reject) => {
    let youtubeApi = process.env.REACT_APP_YOUTUBE_SUBSCRIBE;

    let data = {
      channelId: subscribeyoutubechannelId
    };
    let config = {
      method: 'post',
      url: youtubeApi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const youtubevideolike = async (videoid) => {
  return new Promise(async (resolve, reject) => {
    let youtubeApi = process.env.REACT_APP_YOUTUBE_LIKE;
    let data = {
      videoid: videoid
    };
    let config = {
      method: 'post',
      url: youtubeApi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.message = response.data.message;
          resolve(resdata);
        }

        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const youtubevideocomment = async (
  videoId,
  channelId,
  commenttxt,
  AccessToken
) => {
  return new Promise(async (resolve, reject) => {
    let youtubeApi = process.env.REACT_APP_YOUTUBE_COMMENT;
    let data = {
      commentText: commenttxt,
      channelId: channelId,
      videoid: videoId,
      AccessToken: AccessToken
    };
    let config = {
      method: 'post',
      url: youtubeApi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        console.log(response, 'responseresponse');
        // if (response.data.code === 200) {
        //   resdata.key = 1;
        //   resdata.message = response.data.message
        //   resolve(resdata);
        // }

        // if (response.data.code === 400) {
        //   resdata.key = 0;
        //   resolve(resdata);
        // }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const tiktokAuth = async () => {
  return new Promise(async (resolve, reject) => {
    let tiktokapi = process.env.REACT_APP_TIKTOK_AUTH;
    let config = {
      method: 'get',
      url: tiktokapi
    };
    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.url = response.data.url;
          resolve(resdata);
        }

        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const tiktokauthverify = async (code) => {
  return new Promise(async (resolve, reject) => {
    let tiktokapi = process.env.REACT_APP_TIKTOK_AUTHVERIFY;
    let data = {
      code: code
    };

    let config = {
      method: 'post',
      url: tiktokapi,
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

export const snapChatAuth = async () => {
  return new Promise(async (resolve, reject) => {
    let snapchatapi = process.env.REACT_APP_SNAPCHAT_AUTH;
    let config = {
      method: 'get',
      url: snapchatapi
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.url = response.data.url;
          resolve(resdata);
        }

        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const snapchatauthverify = async (snapcode) => {
  return new Promise(async (resolve, reject) => {
    let snapchatapi = process.env.REACT_APP_SNAPCHAT_AUTHVERIFY;
    let data = {
      code: snapcode
    };

    let config = {
      method: 'post',
      url: snapchatapi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};
