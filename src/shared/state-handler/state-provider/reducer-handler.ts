import { TReducers } from "../interfaces";

export const reducerHandler = (
  state: any,
  action: {
    type: string, payload: any
  },
  reducers: TReducers
) => {
  if (!reducers[action.type]) {
    throw new Error('Action type not registered in reducers.')
  }
  return reducers[action.type](state, action.payload)
};