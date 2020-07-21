export interface ISideBarListItem {
  text: string
  icon: React.ReactElement
  link: string
  dataTestId: string
  isLogout?: boolean
}