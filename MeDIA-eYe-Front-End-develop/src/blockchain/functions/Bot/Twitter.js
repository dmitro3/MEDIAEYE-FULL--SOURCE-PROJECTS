import axios from 'axios';

export const twitterPostAuto = function (msg = "", mediaLink = "") {
    return new Promise(async (resolve, reject) => {
        let data = {
            tweet_msg: msg,
            media: mediaLink,
        };
        let config = {
            method: 'POST',
            url: process.env.REACT_APP_TWITTER_AUTO_POST_API,
            data: data
        };

        await axios(config)
            .then(function (response) {
                if (response?.data?.code === 200) {
                    resolve(response?.data);
                } else {
                    resolve();
                }
            })
            .catch(function (error) {
                reject(error);
            });
    });
};
