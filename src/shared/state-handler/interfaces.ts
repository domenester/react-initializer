export type TReducers = {
  [key: string]: ( state: any, payload: any ) => { [key: string]: any }
}

export type TDispatch =  ({ type, payload }: { type:string, payload: any }) => void;

export interface IContextProps {
  state: any;
  dispatch: TDispatch;
}