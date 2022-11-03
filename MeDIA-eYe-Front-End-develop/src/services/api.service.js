import axios from 'axios';
export const baseUrl =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_API
    : process.env.REACT_APP_DOMAIN;

export const uploadService = {
  uploadImage: async (payload) => {
    const response = await axios.post(`${baseUrl}upload`, payload, { withCredentials: true });
    return response;
  },
  uploadZipFile: async (payload) => {
    const response = await axios.post(`${baseUrl}upload/zip`, payload, { withCredentials: true });
    return response;
  },
  uploadExcelFile: async (payload) => {
    const response = await axios.post(`${baseUrl}upload/excel`, payload, { withCredentials: true });
    return response;
  },
  // downloadFile: async (payload) => {
  //   const response = await axios.get(`${baseUrl}upload/download/${payload}`);
  //   return response;
  // }
};

export const walletAuthenticationService = {
  login: async (payload) => {
    const response = await axios.post(`${baseUrl}auth/login`, {
      walletAddress: payload
    }, { withCredentials: true });
    return response;
  }
};

export const collectionService = {
  generate: async (payload) => {
    const response = await axios.post(`${baseUrl}collection`, payload, { withCredentials: true });
    return response.data;
  }
};

export const ipfsService = {
  upload: async (payload) => {
    const response = await axios.post(`${baseUrl}ipfs`, payload, { withCredentials: true });
    return response.data;
  },
  uploadOne: async (payload) => {
    const response = await axios.post(`${baseUrl}ipfs/one`, payload, { withCredentials: true });
    return response.data;
  },
  uploadMetadata: async (payload) => {
    const response = await axios.post(`${baseUrl}ipfs/one/traits`, payload, { withCredentials: true });
    return response.data;
  }
};

export const NFTService = {
  register: async (payload) => {
    const response = await axios.post(`${baseUrl}nft`, payload, { withCredentials: true });
    return response.data;
  }
};