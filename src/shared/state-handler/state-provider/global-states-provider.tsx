import React from "react"
import { SnackBarStateProvider } from "../snackbar"
import { UserStateProvider } from "../user"

export const GlobalStateProvider = ({ children }: any) => {
  return (
    <SnackBarStateProvider>
      <UserStateProvider>
        {children}
      </UserStateProvider>
    </SnackBarStateProvider>
  )
}