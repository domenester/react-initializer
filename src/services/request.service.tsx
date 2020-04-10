import axios from 'axios';
import { useStateValue } from '../state-handler'
import ProviderGenerator from '../shared/provider-generator';

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { dispatch } = useStateValue()
  const url = process.env.REACT_APP_API_URL

  const options = () => {
    return {
      headers: {
        userid: localStorage.getItem('userid') || '',
        authorization: localStorage.getItem('token') || '',
      },
    };
  }

  const get = (path: string) => {
    return axios.get(`${url}/${path}`, options());
  }

  const post = (path: string, body = {}) => {
    return axios.post(`${url}${path && `/${path}`}`, { ...body }, options())
      .catch(error => {
        dispatch({
          type: 'setSnackbarOpen',
          payload: {
            open: true,
            message: error?.response?.data?.message || error.message,
            severity: 'error'
          }
        })
        console.error(error.response)
        throw error
      });
  }

  const put = (path: string, body = {}) => {
    return axios.put(`${url}${path && `/${path}`}`, { ...body }, options());
  }

  const del = (path: string) => {
    return axios.delete(`${url}/${path}`, options());
  }

  return {
    get, post, put, del
  };
}

const providerGenerated = ProviderGenerator(buildValue)

const RequestServiceProvider = providerGenerated.provider
const RequestServiceContext = providerGenerated.context
const useRequestServiceValue = providerGenerated.useValue

export {
  RequestServiceProvider,
  RequestServiceContext,
  useRequestServiceValue
};
