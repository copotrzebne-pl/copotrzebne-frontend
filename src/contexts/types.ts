import { ReactNode } from 'react'

export type User = {
  email: string
  id: string
}

export type UserContextValue = {
  user: User | null,
  fetchUser: () => void
}

export type UserContextProviderProps = {
  children: ReactNode
}
