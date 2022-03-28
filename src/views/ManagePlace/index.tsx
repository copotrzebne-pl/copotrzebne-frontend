import { useEffect, useState } from 'react'
import Button from 'components/Button'
import PageTitle from 'components/PageTitle'
import { Place } from 'contexts/types'
import { useUserContext } from 'contexts/userContext'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { Page, routes } from '../../routes'
import { useNavigate } from 'react-router-dom'

export default () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { ownedPlaces, fetchOwnedPlaces, savePlace } = useUserContext()
  const [selectedPlace, setSelectedPlace] = useState<Place>({
    id,
    name: '',
    city: '',
    street: '',
    buildingNumber: '',
    apartment: '',
    comment: '',
    email: '',
    phone: '',
    latitude: null,
    longitude: null
  })

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  useEffect(() => {
    const place = ownedPlaces.filter(elem => elem.id === id)[0]
    if (place) {
      setSelectedPlace(place)
    }
  }, [ownedPlaces])

  return (
    <Container>
      <PageTitle>{selectedPlace?.name || 'Dodaj nowe miejsce'}</PageTitle>
      <StyledButton
        onClick={() =>
          navigate(
            routes[Page.MANAGE_ADDRESS].replace(':id', selectedPlace.id || '')
          )
        }
      >
        <TranslatedText value="editPlaceData" />
      </StyledButton>
      <StyledButton
        onClick={() =>
          navigate(
            routes[Page.MANAGE_DEMANDS].replace(':id', selectedPlace.id || '')
          )
        }
      >
        <TranslatedText value="addDemands" />
      </StyledButton>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const StyledButton = styled(Button)`
  width: auto;
  margin: 1.2rem 2.2rem;
  padding: 0.8rem 1.8rem;
`