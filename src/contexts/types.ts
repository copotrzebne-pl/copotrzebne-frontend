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

export type Priority = {
  id: string
  namePl: string
  nameUa: string
  nameEn: string
}

export type Supply = {
  id: string
  namePl: string
  nameUa: string
  nameEn: string
}

export type Demand = {
  supply: Supply
  priority: Priority
  updatedAt: string
  comment?: string
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
  demands: Demand[]
}

export type PanelContextValue = {
  places: Place[]
  demands: Demand[]
  fetchPlaces: () => void
  fetchDemands: (placeId: string) => void
  clearDemands: () => void
}

export type PanelContextProviderProps = {
  children: ReactNode
}
