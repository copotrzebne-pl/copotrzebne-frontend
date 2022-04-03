import { Page, routes } from '../routes'

export const getDefaultMenuItems = ({
  authorized,
  handleLogout
}: {
  authorized: boolean
  handleLogout: () => void
}) => [
  {
    route: routes[Page.PANEL],
    translationKey: 'menuPanel',
    hidden: !authorized
  },
  {
    route: routes[Page.ABOUT],
    translationKey: 'menuAboutUs'
  },
  {
    route: routes[Page.LOGIN],
    translationKey: 'menuLogIn',
    hidden: authorized
  },
  {
    route: routes[Page.LOGIN],
    translationKey: 'menuLogout',
    hidden: !authorized,
    action: handleLogout
  }
]

export const getPanelMenuItems = ({
  authorized,
  handleLogout
}: {
  authorized: boolean
  handleLogout: () => void
}) => [
  {
    route: routes[Page.PANEL],
    translationKey: 'menuPanel',
    hidden: !authorized
  },
  {
    route: routes[Page.ABOUT],
    translationKey: 'menuAboutUs'
  },
  {
    route: routes[Page.LOGIN],
    translationKey: 'menuLogout',
    hidden: !authorized,
    action: handleLogout
  }
]
