import axios from 'axios';
import { useSnackBarStateValue } from '../shared/state-handler'
import ProviderGenerator from '../shared/provider-generator';
import { useHistory } from 'react-router-dom';

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { dispatch } = useSnackBarStateValue()

  const {
    NODE_ENV,
    REACT_APP_API_URL
  } = process.env
  /**
   * TODO: Discover how to use the useHistory hook in tests
   */

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const history = NODE_ENV !== 'test' ? useHistory() : {} as {[key: string]: any}
  const url = REACT_APP_API_URL

  const options = () => {
    return {
      headers: {
        userid: localStorage.getItem('userid') || '',
        'Authorization': `Bearer ${localStorage.getItem('token')}` || '',
        'Content-Type': 'application/json'
      },
    };
  }

  const get = (path: string) => {
    return axios.get(`${url}/${path}`, options());
  }

  const post = (path: string, body = {}) => {
    return axios.post(`${url}${path && `/${path}`}`, { ...body }, options())
      .catch(error => {
        handleError(error)
        throw error
      });
  }

  const put = (path: string, body = {}) => {
    return axios.put(`${url}${path && `/${path}`}`, { ...body }, options())
      .catch(error => {
        handleError(error)
        throw error
      });;
  }

  const del = (path: string) => {
    return axios.delete(`${url}/${path}`, options());
  }

  const handleError = (error: any) => {
    if (error?.response?.data?.statusCode === 401) {
      history.push('/login')
    }
    dispatch({
      type: 'setSnackbarOpen',
      payload: {
        open: true,
        message: error?.response?.data?.message || error.message,
        severity: 'error'
      }
    })
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
