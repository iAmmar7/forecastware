import axios from 'axios';

import { API_URL, API_KEY } from '../utils/constants';

export default class API {
  constructor(baseURL) {
    this.config = {
      baseURL: baseURL || API_URL,
      timeout: 20000,
    };
    this.instance = axios.create(this.config);

    this.instance.interceptors.response.use(
      (response) => {
        if (response.status === 200) {
          return response.data;
        }
        throw response;
      },
      async (error) => {
        console.log('API Error', error);
        throw error;
      }
    );
  }

  get(url, id, params) {
    let endpoint = url;
    if (id) {
      endpoint += `/${id}`;
    }
    return this.instance.get(endpoint, { params: { ...params, appId: API_KEY } });
  }
}
