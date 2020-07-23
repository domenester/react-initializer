import React from "react"
import { UserStateProvider } from "../user"

export const GlobalStateProvider = ({ children }: any) => {
  return (
    <UserStateProvider>
      {children}
    </UserStateProvider>
  )
}