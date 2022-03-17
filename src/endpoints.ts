const main = {
  demands: '/demands'
} as const

const panel = {
  login: '/login',
  getPlaces: '/places',
  getPlaceDemands: '/places/:id/demands',
  getUser: '/users/whoami',
  getOwnedPlaces: '/places/owned',
  savePlace: '/places'
} as const

export const API = { main, panel }
