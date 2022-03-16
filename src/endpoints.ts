const main = {
  demands: '/demands'
} as const

const panel = {
  login: '/login',
  getPlaces: '/places',
  getPlaceDemands: '/places/:id/demands',
  getUser: '/users/whoami'
} as const

export const API = { main, panel }
