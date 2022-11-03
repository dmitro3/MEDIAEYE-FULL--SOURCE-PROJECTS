import axios from 'axios';
import { func } from 'prop-types';

export const getcollection = function (activeDays) {
  return new Promise(async (resolve, reject) => {
    let collectionApi = process.env.REACT_APP_COLLECTIONS_TOP;
    let collectionApirange = '';
    if (activeDays === 30) {
      collectionApirange = 'month';
    } else if (activeDays === 7) {
      collectionApirange = 'week';
    } else if (activeDays === 1) {
      collectionApirange = 'day';
    } else if (activeDays === 'all') {
      collectionApirange = 'all';
    }

    let data = {
      daterange: collectionApirange
    };
    let config = {
      method: 'post',
      url: collectionApi,
      data: data
    };
    axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          let dataarr = response.data.finddatares;
          resolve(dataarr);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};
export const getnfts = function (activeDays) {
  return new Promise(async (resolve, reject) => {
    let collectionApi = process.env.REACT_APP_TOP_NFTS;
    let collectionApirange = '';
    if (activeDays === 30) {
      collectionApirange = 'month';
    } else if (activeDays === 7) {
      collectionApirange = 'week';
    } else if (activeDays === 1) {
      collectionApirange = 'day';
    } else if (activeDays === 'all') {
      collectionApirange = 'all';
    }

    let data = {
      daterange: collectionApirange
    };
    let config = {
      method: 'post',
      url: collectionApi,
      data: data
    };
    axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          let dataarr = response.data.findnftdatares;
          resolve(dataarr);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};
export const coinmarketcap = function (activeDays) {
  return new Promise(function (resolve, reject) {
    let collectionApi = process.env.REACT_APP_COINMARKET_CAP_HUB;
    let data = {
      "daterange": activeDays
    };

    let config = {
      method: 'post',
      url: collectionApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          let a = response.data.a;
          resolve(a);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};
