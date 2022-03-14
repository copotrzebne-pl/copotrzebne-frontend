import styled from 'styled-components'
import { useEffect } from 'react'
import { usePanelContext } from 'contexts/panelContext'
import { PlaceBox } from './components'

export default () => {
  const { fetchPlaces, places } = usePanelContext()
  useEffect(() => {
    fetchPlaces()
  }, [])

  return (
    <Container>
      <Title>copotrzebne.pl</Title>
      <PlacesWrapper>
        {places.map((place, index) => (
          <PlaceBox key={index} place={place} />
        ))}
      </PlacesWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.span`
  display: inline-block;
  font-size: 1.2rem;
`

const PlacesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2.3rem;
  width: 100%;
`
