import axios from 'axios';
import LocalStorage from './LocalStorage';
import router from './../router';

class HttpService {
  constructor(url = undefined) {
    this.storage = new LocalStorage('customer')
    this.client = axios.create({
      baseURL: url ? url : process.env.VUE_APP_API_URL || 'http://localhost:3000/'
    });

    this.client.interceptors.request.use(
      (config) => {
        let customer = this.storage.get();
        if (customer) {
          config.headers['Authorization'] = customer.token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.status === 401) {
          this.storage.clear();
          router.push('/login')
        }
        return Promise.reject(error);
      }
    );
  }

}

export default HttpService;