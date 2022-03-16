import styled from 'styled-components'
import { useEffect } from 'react'
import { usePanelContext } from 'contexts/panelContext'
import { PlaceBox } from './components'
import marker from 'assets/marker.svg'
import { Page, routes } from 'routes'
import { Link } from 'react-router-dom'

export default () => {
  const { fetchPlaces, places } = usePanelContext()
  useEffect(() => {
    fetchPlaces()
  }, [])

  return (
    <Container>
      <Title>
        <Marker src={marker} alt="marker" />
        Kraków
      </Title>
      <PlacesWrapper>
        {places.map((place, index) => (
          <Link to={`${routes[Page.PLACE]}/${place.id}`}>
            <PlaceBox key={index} place={place} />
          </Link>
        ))}
      </PlacesWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
`

const Title = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.68rem;
  padding: 2.6rem 1.2rem 1.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`

const Marker = styled.img`
  height: 25px;
  width: auto;
  display: inline-block;
  margin-right: 0.7rem;
  margin-bottom: 2px;
`

const PlacesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  padding-bottom: 2.2rem;
`
