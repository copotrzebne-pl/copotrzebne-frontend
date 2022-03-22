import { useState, useEffect, useCallback } from 'react'
import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import format from 'date-fns/format'

import marker from 'assets/marker.svg'
import { Place, Demand } from 'contexts/types'
import { breakpoint } from 'themes/breakpoints'
import FacebookShareButton from 'components/FacebookShareButton'
import { Helmet } from 'react-helmet-async'
import TranslatedEntry from 'components/TranslatedEntry'
import TranslatedText from 'components/TranslatedText'
import { SUPPLIES_CATEGORIES_ORDER } from 'utils/supplies'

export default () => {
  const { fetchPlaces, fetchDemands, clearDemands, places, demands } =
    usePanelContext()
  const [lastTimeUpdated, setLastTimeUpdated] = useState<string>('')
  const { id } = useParams()
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [groupedDemands, setGroupedDemands] = useState<
    Record<string, Demand[]>
  >({})

  const groupDemands = useCallback(
    (): Record<string, Demand[]> =>
      demands.reduce(
        (acc, item) => (
          (acc[item.supply.category.nameEn] = [
            ...(acc[item.supply.category.nameEn] || []),
            item
          ]),
          acc
        ),
        {} as Record<string, Demand[]>
      ),
    [demands]
  )

  useEffect(() => {
    fetchPlaces()
    return clearDemands
  }, [])

  useEffect(() => {
    const place = places.filter(elem => elem.id === id)[0]
    if (place && place.id) {
      setSelectedPlace(place)
      fetchDemands(place.id)
    }
  }, [places])

  useEffect(() => {
    const sortedDates = demands
      .map(demand => demand.updatedAt)
      .sort((dateA, dateB) =>
        Math.abs(new Date(dateB).getTime() - new Date(dateA).getTime())
      )
    if (sortedDates[0]) {
      setLastTimeUpdated(format(Date.parse(sortedDates[0]), 'd. MMM Y H:m'))
    }
    setGroupedDemands(groupDemands())
  }, [demands])

  return (
    <>
      <Helmet>
        <title>Copotrzebne.pl - pomagamy pomagać</title>
        <meta
          property="og:title"
          content="Copotrzebne.pl - pomagamy pomagać. Razem dla Ukrainy."
        />
        <meta
          name="description"
          content="Lokalizator punktów pomocowych w twojej okolicy. Znajdź aktualne zbiórki rzeczowe i wesprzyj fundacje i prywatne firmy w niesieniu pomocy osobom uchodźczym z Ukrainy"
        />
        <meta
          property="og:description"
          content="Lokalizator punktów pomocowych w twojej okolicy. Znajdź aktualne zbiórki rzeczowe i wesprzyj fundacje i prywatne firmy w niesieniu pomocy osobom uchodźczym z Ukrainy"
        />
      </Helmet>
      <Container>
        {selectedPlace !== null && (
          <PlaceDetails>
            <PageTitle>{selectedPlace?.name}</PageTitle>
            <PlaceDetailsWrapper>
              {selectedPlace?.comment && (
                <PlaceDescription>{selectedPlace?.comment}</PlaceDescription>
              )}
              <DetailsRow>
                <PlaceAddressWrapper
                  target="_blank"
                  href={`https://www.google.com/maps/place/${selectedPlace?.street}+${selectedPlace?.buildingNumber}+${selectedPlace?.city}`}
                >
                  <MapLocation>
                    <Marker src={marker} alt="marker" />
                  </MapLocation>
                  <PlaceAddress>
                    <span>
                      {selectedPlace.street || ''}{' '}
                      {selectedPlace.buildingNumber || ''}
                      {selectedPlace.apartment
                        ? `/${selectedPlace.apartment}`
                        : ''}
                    </span>
                    <span>{selectedPlace?.city}</span>
                  </PlaceAddress>
                </PlaceAddressWrapper>
                <LastUpdate>
                  <span>
                    <TranslatedText value="lastUpdate" />
                  </span>
                  <h3>{lastTimeUpdated ? lastTimeUpdated : '---'}</h3>
                </LastUpdate>
              </DetailsRow>
            </PlaceDetailsWrapper>
          </PlaceDetails>
        )}
        <StyledFacebookButton>
          <TranslatedText value="shareThisOrganizationCollection" />
        </StyledFacebookButton>
        {selectedPlace !== null && demands.length > 0 && (
          <DemandsWrapper>
            <DemandsListTitle>
              <TranslatedText value="demandsList" />
            </DemandsListTitle>
            <DemandsList>
              {[
                ...SUPPLIES_CATEGORIES_ORDER,
                ...Object.keys(groupedDemands).filter(
                  nameEn => !SUPPLIES_CATEGORIES_ORDER.includes(nameEn)
                )
              ].map((nameEn, key) => {
                if (!groupedDemands[nameEn]) return null
                return (
                  <div key={key}>
                    <CategoryHeader>
                      <TranslatedEntry
                        entry={groupedDemands[nameEn][0].supply?.category}
                      />
                    </CategoryHeader>
                    {groupedDemands[nameEn].map((demand, index) => (
                      <DemandComponent key={index}>
                        <div>
                          <DemandInfo>
                            <span>
                              <TranslatedEntry entry={demand?.supply} />
                            </span>
                            <TranslatedEntry entry={demand?.priority} />
                          </DemandInfo>
                          {demand?.comment && (
                            <DemandComment>{demand?.comment}</DemandComment>
                          )}
                        </div>
                      </DemandComponent>
                    ))}
                  </div>
                )
              })}
            </DemandsList>
          </DemandsWrapper>
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
`

const PlaceDetails = styled.div`
  width: calc(100% - 0.8rem);
  display: flex;
  flex-direction: column;
  margin: 0 0.4rem;
  background-color: rgba(199, 199, 199, 0.1);
  padding: 1rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  `}
`
const PlaceDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 0 1.2rem;
  padding-bottom: 1rem;
`

const PlaceDescription = styled.p`
  display: inline-block;
  text-align: left;
  line-height: 1.4;
  width: 100%;
  color: #999999;
  font-size: 0.76rem;
  font-weight: 400;
  margin-bottom: 1rem;
  overflow-wrap: break-word;
`

const PlaceAddressWrapper = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Marker = styled.img`
  height: 30px;
  width: auto;
  display: inline-block;
  margin-right: 0.7rem;
`

const MapLocation = styled.a`
  width: auto;
`

const PlaceAddress = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: #8d99b2;
    font-size: 0.7rem;
    font-weight: 400;
    margin: 0.1rem 0;
  }
`

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const LastUpdate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  span {
    color: #8d99b2;
    font-size: 0.7rem;
    font-weight: 400;
    margin: 0.1rem 0;
  }

  h3 {
    color: #8d99b2;
    font-size: 0.78rem;
    font-weight: 500;
    margin: 0.1rem 0;
  }
`

const DemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.2rem 1.2rem 3.2rem;
  width: 100%;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const DemandsListTitle = styled.h4`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: #333333;
`

const DemandsList = styled.ol`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1.2rem;
`

const DemandComponent = styled.li`
  margin: 0.6rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid #999;

  & > span {
    color: #999;
  }

  & > b {
    color: #333;
    font-weight: 600;
  }
`

const DemandInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: #333333;
  }
`

const DemandComment = styled.div`
  margin-top: 0.2rem;
  color: #999999;
`

const StyledFacebookButton = styled(FacebookShareButton)`
  margin: 1.2rem;
  width: calc(100% - 2.4rem);
  cursor: pointer;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 1.2rem auto;
  `}
`

const CategoryHeader = styled.span`
  display: flex;
  width: 100%;
  padding: 0.6rem 0.6rem;
  margin: 0.8rem 0;
  background-color: #eeeeee;
  color: #333333;

  border-radius: 6px;
  font-size: 0.95rem;
  border: 2px solid ${({ theme }) => theme.colors.blue};
`
