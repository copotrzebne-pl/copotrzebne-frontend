import { Route } from 'types/types'
import HomeView from 'views/Home'
import LoginView from 'views/Login'

export const PATHS = {
  home: '/',
  login: '/login'
}

export const routes: Route[] = [
  { path: PATHS.home, component: HomeView },
  { path: PATHS.login, component: LoginView }
]
