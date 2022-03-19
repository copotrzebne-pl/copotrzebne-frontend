import { ReactNode } from 'react'

export type User = {
  role: string
  login: string
  id: string
}

export type UserContextValue = {
  user: User | null
  ownedPlaces: Place[]
  login: (login: string, password: string) => void
  fetchUser: () => void
  fetchOwnedPlaces: () => void
  savePlace: (place: Place) => void
  authorized: boolean
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

export type DemandDTO = {
  comment?: string | null
  placeId: string
  supplyId: string
  priorityId: string
}

export type Place = {
  apartment: string
  buildingNumber: string
  city: string
  comment: string
  email: string
  id?: string
  latitude: string | null
  longitude: string | null
  name: string
  phone: string
  street: string
}

export type PanelContextValue = {
  places: Place[]
  demands: Demand[]
  supplies: Supply[]
  priorities: Priority[]
  fetchPlaces: () => void
  fetchDemands: (placeId: string) => void
  clearDemands: () => void
  fetchPriorities: (placeId: string) => void
  fetchSupplies: (placeId: string) => void
  saveDemand: (demand: DemandDTO) => Promise<boolean>
  removeAllDemands: (placeId: string) => void
}

export type PanelContextProviderProps = {
  children: ReactNode
}
