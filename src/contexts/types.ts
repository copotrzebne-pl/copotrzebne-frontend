import { ReactNode } from 'react'

export type User = {
  email: string
  id: string
}

export type UserContextValue = {
  user: User | null
  login: (login: string, password: string) => void
  fetchUser: () => void
}

export type UserContextProviderProps = {
  children: ReactNode
}

export type Place = {
  apartment: null
  buildingNumber: string
  city: string
  comment: string
  email: string
  id: string
  latitude: string
  longitude: string
  name: string
  phone: string
  street: string
}

export type PanelContextValue = {
  places: Place[]
  fetchPlaces: () => void
}

export type PanelContextProviderProps = {
  children: ReactNode
}
