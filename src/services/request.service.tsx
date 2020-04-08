import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { useStateValue } from '../state-handler'

const RequestServiceContext = createContext({} as any);

const RequestServiceProvider = ({ children }: any) => {

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
      });
  }

  const put = (path: string, body = {}) => {
    return axios.put(`${url}${path && `/${path}`}`, { ...body }, options());
  }

  const del = (path: string) => {
    return axios.delete(`${url}/${path}`, options());
  }

  const value = {
    get, post, put, del
  };

  return (
    <RequestServiceContext.Provider value={value}>
      {children}
    </RequestServiceContext.Provider>
  )
};

const useRequestServiceValue = () => useContext(RequestServiceContext);

export {
  RequestServiceContext,
  RequestServiceProvider,
  useRequestServiceValue
};
