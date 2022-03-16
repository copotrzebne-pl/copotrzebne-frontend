import { createContext, useContext, useState, useCallback } from 'react'
import {
  PanelContextValue,
  PanelContextProviderProps,
  Place,
  Demand
} from './types'
import { API } from 'endpoints'
import { getRestClient } from 'clients/restClient'

export const PanelContext = createContext<PanelContextValue | null>(null)

export const PanelContextProvider = ({
  children
}: PanelContextProviderProps) => {
  const [places, setPlaces] = useState<Place[]>([])
  const [demands, setDemands] = useState<Demand[]>([])
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
        const response = await client.get<null, Record<string, string>>(
          API.panel.getPlaceDemands.replace(':id', placeId)
        )
        Array.isArray(response) ? setDemands(response) : setDemands([])
      } catch {
        setError({ ...errors, places: 'Fetching demands error' })
      }
    },
    [errors]
  )

  const clearDemands = useCallback(() => {
    setDemands([])
  }, [])

  return (
    <PanelContext.Provider
      value={{
        places,
        demands,
        fetchDemands,
        fetchPlaces,
        clearDemands
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
