import { createContext, ReactNode, useContext, useState } from 'react'

import { InternalAnnouncement, PublicAnnouncement } from '../types/types'
import { getRestClient } from '../clients/restClient'
import { API } from '../endpoints'

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

type AnnouncementsContextValue = {
  isFormVisible: boolean
  setFormVisible: (value: boolean) => void
  setFormValue: (key: keyof InternalAnnouncementDto, value: string) => void
  formData: InternalAnnouncementDto
  saveAnnouncement: () => Promise<void>
  error: string
  fetchAnnouncements: () => Promise<void>
  internalAnnouncements: InternalAnnouncement[]
  publicAnnouncements: PublicAnnouncement[]
  submitComment: (commentDto: CommentDto) => Promise<void>
  currentAnnouncementsType: 'internal' | 'public'
  setCurrentAnnouncementsType: (t: 'internal' | 'public') => void
  resetContext: () => void
}

export const AnnouncementsContext =
  createContext<AnnouncementsContextValue>(null)

export const AnnouncementsContextProvider = ({
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
  const [internalAnnouncements, setInternalAnnouncements] = useState<
    InternalAnnouncement[]
  >([])

  const [publicAnnouncements, setPublicAnnouncements] = useState<
    PublicAnnouncement[]
  >([])

  const [currentAnnouncementsType, setCurrentAnnouncementsType] = useState<
    'internal' | 'public'
  >('internal')

  const setFormValue = (key: keyof InternalAnnouncementDto, value: string) => {
    setError('')

    setFormData({
      ...formData,
      [key]: value
    })
  }

  const resetContext = () => {
    setFormData({
      title: '',
      message: '',
      contactInfo: '',
      placeId: '',
      startDate: '',
      endDate: ''
    })

    setError('')

    setFormVisible(false)

    setInternalAnnouncements([])

    setPublicAnnouncements([])
  }

  const saveAnnouncement = async () => {
    const client = await getRestClient(process.env.API_URL)
    setError('')

    const dto = {
      title: formData.title,
      message: formData.message,
      contactInfo: formData.contactInfo,
      placeId: formData.placeId,
      startDate:
        currentAnnouncementsType === 'internal'
          ? formData.startDate
          : undefined,
      endDate:
        currentAnnouncementsType === 'internal' ? formData.endDate : undefined
    }

    const endpoint =
      currentAnnouncementsType === 'internal'
        ? API.panel.internalAnnouncements
        : API.panel.publicAnnouncements

    try {
      await client.post(endpoint, dto)
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
      const announcementsInternal = (await client.get(
        API.panel.internalAnnouncements
      )) as InternalAnnouncement[]

      const announcementsPublic = (await client.get(
        API.panel.publicAnnouncements
      )) as PublicAnnouncement[]

      setInternalAnnouncements(announcementsInternal)
      setPublicAnnouncements(announcementsPublic)
    } catch (e) {
      console.error(e)
    }
  }

  const submitComment = async (commentDto: CommentDto) => {
    const client = await getRestClient(process.env.API_URL)

    await client.post(API.panel.internalAnnouncementsComment, commentDto)
  }

  return (
    <AnnouncementsContext.Provider
      value={{
        isFormVisible,
        setFormVisible,
        setFormValue,
        formData,
        saveAnnouncement,
        fetchAnnouncements,
        error,
        submitComment,
        internalAnnouncements,
        publicAnnouncements,
        currentAnnouncementsType,
        setCurrentAnnouncementsType,
        resetContext
      }}
    >
      {children}
    </AnnouncementsContext.Provider>
  )
}

export const useAnnouncementsContext = () => {
  const ctx = useContext(AnnouncementsContext)
  if (!ctx) {
    throw new Error(
      'You are outside InternalAnnouncementsContext! Make sure components are wrapped in proper provider.'
    )
  }

  return ctx
}
