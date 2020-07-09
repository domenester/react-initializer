import { UserReducers } from "../user";
import { SnackbarReducers } from "../snackbar";
import { UserListReducers } from "../list";

const reducers: {
  [key: string]: ( state: any, payload: any ) => { [key: string]: any }
 } = {
  ...UserReducers,
  ...SnackbarReducers,
  ...UserListReducers
}

export default (state: any, action: {
  type: string, payload: any
}) => {
  if (!reducers[action.type]) {
    throw new Error('Action type not registered in reducers.')
  }
  return reducers[action.type](state, action.payload)
};