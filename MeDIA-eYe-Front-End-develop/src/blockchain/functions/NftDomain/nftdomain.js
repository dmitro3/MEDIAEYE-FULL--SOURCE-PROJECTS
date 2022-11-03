import axios from 'axios';

export const getDomainAvailability = function (domainname, exten) {
          return new Promise(async (resolve, reject) => {
                    let udApi = process.env.REACT_APP_DOMAIN_NAME;
                    let config = {
                              method: 'get',
                              url: `${udApi}/${domainname}.${exten}`
                    };

                    axios(config).then(function (response) {
                              resolve(response.data)
                    }).catch(function (error) {
                              resolve();
                    });
          });
};


export const getdomainsuggestions = function (type, searchDomain, domain) {
          return new Promise(async (resolve, reject) => {
                    let udApi = process.env.REACT_APP_DOMAIN_NAME_SUGGESTIONS;
                    let config = {}
                    if (type == 'all') {
                              config.method = 'get';
                              config.url = `${udApi}?search=${searchDomain}&tlds=crypto&tlds=nft&tlds=x&tlds=wallet&tlds=bitcoin&tlds=dao&tlds=888&tlds=zil&tlds=blockchain`
                    } else {
                              config.method = 'get';
                              config.url = `${udApi}?search=${searchDomain}&tlds=${domain}`
                    }
                    axios(config).then(function (response) {
                              resolve(response.data)
                    }).catch(function (error) {
                              resolve();
                    });
          });
};

export const getfreedomainsuggestions = function (searchDomain) {
          return new Promise(async (resolve, reject) => {
                    let udApi = process.env.REACT_APP_DOMAIN_NAME_FREE_SUGGESTIONS;
                    let config = {
                              method: 'get',
                              url: `${udApi}?search=${searchDomain}`
                    };
                    axios(config).then(function (response) {
                              resolve(response.data)
                    }).catch(function (error) {
                              resolve();
                    });
          });
};