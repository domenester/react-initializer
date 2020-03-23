export type TStateHandler = {
  [key: string]: (setState: Function, payload: any) => void
}