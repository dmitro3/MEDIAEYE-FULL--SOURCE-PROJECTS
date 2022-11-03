import axios from 'axios';
import { session } from '../utils/session.util';

axios.defaults.withCredentials = true

export const baseUrl = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL: process.env.REACT_APP_API;

export const otpService = {
  requestOtp: async (payload) => {
    const response = await axios.post(`${baseUrl}/auth/refresh/generate`, payload);
    return response.data;
  },
  loginOtp: async (payload) => {
    const response = await axios.post(`${baseUrl}/auth/refresh/otp/email`, payload);
    session.save('eye-user', response.data.user);
  }
}

export const userService = {
  update: async (payload) => {
    const response = await axios.put(`${baseUrl}/users/user/${payload.id}`, payload);
    session.save('eye-user', response.data);
  },
  fetch: async (payload) => {
    const response = await axios.get(`${baseUrl}/users?skip=${payload.skip}&take=${payload.take}`);
    return response.data;
  },
  handleFollowing: async (payload) => {
    const user = session.get('eye-user')
    const response = await axios.put(`${baseUrl}/users/following/${user.id}`, payload);
    session.save('eye-user', response.data);
    return response.data;
  }
}

export const uploadService = {
  upload: async (payload) => {
    const response = await axios.post(`${baseUrl}/upload`, payload);
    return response.data;
  },
  remove: async (payload) => {
    const response = await axios.delete(`${baseUrl}/upload/${payload}`);
    return response.data;
  },
  uploadData: async (payload) => {
    const response = await axios.post(`${baseUrl}/upload/data`, payload);
    return response.data;
  }
}

export const collectionService = {
  create: async (payload) => {
    const response = await axios.post(`${baseUrl}/collections`, payload);
    return response.data;
  },
  fetch: async () => {
    const response = await axios.get(`${baseUrl}/collections`);
    console.log(response,'response')
    return response.data;
  },
  fetchOne: async (payload) => {
    const response = await axios.get(`${baseUrl}/collections/${payload}`);
    return response.data;
  },
  pinJSON: async (payload) => {
    const response = await axios.post(`${baseUrl}/collections/json/ipfs`, payload);
    return response.data;
  }
}

export const avatarService = {
  create: async (payload) => {
    const response = await axios.post(`${baseUrl}/avatars`, payload);
    if(payload.editProfile) {
      let user = session.get('eye-user');
      user.avatar = response.data.filename;
      session.save('eye-user', user);
    }
    return response.data;
  },
  fetch: async () => {
    const response = await axios.get(`${baseUrl}/avatars`);
    return response.data;
  }
}

export const nftService = {
  create: async (payload) => {
    const response = await axios.post(`${baseUrl}/nfts`, payload);
    return response.data;
  },
  fetch: async () => {
    const response = await axios.get(`${baseUrl}/nfts`);
    return response.data;
  }
}