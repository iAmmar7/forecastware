import axios from 'axios';

import { API_URL, API_KEY } from './constants';

export default class API {
  constructor(baseURL) {
    this.config = {
      baseURL: baseURL || API_URL,
      timeout: 20000,
    };
    this.instance = axios.create(this.config);
  }

  get(url, id, params) {
    let endpoint = url;
    if (id) {
      endpoint += `/${id}`;
    }
    return this.instance.get(endpoint, { params: { ...params, appId: API_KEY } });
  }
}
