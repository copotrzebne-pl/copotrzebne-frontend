const main = {
  getMissingProducts: 'api/<path-to-api>'
} as const

const admin = {
  login: 'api/login',
  getUser: 'api/user'
} as const

export const API = { main, admin }
