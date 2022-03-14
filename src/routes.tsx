import { Navigate, Outlet } from 'react-router-dom'
import { checkIfAuthorized } from 'utils/session'

export enum Page { //eslint-disable-line no-shadow
  LOGIN,
  HOME,
  NOTFOUND,
  PANEL
}

export const routes: { [key in Page]: string } = {
  [Page.HOME]: '/',
  [Page.LOGIN]: '/login',
  [Page.PANEL]: '/panel',
  [Page.NOTFOUND]: '*'
}

export const PrivatePath = () => {
  const authorized = checkIfAuthorized()
  return authorized ? <Outlet /> : <Navigate to={routes[Page.LOGIN]} />
}
