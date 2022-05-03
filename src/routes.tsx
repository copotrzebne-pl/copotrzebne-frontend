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
  MANAGE_DEMANDS,
  REQUEST_NEW_PLACE,
  CREATE_USER,
  BROWSE_INTERNAL_ANNOUNCEMENTS
}

export const routes: { [key in Page]: string } = {
  [Page.HOME]: '/',
  [Page.LOGIN]: '/login',
  [Page.PLACE]: '/place',
  [Page.ABOUT]: '/about',
  [Page.PANEL]: '/panel',
  [Page.REQUEST_NEW_PLACE]: '/request-new-place',
  [Page.MANAGE_PLACE]: '/panel/manage-place/:id',
  [Page.MANAGE_ADDRESS]: '/panel/manage-address/:id',
  [Page.DEMANDS]: '/panel/demands/:id',
  [Page.MANAGE_DEMANDS]: '/panel/manage_demands/:id',
  [Page.CREATE_USER]: '/panel/users/create',
  [Page.BROWSE_INTERNAL_ANNOUNCEMENTS]: '/panel/internal-announcements',
  [Page.NOTFOUND]: '*'
}

export const PrivatePath = () => {
  const { authorized } = useUserContext()
  return authorized ? <Outlet /> : <Navigate to={routes[Page.LOGIN]} />
}
