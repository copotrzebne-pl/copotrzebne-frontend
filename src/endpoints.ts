const main = {
  demands: '/demands'
} as const

const panel = {
  login: '/login',
  getPlaces: '/places',
  getUser: '/users/whoami'
} as const

export const API = { main, panel }
