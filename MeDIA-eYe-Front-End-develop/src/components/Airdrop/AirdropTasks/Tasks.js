const TASKS = {
  DISCORD: {
    SHORTNAME: 'discord',
    JOIN_CHANNEL: {
      id: 'JOIN_CHANNEL',
      params: [{ id: 'postId', name: 'Post ID' }]
    }
  },
  COINMARKETCAP: {
    SHORTNAME: 'coinmarketcap',
    COINMARKETCAP_WATCHLIST: {
      id: 'COINMARKETCAP_WATCHLIST',
      params: [{ id: 'watchlist', name: 'Add to Watchlist' }]
    }
  },
  COINGECKO: {
    SHORTNAME: 'coingecko',
    COINGECKO_WATCHLIST: {
      id: 'COINGECKO_WATCHLIST',
      params: [{ id: 'watchlist', name: 'Add to Watchlist' }]
    }
  },
  EVENTBRITE: {
    SHORTNAME: 'eventbrite',
    EVENTBRITE_ATTEND: {
      id: 'EVENTBRITE_ATTEND',
      params: [{ id: 'eventId', name: 'Event ID' }]
    }
  },
  FLICKR: {
    SHORTNAME: 'flicker',
    FLICKR_FOLLOW: {
      id: 'FLICKR_FOLLOW',
      msg: 'Follow @ on Flickr',
      params: [{ id: 'userId', name: 'User ID' }]
    },
    FLICKR_LIKE: {
      id: 'FLICKR_LIKE',
      msg: 'Like a photo on Flickr',
      params: [{ id: 'photoId', name: 'Photo ID' }]
    },
    FLICKR_COMMENT: {
      id: 'FLICKR_COMMENT',
      msg: 'Comment on a photo on Flickr',
      params: [{ id: 'photoId', name: 'Photo ID' }],
      inputRequired: true
    }
  },
  HUBSPOT: {
    SHORTNAME: 'hubspot',
    HUBSPOT_SUB: {
      id: 'HUBSPOT_SUB',
      params: [{ id: 'apiKey', name: 'API Key' }]
    }
  },
  MAILCHIMP: {
    SHORTNAME: 'mailchimp',
    MAILCHIMP_SUB: {
      id: 'MAILCHIMP_SUB',
      params: [{ id: 'apiKey', name: 'API Key' }]
    }
  },
  SENDGRID: {
    SHORTNAME: 'sendgrid',
    SENDGRID_SUB: {
      id: 'SENDGRID_SUB',
      params: [{ id: 'apiKey', name: 'API Key' }]
    }
  },
  INSTAGRAM: {
    SHORTNAME: 'insta',
    INSTA_FOLLOW: {
      id: 'INSTA_FOLLOW',
      params: [{ id: 'userId', name: 'User ID' }]
    },
    INSTA_LIKE: {
      id: 'INSTA_LIKE',
      params: [{ id: 'postLink', name: 'Post Link' }]
    }
  },
  LINKEDIN: {
    SHORTNAME: 'linkedin',
    LINKEDIN_FOLLOW: {
      id: 'LINKEDIN_FOLLOW',
      params: [{ id: 'pageId', name: 'Company Page ID' }]
    }
  },
  MEDIUM: {
    SHORTNAME: 'medium',
    MEDIUM_FOLLOW: {
      id: 'MEDIUM_FOLLOW',
      msg: 'Follow @ on Medium',
      params: [{ id: 'username', name: 'Username' }],
      proofRequired: true,
      title: 'Follow Medium'
    },
    MEDIUM_LIKE: {
      id: 'MEDIUM_LIKE',
      msg: 'Like a Post on Medium',
      params: [{ id: 'postLink', name: 'Post Link' }],
      proofRequired: true,
      title: 'Like Medium'
    },
    MEDIUM_COMMENT: {
      id: 'MEDIUM_COMMENT',
      msg: 'Comment on Medium',
      params: [{ id: 'postLink', name: 'Post Link' }],
      proofRequired: true,
      title: 'Comment Medium'
    }
  },
  REDDIT: {
    SHORTNAME: 'reddit',
    REDDIT_JOIN: {
      id: 'REDDIT_JOIN',
      msg: 'Join @ Community on Reddit',
      params: [{ id: 'userId', name: 'Community Username' }],
      proofRequired: false,
      title: 'Join Community'
    },
    REDDIT_SAVE: {
      id: 'REDDIT_SAVE',
      title: 'Save Post',
      msg: 'Save a Reddit Post',
      params: [{ id: 'postId', name: 'Post ID' }],
      proofRequired: false,
      inputRequired: true
    },
    REDDIT_COMMENT: {
      id: 'REDDIT_COMMENT',
      title: 'Comment Post',
      msg: 'Comment on a Reddit Post',
      params: [{ id: 'postId', name: 'Post ID' }],
      proofRequired: false,
      inputRequired: true
    }
  },
  SOUNDCLOUD: {
    SHORTNAME: 'soundcloud',
    SOUNDCLOUD_FOLLOW: {
      id: 'SOUNDCLOUD_FOLLOW',
      msg: 'Follow @ on Soundcloud',
      params: [{ id: 'username', name: 'Username' }],
      proofRequired: true,
      title: 'Follow Soundcloud'
    },
    SOUNDCLOUD_LIKE: {
      id: 'SOUNDCLOUD_LIKE',
      msg: 'Like Track or Playlist @ on Soundcloud',
      params: [{ id: 'like', name: 'Like Track or Playlist' }],
      proofRequired: true,
      title: 'Like Track or Playlist'
    }
  },
  CLUBHOUSE: {
    SHORTNAME: 'clubhouse',
    CLUBHOUSE_FOLLOW: {
      id: 'CLUBHOUSE_FOLLOW',
      msg: 'Follow @ on CLUBHOUSE',
      params: [{ id: 'username', name: 'Username' }],
      proofRequired: true,
      title: 'Follow CLUBHOUSE'
    },
    CLUBHOUSE_CHANNEL: {
      id: 'CLUBHOUSE_CHANNEL',
      msg: 'Join Channel @ on CLUBHOUSE',
      params: [{ id: 'channelurl', name: 'Channel URL' }],
      proofRequired: true,
      title: 'Channel URL'
    },
    CLUBHOUSE_CLUB: {
      id: 'CLUBHOUSE_CLUB',
      msg: 'Join Club @ on CLUBHOUSE',
      params: [{ id: 'channelurl', name: 'Channel URL' }],
      proofRequired: true,
      title: 'Channel URL'
    }
  },
  SNAPCHAT: {
    SHORTNAME: 'snapchat',
    SNAPCHAT_FOLLOW: {
      id: 'SNAPCHAT_FOLLOW',
      params: [{ id: 'username', name: 'Username' }]
    }
  },
  SPOTIFY: {
    SHORTNAME: 'spotify',
    SPOTIFY_FOLLOW: {
      id: 'SPOTIFY_FOLLOW',
      msg: 'Follow @ on Spotify',
      params: [{ id: 'username', name: 'Username' }]
    },
    SPOTIFY_LIKE: {
      id: 'SPOTIFY_LIKE',
      msg: 'Like Track',
      params: [{ id: 'podcastId', name: 'Podcast ID' }],
      proofRequired: true,
      title: 'Like Track on Spotify'
    }
  },
  TELEGRAM: {
    SHORTNAME: 'telegram',
    JOIN_TEL: {
      id: 'JOIN_TEL',
      params: [{ id: 'channelUrl', name: 'Channel URL' }]
    },
    POST_TEL: {
      id: 'POST_TEL',
      params: [{ id: 'postLine', name: 'Post Line' }]
    }
  },
  TIKTOK: {
    SHORTNAME: 'tiktok',
    TIKTOK_FOLLOW: {
      id: 'TIKTOK_FOLLOW',
      msg: 'Follow @ on Tiktok',
      params: [{ id: 'username', name: 'Username' }],
      proofRequired: true,
      title: 'Follow Tiktok'
    }
  },
  TUMBLR: {
    SHORTNAME: 'tumbler',
    TUMBLR_FOLLOW: {
      id: 'TUMBLR_FOLLOW',
      params: [{ id: 'username', name: 'Page Username' }]
    },
    TUMBLR_LIKE: {
      id: 'TUMBLR_LIKE',
      params: [
        { id: 'postId', name: 'Post ID' },
        { id: 'reblogKey', name: 'Reblog Key' }
      ]
    },
    TUMBLR_COMMENT: {
      id: 'TUMBLR_COMMENT',
      params: [
        { id: 'postId', name: 'Post ID' },
        { id: 'username', name: 'Username' }
      ]
    }
  },
  TWITCH: {
    SHORTNAME: 'twitch',
    TWITCH_FOLLOW: {
      id: 'TWITCH_FOLLOW',
      params: [{ id: 'pageUrl', name: 'Page URL' }]
    }
  },
  TWITTER: {
    SHORTNAME: 'twitter',
    TWITTER_FOLLOW: {
      id: 'TWITTER_FOLLOW',
      params: [{ id: 'username', name: 'Username' }],
      msg: 'Follow @ on Twitter'
    },
    RETWEET: { id: 'RETWEET', params: [{ id: 'postUrl', name: 'Post URL' }] },
    RETWEET_HASHTAG: {
      id: 'RETWEET_HASHTAG',
      params: [
        { id: 'postUrl', name: 'Post URL' },
        { id: 'hashtagUrl', name: 'Hashtag URL' }
      ]
    }
  },
  VIMEO: {
    SHORTNAME: 'vimeo',
    VIMEO_FOLLOW: {
      id: 'VIMEO_FOLLOW',
      params: [{ id: 'userId', name: 'User ID' }]
    },
    VIMEO_LIKE: {
      id: 'VIMEO_LIKE',
      params: [{ id: 'videoId', name: 'Video ID' }]
    }
  },
  YOUTUBE: {
    SHORTNAME: 'youtube',
    YOUTUBE_SUB: {
      id: 'YOUTUBE_SUB',
      params: [{ id: 'channelId', name: 'Channel ID' }]
    },
    YOUTUBE_LIKE: {
      id: 'YOUTUBE_LIKE',
      params: [{ id: 'videoId', name: 'Video ID' }]
    },
    YOUTUBE_COMMENT: {
      id: 'YOUTUBE_COMMENT',
      params: [{ id: 'videoId', name: 'Video ID' }]
    }
  }
};

export default TASKS;
