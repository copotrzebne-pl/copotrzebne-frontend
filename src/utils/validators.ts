export const isEmail = (email: string): boolean =>
  /(.+)@(.+){2,}\.(.+){2,}/.test(email)
