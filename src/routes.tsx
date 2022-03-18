import { Navigate, Outlet } from 'react-router-dom'
import { checkIfAuthorized } from 'utils/session'

export enum Page { //eslint-disable-line no-shadow
  LOGIN,
  HOME,
  PLACE,
  NOTFOUND,
  ABOUT,
  LANGUAGE,
  PANEL,
  MANAGE_PLACE,
  DEMANDS
}

export const routes: { [key in Page]: string } = {
  [Page.HOME]: '/',
  [Page.LOGIN]: '/login',
  [Page.PLACE]: '/place',
  [Page.LANGUAGE]: '/language',
  [Page.ABOUT]: '/about',
  [Page.PANEL]: '/panel',
  [Page.MANAGE_PLACE]: '/panel/manage-place/:id',
  [Page.DEMANDS]: '/panel/demands/:id',
  [Page.NOTFOUND]: '*'
}

export const PrivatePath = () => {
  const authorized = checkIfAuthorized()
  return authorized ? <Outlet /> : <Navigate to={routes[Page.LOGIN]} />
}
