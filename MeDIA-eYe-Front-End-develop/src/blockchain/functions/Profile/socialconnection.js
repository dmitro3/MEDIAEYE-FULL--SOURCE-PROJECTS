import axios from 'axios';

export const getInstagramUser = async (instaUser, instaPassword) => {
  return new Promise(async (resolve, reject) => {
    let instagramAPi = process.env.REACT_APP_PROFILE_CONNECT_INSTAGRAM;
    let data = {
      username: instaUser,
      password: instaPassword
    };

    let config = {
      method: 'post',
      url: instagramAPi,
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
          resdata.display_name = response.data.data.username;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
        if (response.data.code === 201) {
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

export const getTwitterAPiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let twiiterAPi = process.env.REACT_APP_PROFILE_CONNECT_TWITTER;
    let config = {
      method: 'get',
      url: twiiterAPi
    };
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.url = response.data.data.url;
          resdata.requestSecret = response.data.data.requestSecret;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getTwitterAuthVerify = async (
  oauth_token,
  oauth_verifier,
  requestSecret
) => {
  return new Promise(async (resolve, reject) => {
    let twiiterAPi = process.env.REACT_APP_PROFILE_CONNECT_GET_TWITTERUSER;

    let data = {
      getoauthtoken: oauth_token,
      getoauthverify: oauth_verifier,
      requestSecret: requestSecret
    };

    let config = {
      method: 'post',
      url: twiiterAPi,
      data: data
    };
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.display_name = response.data.data;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getDiscordAPiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let discordAPi = process.env.REACT_APP_PROFILE_CONNECT_DISCORD;

    let config = {
      method: 'get',
      url: discordAPi
    };

    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.url = response.data.url;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getDiscordAuthVerify = async (code) => {
  return new Promise(async (resolve, reject) => {
    let discordAPi = process.env.REACT_APP_PROFILE_CONNECT_GET_DISCORDUSER;
    let data = {
      verifycode: code
    };

    let config = {
      method: 'post',
      url: discordAPi,
      data: data
    };
    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.display_name = response.data.data;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
        if (response.data.code === 201) {
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

export const getFlickrAPiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let flickrAPi = process.env.REACT_APP_PROFILE_CONNECT_FLICKR;

    let config = {
      method: 'get',
      url: flickrAPi
    };

    let resdata = {};

    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.url = response.data.data.url;
          resdata.requestToken = response.data.data.requestToken;
          resdata.requestSecret = response.data.data.requestTokenSecret;
          resolve(resdata);
        } else {
          resolve();
        }

      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getFlickrAuthVerify = async (
  oauth_token,
  oauth_verifier,
  requestSecret
) => {
  return new Promise(async (resolve, reject) => {
    let flickrAPi = process.env.REACT_APP_PROFILE_CONNECT_FLICKRUSER;
    let data = {
      oauthToken: oauth_token,
      oauthVerifier: oauth_verifier,
      tokenSecret: requestSecret
    };

    let config = {
      method: 'post',
      url: flickrAPi,
      data: data
    };

    let resdata = {};
    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.display_name = response.data.data;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getLinkedinAPiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let linkedinAPi = process.env.REACT_APP_PROFILE_CONNECT_LINKEDIN;
    let config = {
      method: 'get',
      url: linkedinAPi
    };

    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.url = response.data.url;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getLinkedinAuthVerify = async (code) => {
  return new Promise(async (resolve, reject) => {
    let linkedinAPi = process.env.REACT_APP_PROFILE_CONNECT_LINKEDINUSER;
    let data = {
      verifycode: code
    };
    let config = {
      method: 'post',
      url: linkedinAPi,
      data: data
    };

    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.display_name = response.data;
          resolve(resdata);
        } else {
          resolve()
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getSpotifyAPiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let spotifyAPi = process.env.REACT_APP_PROFILE_CONNECT_SPOTIFY;

    let config = {
      method: 'get',
      url: spotifyAPi
    };

    let resdata = {};
    await axios(config)
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
        if (response.data.code === 201) {
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

export const getSpotifyAuthVerify = async (code) => {
  return new Promise(async (resolve, reject) => {
    let spotifyAPi = process.env.REACT_APP_PROFILE_CONNECT_GET_SPOTIFYUSER;

    let data = {
      verifycode: code
    };

    let config = {
      method: 'post',
      url: spotifyAPi,
      data: data
    };
    let resdata = {};

    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.display_name = response.data.data;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
        if (response.data.code === 201) {
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

export const getTelegramApiUrl = async (phoneNumber) => {
  return new Promise(async (resolve, reject) => {
    let telegramAPi = process.env.REACT_APP_PROFILE_CONNECT_TELEGRAM;

    let data = {
      phoneNumber: phoneNumber
    };
    let config = {
      method: 'post',
      url: telegramAPi,
      data: data
    };
    let resdata = {};

    await axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.url = response.data;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 0;
          resolve(resdata);
        }
        if (response.data.code === 201) {
          resdata.key = 1;
          resdata.url = response.data;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const getTelegramAuthVerify = async (
  phoneNumber,
  phonecode,
  phonecodehash,
  grouplink
) => {
  return new Promise(async (resolve, reject) => {
    let telegramAPi = process.env.REACT_APP_PROFILE_CONNECT_TELEGRAMUSER;

    let data = {
      phoneNumber: phoneNumber,
      phonecode: phonecode,
      phonecodehash: phonecodehash,
      grouplink: grouplink
    };

    let config = {
      method: 'post',
      url: telegramAPi,
      data: data
    };

    let resdata = {};

    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.display_name = response.data;
          resolve(resdata);
        }
        if (response.data.code === 400) {
          resdata.key = 1;
          resolve(resdata);
        }
      })
      .catch(function (error) {
        resdata.key = 0;
        resolve(resdata);
      });
  });
};

export const getTwitchAPiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let twitchAPi = process.env.REACT_APP_PROFILE_CONNECT_TWITCH;

    let config = {
      method: 'get',
      url: twitchAPi
    };
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.url = response.data.url;
          resolve(resdata);
        } else {
          resolve()
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getTwitchAuthVerify = async (code) => {
  return new Promise(async (resolve, reject) => {
    let twitchAPi = process.env.REACT_APP_PROFILE_CONNECT_TWITCHUSER;

    let data = {
      verifycode: code
    };

    let config = {
      method: 'post',
      url: twitchAPi,
      data: data
    };


    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.display_name = response.data;
          resolve(resdata);
        } else {
          resolve()
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getTumblerAPiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let tumblerAPi = process.env.REACT_APP_PROFILE_CONNECT_TUMBLER;
    let config = {
      method: 'get',
      url: tumblerAPi
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.key = 1;
          resdata.oauthToken = response.data.data.oauthToken;
          resdata.oauthTokenSecret = response.data.data.oauthTokenSecret;
          resdata.url = response.data.data.url;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const gettumblerauthverify = async (
  oauth_token,
  oauth_verifier,
  tumbleroauthTokenSecret
) => {
  return new Promise(async (resolve, reject) => {
    let tumblerAPi = process.env.REACT_APP_PROFILE_CONNECT_TUMBLERUSER;

    let data = {
      oauth_verifier: oauth_verifier,
      oauthTokenSecret: tumbleroauthTokenSecret,
      oauthToken: oauth_token
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
          resdata._oauthAccessToken = response.data.data._oauthAccessToken;
          resdata._oauthAccessTokenSecret =
            response.data.data._oauthAccessTokenSecret;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getEventbriteApiUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let eventbriteAPi = process.env.REACT_APP_PROFILE_CONNECT_EVENTBRITE;
    let config = {
      method: 'get',
      url: eventbriteAPi
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

export const geteventbriteauthverify = async (code) => {
  return new Promise(async (resolve, reject) => {
    let eventbriteAPi = process.env.REACT_APP_PROFILE_CONNECT_EVENTBRITEUSER;

    let data = {
      code: code
    };

    let config = {
      method: 'post',
      url: eventbriteAPi,
      data: data
    };

    let resdata = {};
    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          resdata.name = response.data.data.name
          resdata.key = 1;
          resolve(resdata);
        }

        if (response.data.code === 201) {
          resdata.key = 0;
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

export const getVimeoAccessToken = async () => {
  return new Promise(async (resolve, reject) => {
    let vimeoAPi = process.env.REACT_APP_VIMEO_CONNECT_USER;

    let config = {
      method: 'get',
      url: vimeoAPi
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

export const getRedditUrl = async () => {
  return new Promise(async (resolve, reject) => {
    let redditApi = process.env.REACT_APP_REDDIT_CONNECT_USER;

    let config = {
      method: 'get',
      url: redditApi
    };

    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.url = response.data.url;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};

export const getredditauthverify = async (verify) => {
  return new Promise(async (resolve, reject) => {
    let redditApi = process.env.REACT_APP_REDDIT_AUTH_USER;
    let data = {
      code: verify,
      state: 'yolo'
    };

    let config = {
      method: 'post',
      url: redditApi,
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data.code === 200) {
          let resdata = {};
          resdata.key = 1;
          resdata.url = response.data.message;
          resolve(resdata);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};
