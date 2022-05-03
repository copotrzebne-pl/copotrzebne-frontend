import styled from 'styled-components'
import { useEffect, useState } from 'react'

import PageTitle from 'components/PageTitle'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { Subtitle } from '../../components/Subtitle'
import AnnouncementForm from './AnnouncementForm'
import Announcement from './Announcement'
import { usePanelContext } from '../../contexts/panelContext'
import { Place } from '../../contexts/types'
import { useInternalAnnouncementsContext } from '../../contexts/internalAnnouncementsContext'

export default () => {
  const [placesIdsMap, setPlacesIdsMap] = useState<Record<string, Place>>({})
  const { announcements, fetchAnnouncements } =
    useInternalAnnouncementsContext()
  const { places, fetchPlaces } = usePanelContext()

  useEffect(() => {
    fetchPlaces()
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    if (places && places.length > 0) {
      const castedPlaces = places as (Place & { id: string })[]
      const pIdMap = castedPlaces.reduce<
        Record<string, Place & { id: string }>
      >((acc, p) => {
        acc[p.id] = p
        return acc
      }, {})
      setPlacesIdsMap(pIdMap)
    }
  }, [places, announcements])

  return (
    <>
      <Container>
        <PageTitle hasBackIcon={false}>
          <TranslatedText value="internalAnnouncementsTitle" />
        </PageTitle>
        <Subtitle>
          <TranslatedText value="internalAnnouncementsSubtitle" />
          <br />
          <br />
          <TranslatedText value="internalAnnouncementsSubtitle2" />
        </Subtitle>
      </Container>
      <AnnouncementForm />
      <AnnouncementsList>
        {announcements.map(a => (
          <Announcement
            key={`ia_${a.id}`}
            announcement={a}
            place={placesIdsMap[a.placeId]}
          />
        ))}
      </AnnouncementsList>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  ${breakpoint.sm`
    max-width: 700px;
    margin: 0 auto;
  `}
`

const AnnouncementsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 2rem 2.2rem;
  box-sizing: border-box;

  ${breakpoint.sm`
      width: 100%;
      margin: 2rem auto;
      max-width: 700px;
  `}
`
