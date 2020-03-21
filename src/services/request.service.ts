import axios from 'axios';

class RequestService {
  url = 'http://localhost:3000'

  options() {
    return {
      headers: {
        userid: localStorage.getItem('userid') || '',
        authorization: localStorage.getItem('token') || '',
      },
    };
  }

  get(path: string) {
    return axios.get(`${this.url}/${path}`, this.options());
  }

  post(path: string, body = {}) {
    return axios.post(`${this.url}${path && `/${path}`}`, { ...body }, this.options());
  }

  put(path: string, body = {}) {
    return axios.put(`${this.url}${path && `/${path}`}`, { ...body }, this.options());
  }

  delete(path: string) {
    return axios.delete(`${this.url}/${path}`, this.options());
  }
}

export default () => new RequestService();
