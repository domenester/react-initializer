import React from 'react';
import { RequestServiceProvider, useRequestServiceValue } from './request.service';
import ProviderGenerator from '../shared/provider-generator';
import { UserModel } from '../models';

const buildValue = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { post } = useRequestServiceValue()
 
  const list = async (take: number, skip: number) => {
    const { data } = await post('users/list', { take, skip })
    return data;
  }

  const create = async (user: UserModel) => {
    const { data } = await post('users/create', user)
    return data;
  }

  return {
    list,
    create
  }
}

const providerGenerated = ProviderGenerator( buildValue )

export const UserServiceProviderGenerated = providerGenerated.provider

const UserServiceProvider = ({ children }: any) => {
  return (
    <RequestServiceProvider>
      <UserServiceProviderGenerated>
        {children}
      </UserServiceProviderGenerated>
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