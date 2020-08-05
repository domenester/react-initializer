import { useUserServiceValue } from "../services"
import { useUserListStateValue } from "../shared/state-handler"

export type TFetch = (take: number, skip: number, accumulate?: boolean) => Promise<void> | void

export const useUserFetch = (): TFetch => {
  const { dispatch, state } = useUserListStateValue()
  const { list } = useUserServiceValue()
  const { rows, filter } = state

  return async (take: number, skip: number, accumulate: boolean = true) => {
    dispatch({ type: 'resetList', payload: null})
    const data: any = await list(take, skip, filter)
    const newRows = [ ...((accumulate && rows) || []), ...data.rows ]
    dispatch({ type: 'setRows', payload: newRows })
    dispatch({ type: 'setCount', payload: data.count })
  }
}