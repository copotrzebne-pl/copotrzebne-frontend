import { Navigate, Outlet } from 'react-router-dom'
import { useUserContext } from './contexts/userContext'

export enum Page { //eslint-disable-line no-shadow
  LOGIN,
  HOME,
  PLACE,
  NOTFOUND,
  ABOUT,
  PANEL,
  MANAGE_PLACE,
  MANAGE_ADDRESS,
  DEMANDS,
  MANAGE_DEMANDS
}

export const routes: { [key in Page]: string } = {
  [Page.HOME]: '/',
  [Page.LOGIN]: '/login',
  [Page.PLACE]: '/place',
  [Page.ABOUT]: '/about',
  [Page.PANEL]: '/panel',
  [Page.MANAGE_PLACE]: '/panel/manage-place/:id',
  [Page.MANAGE_ADDRESS]: '/panel/manage-address/:id',
  [Page.DEMANDS]: '/panel/demands/:id',
  [Page.MANAGE_DEMANDS]: '/panel/manage_demands/:id',
  [Page.NOTFOUND]: '*'
}

export const PrivatePath = () => {
  const { authorized } = useUserContext()
  return authorized ? <Outlet /> : <Navigate to={routes[Page.LOGIN]} />
}
