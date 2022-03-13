import { getRestClient } from 'clients/restClient';
import { createContext, useContext, useState, useCallback } from 'react';
import { User, UserContextValue, UserContextProviderProps } from './types'
import { API } from 'endpoints'

export const UserContext = createContext<UserContextValue | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [userValue, setUserValue] = useState<User | null>(null);
  const fetchUser = useCallback(async () => {
    const client = await getRestClient(process.env.API_URL)
    const response = await client.get<null, Record<string, string>>(API.admin.getUser)
    //TODO: set data from rest client response
    setUserValue({ email: '', id: '' });
  }, [])

  return (<UserContext.Provider value={{
    user: userValue,
    fetchUser
  }}>{children}</UserContext.Provider>)
}


export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('You are outside UserContext! Make sure components are wrapped in proper provider.');
  }

  return ctx;
};