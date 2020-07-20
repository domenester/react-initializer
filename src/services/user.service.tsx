/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { RequestServiceProvider, useRequestServiceValue } from './request.service';
import ProviderGenerator from '../shared/provider-generator';
import { UserModel } from '../models';
import { UserListStateProvider } from '../shared/state-handler';

const buildValue = () => {
  const { post, put } = useRequestServiceValue()

  const update = async (user: UserModel) => {
    const { data } = await put('users/update', user)
    return data;
  }

  const list = async (take: number, skip: number, filter: string) => {
    const { data } = await post('users/list', { take, skip, filter })
    return data;
  }

  const create = async (user: UserModel) => {
    const { data } = await post('users/create', user)
    return data;
  }

  const del = async (email: string) => {
    const { data } = await post('users/delete', { email })
    return data;
  }

  const restore = async (email: string) => {
    const { data } = await post('users/restore', { email })
    return data;
  }
  return {
    list,
    create,
    update,
    del,
    restore
  }
}

const providerGenerated = ProviderGenerator( buildValue )

export const UserServiceProviderGenerated = providerGenerated.provider

const UserServiceProvider = ({ children }: any) => {
  return (
    <RequestServiceProvider>
      <UserListStateProvider>
        <UserServiceProviderGenerated>
          {children}
        </UserServiceProviderGenerated>
      </UserListStateProvider>
    </RequestServiceProvider>
  )
}

const UserServiceContext = providerGenerated.context
const useUserServiceValue = providerGenerated.useValue

export {
  UserServiceProvider,
  UserServiceContext,
  useUserServiceValue
};