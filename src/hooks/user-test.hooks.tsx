import { act, fireEvent } from "@testing-library/react"

export const useUserRoute = async (getByTestId: any) => {
  const sidebarUserButton = getByTestId('sidebar-user')
  await act( async () => {
    fireEvent.click(sidebarUserButton)
  })
}