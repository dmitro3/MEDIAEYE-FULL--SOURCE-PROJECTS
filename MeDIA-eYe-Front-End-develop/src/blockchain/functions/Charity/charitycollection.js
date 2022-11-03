import axios from "axios";

export const givingBlockLogin = function () {
  return new Promise(async (resolve, reject) => {
    const givinigblockApi = process.env.REACT_APP_GIVING_BLOCK_LOGIN;
    let data = {
      key: process.env.REACT_APP_GIVING_BLOCK_KEY
    };
    let resdata = {};
    let config = {
      method: 'post',
      url: givinigblockApi,
      timeout: 2 * 60 * 1000,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        resdata.accessToken = response.data.result.accessToken;
        resdata.key = 1;
        resolve(resdata);
      } else {
        resdata.key = 0;
        resolve(resdata);
      }
    }).catch(function (error) {
      resdata.key = 0;
      resolve(resdata);
    });
  });
};
export const givingBlockRefreshToken = function (refresh_token) {
  return new Promise(async (resolve, reject) => {
    const givinigblockApi =
      process.env.REACT_APP_GIVING_BLOCK_LOGIN_REFRESH_TOKEN;
    let data = JSON.stringify({
      key: process.env.REACT_APP_GIVING_BLOCK_KEY,
      refresh_token: refresh_token
    });
    let resdata = {};
    let config = {
      method: 'post',
      url: givinigblockApi,
      data: data
    };

    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        resdata.accessToken = response.data.result.accessToken;
        resdata.refreshToken = response.data.result.refreshToken;
        resdata.key = 1;
        resolve(resdata);
      } else {
        resdata.key = 0;
        resolve(resdata);
      }
    }).catch(function (error) {
      resdata.key = 0;
      resolve(resdata);
    });
  });
};
export const givingBlockOrganizationlist = function (pageNumber) {
  return new Promise(async (resolve, reject) => {
    const givinigblockApi =
      process.env.REACT_APP_GIVING_BLOCK_ORGANIZATION_LIST;
    let data = {
      key: process.env.REACT_APP_GIVING_BLOCK_KEY,
      pagenumber: pageNumber
    };
    let config = {
      method: 'post',
      url: givinigblockApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        const result = response.data.result;
        resolve(result);
      } else {
        resolve();
      }
    }).catch(function (error) {
      resolve();
    });
  });
};
export const getorganizationlistbyId = function (access_token, organizationId, organizationType) {
  return new Promise(async (resolve, reject) => {
    const givinigblockApi =
      process.env.REACT_APP_GIVING_BLOCK_ORGANIZATION_LIST_BY_ID;
    let data = {
      key: process.env.REACT_APP_GIVING_BLOCK_KEY,
      access_token: access_token,
      organizationId: organizationId,
      organizationType: organizationType
    };
    let resdata = {};
    let config = {
      method: 'post',
      url: givinigblockApi,
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          resdata.key = 1;
          resdata.organizationdetail = response.data.result;
          resolve(resdata);
        } else {
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
export const getcurrencieslist = function (access_token, organizationId, organizationType) {
  return new Promise(async (resolve, reject) => {
    const givinigblockApi = process.env.REACT_APP_GIVING_BLOCK_CURRENCIES_LIST;
    let data = {
      key: process.env.REACT_APP_GIVING_BLOCK_KEY,
      access_token: access_token,
      organizationId: organizationId,
      organizationType: organizationType
    };
    let resdata = {};
    let config = {
      method: 'post',
      url: givinigblockApi,
      data: data
    };

    await axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          if (organizationType == "Giving Block") {
            resdata.key = 1;
            resdata.currencieslist = response.data.result;
            resolve(resdata);
          } else {
            resdata.key = 1;
            resdata.cryptoToken = response.data.cryptoToken;
            resdata.cryptoCurrencies = response.data.cryptoCurrencies;
            resolve(resdata);
          }
        } else {
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
export const getdonation = function (data) {
  return new Promise(async (resolve, reject) => {
    const givinigblockApi = process.env.REACT_APP_GIVING_BLOCK_DONATION;

    let config = {
      method: 'post',
      url: givinigblockApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        let res = response.data.result;
        resolve(res);
      } else {
        resolve();
      }
    }).catch(function (error) {
      resolve();
    });
  });
};
export const gettoken = function (tokenname) {
  return new Promise(async (resolve, reject) => {
    const givinigblockApi = process.env.REACT_APP_GIVING_BLOCK_TOKEN_CHARITY
    let data = {
      tokenname: tokenname
    };
    let config = {
      method: 'post',
      url: givinigblockApi,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        if (response.data.code == 200) {
          let res = response.data.data;
          resolve(res);
        } else {
          resolve();
        }
      })
      .catch(function (error) {
        resolve();
      });
  });
};
export const charitytxn = function (txndata) {
  return new Promise(async (resolve, reject) => {
    const charitytxnapi = process.env.REACT_APP_GIVING_CHARITY_SAVE
    let config = {
      method: 'post',
      url: charitytxnapi,
      data: txndata
    };
    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        resolve(true);
      } else {
        resolve();
      }
    }).catch(function (error) {
      resolve();
    });
  });
};
export const registration = function (sendData, fileData) {
  return new Promise(async (resolve, reject) => {
    const regisapi = process.env.REACT_APP_CHARITY_REGISTRATION

    let sendDataconfig = {
      method: 'post',
      url: regisapi,
      data: sendData
    };
    await axios(sendDataconfig).then(async (response) => {
      if (response.data.code == 200) {
        fileData.creatorwalletaddress = response.data.creatorwalletaddress;
        fileData.recordId = response.data.recordId;
        fileData.irdRegisterName = response.data.irdRegisterName;
        let fileDataconfig = {
          method: 'post',
          url: regisapi,
          data: fileData,
          headers: { "Content-Type": "multipart/form-data" },
        }
        await axios(fileDataconfig).then(function (response) {
          if (response.data.code == 200) {
            resolve("success");
          } else {
            resolve();
          }
        }).catch(function (error) {
          resolve();
        });
      } else {
        resolve()
      }
    }).catch(function (error) {
      resolve();
    });
  });
};
export const particulartoken = function (tokenname) {
  return new Promise(async (resolve, reject) => {
    const ptokenapi = process.env.REACT_APP_PARITCULAR_TOKEN;
    let data = {
      tokenName: tokenname
    };
    let config = {
      method: 'post',
      url: ptokenapi,
      data: data
    };
    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        resolve(response.data.token);
      } else {
        resolve();
      }
    }).catch(function (error) {
      resolve();
    });
  });
};
export const particularnetwork = function () {
  return new Promise(async (resolve, reject) => {
    const pnetworkapi = process.env.REACT_APP_PARITCULAR_NETWORk;
    let config = {
      method: 'get',
      url: pnetworkapi,
    };
    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        resolve(response.data.CryptoOptions);
      } else {
        resolve();
      }
    }).catch(function (error) {
      resolve();
    });
  });
};
export const gemarketplaceorglist = function () {
  return new Promise(async (resolve, reject) => {
    const gemarketplaceorglistapi = process.env.REACT_APP_MARKETPLACE_ORG_LIST
    let config = {
      method: 'get',
      url: gemarketplaceorglistapi,
    };
    await axios(config).then(function (response) {
      if (response.data.code == 200) {
        resolve(response.data.finddatares);
      } else {
        resolve();
      }
    }).catch(function (error) {
      resolve();
    });
  });
};