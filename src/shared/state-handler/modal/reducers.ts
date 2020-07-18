import { TReducers } from "../interfaces"

export const ModalReducers: TReducers =  {
  setTitle: (state: any, payload: any) => ({
      ...state,
      title: payload
    }
  ),
  close: (state: any) => ({
    ...state,
    open: false
  }),
  open: (state: any) => ({
      ...state,
      open: true
    }
  ),
}
