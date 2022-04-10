import { ReactNode } from 'react'

export type User = {
  role: string
  login: string
  id: string
}

export type UserContextValue = {
  user: User | null
  ownedPlaces: (Place & { id: string })[]
  login: (login: string, password: string) => void
  fetchUser: () => void
  fetchOwnedPlaces: () => void
  savePlace: (place: Place) => void
  deletePlace: (placeId: string) => void
  authorized: boolean
  language: string
  changeLanguage: (lang: string) => void
  setAuthorized: (authorized: boolean) => void
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

export type Category = {
  id: string
  priority: number
  namePl: string
  nameUa: string
  nameEn: string
}

export type Supply = {
  id: string
  category: Category
  namePl: string
  nameUa: string
  nameEn: string
}

export type Demand = {
  id: string
  supply: Supply
  supplyId: string
  priority: Priority
  updatedAt: string
  comment?: string
}

export type DemandDTO = {
  id?: string
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
  lastUpdatedAt: string
  workingHours: string
}

export type PanelContextValue = {
  places: Place[]
  selectedPlace: Place | null
  demands: Demand[]
  supplies: Supply[]
  priorities: Priority[]
  fetchPlaces: () => void
  fetchPlace: (placeId: string) => void
  updatePlaceLastUpdate: (placeId: string) => Promise<void>
  fetchDemands: (placeId: string) => void
  clearDemands: () => void
  clearSelectedPlace: () => void
  fetchPriorities: (placeId: string) => void
  fetchSupplies: (placeId: string) => void
  saveDemand: (demand: DemandDTO, demandData?: Demand) => Promise<boolean>
  removeDemand: (demandId: string) => void
  removeAllDemands: (placeId: string) => void
}

export type PanelContextProviderProps = {
  children: ReactNode
}
