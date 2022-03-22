import { createContext, useContext, useState, useCallback } from 'react'
import {
  PanelContextValue,
  PanelContextProviderProps,
  Place,
  Demand,
  Supply,
  Priority,
  DemandDTO
} from './types'
import { API } from 'endpoints'
import { getRestClient } from 'clients/restClient'

export const PanelContext = createContext<PanelContextValue | null>(null)

export const PanelContextProvider = ({
  children
}: PanelContextProviderProps) => {
  const [places, setPlaces] = useState<Place[]>([])
  const [demands, setDemands] = useState<Demand[]>([])
  const [supplies, setSupplies] = useState<Supply[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [errors, setError] = useState<Record<string, string>>({})

  const fetchPlaces = useCallback(async () => {
    try {
      const client = await getRestClient(process.env.API_URL)
      const response = await client.get<null, Record<string, string>>(
        API.panel.getPlaces
      )
      Array.isArray(response) ? setPlaces(response) : setPlaces([])
    } catch {
      setError({ ...errors, places: 'Fetching places error' })
    }
  }, [errors])

  const fetchDemands = useCallback(
    async (placeId: string) => {
      try {
        const client = await getRestClient(process.env.API_URL)
        const response = await client.get<null, Demand>(
          API.panel.getPlaceDemands.replace(':id', placeId)
        )
        Array.isArray(response) ? setDemands(response) : setDemands([])
      } catch {
        setError({ ...errors, demands: 'Fetching demands error' })
      }
    },
    [errors]
  )

  const clearDemands = useCallback(() => {
    setDemands([])
  }, [])

  const fetchPriorities = useCallback(async () => {
    try {
      const client = await getRestClient(process.env.API_URL)
      const response = await client.get<null, Record<string, string>>(
        API.panel.priorities
      )
      Array.isArray(response) ? setPriorities(response) : setPriorities([])
    } catch {
      setError({ ...errors, places: 'Fetching priorities error' })
    }
  }, [])

  const fetchSupplies = useCallback(async () => {
    try {
      const client = await getRestClient(process.env.API_URL)
      const response = await client.get<null, Supply>(API.panel.supplies)
      Array.isArray(response) ? setSupplies(response) : setSupplies([])
    } catch {
      setError({ ...errors, places: 'Fetching priorities error' })
    }
  }, [])

  const saveDemand = useCallback(
    async (demand: DemandDTO): Promise<boolean> => {
      try {
        const client = await getRestClient(process.env.API_URL)
        await client.post<null, Supply>(API.panel.saveDemand, demand)
        return Promise.resolve(true)
      } catch {
        setError({ ...errors, places: 'Fetching priorities error' })
        return Promise.reject(false)
      }
    },
    []
  )

  const removeDemand = useCallback(
    async (demandId: string) => {
      try {
        const client = await getRestClient(process.env.API_URL)
        setDemands(demands.filter(demand => demand.id !== demandId))
        await client.delete<null, null>(
          API.panel.removeDemand.replace(':id', demandId)
        )
      } catch {
        setError({ ...errors, demands: 'Remove demands error' })
      }
    },
    [demands]
  )

  const removeAllDemands = useCallback(async (placeId: string) => {
    try {
      const client = await getRestClient(process.env.API_URL)
      setDemands([])
      await client.delete<null, null>(
        API.panel.removeAllDemands.replace(':id', placeId)
      )
    } catch {
      setError({ ...errors, demands: 'Remove demands error' })
      return Promise.reject(false)
    }
  }, [])

  return (
    <PanelContext.Provider
      value={{
        places,
        demands,
        fetchDemands,
        fetchPlaces,
        clearDemands,
        supplies,
        priorities,
        fetchPriorities,
        fetchSupplies,
        saveDemand,
        removeAllDemands,
        removeDemand
      }}
    >
      {children}
    </PanelContext.Provider>
  )
}

export const usePanelContext = () => {
  const ctx = useContext(PanelContext)
  if (!ctx) {
    throw new Error(
      'You are outside PanelContext! Make sure components are wrapped in proper provider.'
    )
  }

  return ctx
}
