import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode
} from 'react'
import { RequestPlaceContextValue, Place, DraftPlaceDto } from './types'
import { API } from 'endpoints'
import { getRestClient } from 'clients/restClient'

export const RequestPlaceContext =
  createContext<RequestPlaceContextValue | null>(null)

export const RequestPlaceContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isPlaceCreated, setPlaceCreated] = useState<boolean>(false)
  const [place, setPlace] = useState<DraftPlaceDto>({
    name: {},
    city: '',
    street: '',
    buildingNumber: '',
    apartment: '',
    additionalDescription: '',
    email: '',
    phone: '',
    workingHours: '',
    bankAccount: ''
  })
  const [userEmail, setUserEmail] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const setPlaceValue: RequestPlaceContextValue['setPlaceValue'] = useCallback(
    (key, value) => {
      setError(null)
      setPlace({ ...place, [key]: value })
    },
    [place, setPlace, setError]
  )

  const savePlace = useCallback(async () => {
    const client = await getRestClient(process.env.API_URL)

    try {
      const placeFormatted = {
        name: place.name,
        street: place.street,
        buildingNumber: place.buildingNumber,
        city: place.city,

        userEmail: userEmail.trim(),

        apartment: place.apartment || undefined,
        comment: place.additionalDescription || undefined,
        email: place.email || undefined,
        phone: place.phone || undefined,
        bankAccount: place.bankAccount || undefined,
        workingHours: place.workingHours || undefined,
        placeLink: place.placeLink || undefined
      }

      console.log(placeFormatted)

      await client.post<null, Place>(
        `${API.panel.saveDraftPlace}`,
        placeFormatted
      )

      setPlaceCreated(true)
    } catch {
      console.error('Error: place draft save error')
      setError('requestPlaceFailed')
      return
    }
  }, [setPlace, setPlaceCreated, place, userEmail])

  return (
    <RequestPlaceContext.Provider
      value={{
        place,
        setPlaceValue,
        savePlace,
        userEmail,
        setUserEmail,
        error,
        setError,
        isPlaceCreated
      }}
    >
      {children}
    </RequestPlaceContext.Provider>
  )
}

export const useRequestPlaceContext = () => {
  const ctx = useContext(RequestPlaceContext)
  if (!ctx) {
    throw new Error(
      'You are outside RequestPlaceContext! Make sure components are wrapped in proper provider.'
    )
  }

  return ctx
}
