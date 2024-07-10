import axios from 'axios';
import { omit } from 'lodash';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

export const AuthApi = {
  // Registering user
  async registerNewUser(userData) {
    const { data } = await axios.post('/auth/signup', userData);
    return data;
  },

  async loginUser(signedUserData) {
    // Logging in user
    const { data } = await axios.post('/auth/login', signedUserData);
    return data;
  },

  async logOutUser() {
    // User logout
    const { data } = await axios.post('/auth/logout', {
      headers: { Authorization: axios.defaults.headers.common.Authorization }
    });
    return data;
  },

  async refreshUser(sid, refreshToken) {
    // Refresh user
    const { data } = await axios({
      data: { sid },
      headers: { Authorization: `Bearer ${refreshToken}` }, // Correctly format the Authorization header
      method: 'post',
      url: `/auth/refresh`,
    });
    return data;
  },
};

export const UserApi = {
  async getUserInfo() {
    const { data } = await axios.get('/users/current', {
      headers: { Authorization: axios.defaults.headers.common.Authorization }
    });
    return data;
  },
};

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet() {
    delete axios.defaults.headers.common.Authorization;
  },
};

export const DailyApi = {
  // Info about unregistered user
  async getDailyRateInfo(userInfo) {
    const { data } = await axios.post('/daily-rate', userInfo);
    return data;
  },

  async getDailyRateInfoBasedOnId(userInfo) {
    const { data } = await axios.post(
      `/daily-rate/${userInfo.userId}`,
      omit(userInfo, ['userId'])
    );
    return data;
  },
};

export const ProductApi = {
  async productSearch(search) {
    const { data } = await axios.get('/product/', { params: { search } });
    return data;
  },
};

// Export individual functions for product operations
export async function productSearch(search) {
  const { data } = await axios.get('/product/', { params: { search } });
  return data;
}

export async function addProduct(productInfo) {
  const { data } = await axios.post('/day', productInfo);
  return data;
}

export async function deleteProduct(productData) {
  const { data } = await axios.delete('/day', { data: productData });
  return data;
}

export async function getDayInfo(date) {
  const { data } = await axios.post('/day/info', { date });
  return data;
}
