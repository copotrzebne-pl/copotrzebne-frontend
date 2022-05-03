import { createContext, ReactNode, useContext, useState } from 'react'
import { Place } from './types'
import { InternalAnnouncement } from '../types/types'
import { getRestClient } from '../clients/restClient'
import { API } from '../endpoints'
import { PanelContext } from './panelContext'

type InternalAnnouncementDto = {
  title: string
  message: string
  contactInfo: string
  placeId: string
  startDate: string
  endDate: string
}

type CommentDto = {
  internalAnnouncementId: string
  message: string
}

type InternalAnnouncementsContextValue = {
  isFormVisible: boolean
  setFormVisible: (value: boolean) => void
  setFormValue: (key: keyof InternalAnnouncementDto, value: string) => void
  formData: InternalAnnouncementDto
  saveAnnouncement: () => Promise<void>
  error: string
  ownedPlaces: Place[]
  setOwnedPlaces: (places: Place[]) => void
  fetchAnnouncements: () => Promise<void>
  announcements: InternalAnnouncement[]
  submitComment: (commentDto: CommentDto) => Promise<void>
}

export const InternalAnnouncementsContext =
  createContext<InternalAnnouncementsContextValue>(null)

export const InternalAnnouncementsContextProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [isFormVisible, setFormVisible] = useState<boolean>(false)
  const [formData, setFormData] = useState<InternalAnnouncementDto>({
    title: '',
    message: '',
    contactInfo: '',
    placeId: '',
    startDate: '',
    endDate: ''
  })
  const [error, setError] = useState<string>('')
  const [ownedPlaces, setOwnedPlaces] = useState<Place[]>([])
  const [announcements, setAnnouncements] = useState<InternalAnnouncement[]>([])

  const setFormValue = (key: keyof InternalAnnouncementDto, value: string) => {
    setError('')

    setFormData({
      ...formData,
      [key]: value
    })
  }

  const saveAnnouncement = async () => {
    const client = await getRestClient(process.env.API_URL)
    setError('')

    try {
      await client.post(API.panel.internalAnnouncements, formData)
      setFormData({
        title: '',
        message: '',
        contactInfo: '',
        placeId: '',
        startDate: '',
        endDate: ''
      })
      await fetchAnnouncements()
    } catch (error) {
      setError('failedToCreateAnnouncement')
      throw error
    }
  }

  const fetchAnnouncements = async () => {
    const client = await getRestClient(process.env.API_URL)

    try {
      const data = await client.get<InternalAnnouncement[]>(
        API.panel.internalAnnouncementsActive
      )

      console.log('DATA', data)
      setAnnouncements(data)
    } catch (e) {
      console.error(e)
    }
  }

  const submitComment = async (commentDto: CommentDto) => {
    const client = await getRestClient(process.env.API_URL)

    await client.post(API.panel.internalAnnouncementsComment, commentDto)
  }

  return (
    <InternalAnnouncementsContext.Provider
      value={{
        isFormVisible,
        setFormVisible,
        setFormValue,
        formData,
        saveAnnouncement,
        fetchAnnouncements,
        setOwnedPlaces,
        ownedPlaces,
        error,
        submitComment,
        announcements
      }}
    >
      {children}
    </InternalAnnouncementsContext.Provider>
  )
}

export const useInternalAnnouncementsContext = () => {
  const ctx = useContext(InternalAnnouncementsContext)
  if (!ctx) {
    throw new Error(
      'You are outside InternalAnnouncementsContext! Make sure components are wrapped in proper provider.'
    )
  }

  return ctx
}
