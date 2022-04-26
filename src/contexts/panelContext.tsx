import { createContext, useContext, useState, useCallback } from 'react'
import omit from 'lodash.omit'
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
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [demands, setDemands] = useState<Demand[]>([])
  const [supplies, setSupplies] = useState<Supply[]>([])
  const [priorities, setPriorities] = useState<Priority[]>([])
  const [errors, setError] = useState<Record<string, string>>({})
  const [selectedSupplies, setSelectedSupplies] = useState<
    Record<string, Supply>
  >({})

  const fetchPlaces = useCallback(async () => {
    try {
      const client = await getRestClient(process.env.API_URL)
      const suppliesKeys = Object.keys(selectedSupplies)
      const response = await client.get<null, Place[]>(
        `${API.panel.getPlaces}${
          suppliesKeys.length > 0 ? `?supplyId=${suppliesKeys.join(',')}` : ''
        }`
      )
      const placesWithUrgentDemands = response.map(val => ({
        ...val,
        urgentDemands: (val.demands || []).filter(
          demand => demand.priority.importance === 2
        )
      }))
      setPlaces(placesWithUrgentDemands)
    } catch {
      setError({ ...errors, places: 'Fetching places error' })
    }
  }, [errors, selectedSupplies])

  const fetchPlace = useCallback(
    async (placeId: string) => {
      try {
        const client = await getRestClient(process.env.API_URL)
        const response = await client.get<null, Place>(
          API.panel.getPlace.replace(':id', placeId)
        )
        setSelectedPlace(response)
      } catch {
        setError({ ...errors, places: 'Fetching places error' })
      }
    },
    [errors]
  )

  const clearSelectedPlace = useCallback(async () => {
    setSelectedPlace(null)
  }, [])

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
    async (demandDto: DemandDTO): Promise<boolean> => {
      try {
        const client = await getRestClient(process.env.API_URL)
        const response = demandDto.id
          ? await client.patch<null, Demand>(
              API.panel.editDemand.replace(':id', demandDto.id),
              omit(demandDto, ['id'])
            )
          : await client.post<null, Demand>(API.panel.saveDemand, demandDto)

        setDemands(demandsList => [
          ...demandsList.filter(demand => demand?.id !== response.id),
          response
        ])
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

  const updatePlaceLastUpdate = useCallback(
    async (placeId: string): Promise<void> => {
      try {
        const client = await getRestClient(process.env.API_URL)

        const response = await client.patch<null, Place>(
          `${API.panel.savePlace}/${placeId}`,
          { lastUpdatedAt: new Date().toISOString() }
        )
        setSelectedPlace(response)
      } catch {
        setError({ ...errors, places: 'Update place last updated at failed' })
        return Promise.reject(false)
      }
    },
    []
  )

  return (
    <PanelContext.Provider
      value={{
        places,
        selectedPlace,
        demands,
        supplies,
        priorities,
        selectedSupplies,
        fetchDemands,
        fetchPlaces,
        fetchPlace,
        updatePlaceLastUpdate,
        clearDemands,
        clearSelectedPlace,
        fetchPriorities,
        fetchSupplies,
        saveDemand,
        removeAllDemands,
        removeDemand,
        setSelectedSupplies
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
