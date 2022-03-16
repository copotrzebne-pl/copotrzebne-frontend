import styled from 'styled-components'
import { useEffect, useCallback, useState } from 'react'
import { usePanelContext } from 'contexts/panelContext'
import { PlaceBox } from './components'
import marker from 'assets/marker.svg'
import { Page, routes } from 'routes'
import { Link } from 'react-router-dom'
import { breakpoint } from 'themes/breakpoints'
import { Place } from 'contexts/types'

export default () => {
  const { fetchPlaces, places } = usePanelContext()
  const [groupedPlaces, setGroupedPlaces] = useState<Record<string, Place[]>>(
    {}
  )
  useEffect(() => {
    fetchPlaces()
  }, [])

  useEffect(() => {
    setGroupedPlaces(groupPlaces())
  }, [places])

  const groupPlaces = useCallback(
    (): Record<string, Place[]> =>
      places.reduce(
        (acc, item) => (
          (acc[item.city] = [...(acc[item.city] || []), item]), acc
        ),
        {} as Record<string, Place[]>
      ),
    [places]
  )

  return (
    <Container>
      {Object.keys(groupedPlaces).map(cityName => (
        <>
          <Title>
            <Marker src={marker} alt="marker" />
            {cityName}
          </Title>
          <PlacesWrapper>
            {groupedPlaces[cityName].map((place, index) => (
              <StyledLink to={`${routes[Page.PLACE]}/${place.id}`}>
                <PlaceBox key={index} place={place} />
              </StyledLink>
            ))}
          </PlacesWrapper>
        </>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
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
  ${breakpoint.sm`
    padding-bottom: 1.2rem;
  `}
`

const StyledLink = styled(Link)`
  width: 100%;
`
