import { act, fireEvent, waitFor } from "@testing-library/react"

export const useUserRoute = async (getByTestId: any) => {
  const sidebarUserButton = await waitFor( () => getByTestId('sidebar-user'))
  await act( async () => {
    fireEvent.click(sidebarUserButton)
  })
}