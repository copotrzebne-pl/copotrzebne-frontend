import { createContext, useContext, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, UserContextValue, UserContextProviderProps } from './types'
import { API } from 'endpoints'
import { getRestClient } from 'clients/restClient'
import { Page, routes } from 'routes'

export const UserContext = createContext<UserContextValue | null>(null)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userValue, setUserValue] = useState<User | null>(null)
  const [errors, setError] = useState<Record<string, string>>({})
  const navigate = useNavigate()
  const login = useCallback(
    async (userLogin: string, password: string) => {
      try {
        const client = await getRestClient(process.env.API_URL)
        const response = await client.post<null, Record<string, string>>(
          API.panel.login,
          { login: userLogin, password }
        )
        window.localStorage.setItem('_token', response.jwt)
        navigate(routes[Page.PANEL])
      } catch {
        setError({ ...errors, login: 'Błąd logowania' })
      }
    },
    [errors, navigate]
  )
  const fetchUser = useCallback(async () => {
    //TODO: provider valid API URL and fetch user data
    // const client = await getRestClient(process.env.API_URL)
    // const response = await client.get<null, Record<string, string>>(
    //   API.panel.getUser
    // )
    //TODO: set data from rest client response
    setUserValue({ email: '', id: '' })
  }, [])

  return (
    <UserContext.Provider
      value={{
        user: userValue,
        fetchUser,
        login
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error(
      'You are outside UserContext! Make sure components are wrapped in proper provider.'
    )
  }

  return ctx
}
