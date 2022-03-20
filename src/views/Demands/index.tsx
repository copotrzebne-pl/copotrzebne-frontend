import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import { Place } from 'contexts/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import Demand from './components/Demand'
import TranslatedText from 'components/TranslatedText'

export default () => {
  const {
    places,
    priorities,
    supplies,
    fetchPlaces,
    fetchDemands,
    fetchPriorities,
    fetchSupplies,
    saveDemand,
    clearDemands
  } = usePanelContext()
  const { id } = useParams()
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [selectedSupplyId, setSelectedSupplyId] = useState<string | null>(null)

  useEffect(() => {
    fetchPlaces()
    return clearDemands
  }, [])
  useEffect(() => {
    const place = places.filter(elem => elem.id === id)[0]
    if (place && place.id) {
      setSelectedPlace(place)
      fetchDemands(place.id)
      fetchPriorities(place.id)
      fetchSupplies(place.id)
    }
  }, [places])

  return (
    <Container>
      <PageTitle>
        <TranslatedText value="chooseCurrentDemands" />
      </PageTitle>
      <SuppliesWrapper>
        {supplies.map((supply, index) => (
          <Demand
            key={index}
            placeId={selectedPlace?.id || ''}
            supply={supply}
            priorities={priorities}
            saveDemand={saveDemand}
            isSelected={supply.id === selectedSupplyId}
            onSelected={(supplyId: string) => setSelectedSupplyId(supplyId)}
          />
        ))}
      </SuppliesWrapper>
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

const SuppliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.2rem 1.2rem 3.4rem;
`
