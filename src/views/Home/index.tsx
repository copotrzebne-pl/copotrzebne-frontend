import styled from 'styled-components'
import { useEffect, useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { usePanelContext } from 'contexts/panelContext'
import { PlaceBox } from 'components/PlaceBox'
import marker from 'assets/marker.svg'
import { Page, routes } from 'routes'
import { Link } from 'react-router-dom'
import { breakpoint } from 'themes/breakpoints'
import { Place } from 'contexts/types'
import FacebookShareButton from 'components/FacebookShareButton'
import TranslatedText from 'components/TranslatedText'

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
    <>
      <Helmet>
        <title>
          Copotrzebne.pl - pomagamy pomagać. Razem dla Ukrainy. Strona główna
        </title>
        <meta
          property="og:title"
          content="Copotrzebne.pl - pomagamy pomagać. Razem dla Ukrainy. Strona główna"
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
        <PageDesciption>
          <TranslatedText value="pageDescription" />
        </PageDesciption>
        <StyledFacebookButton>
          <TranslatedText value="shareActiveCollections" />
        </StyledFacebookButton>
        {Object.keys(groupedPlaces).map((cityName, key) => (
          <div key={key}>
            <Title>
              <Marker src={marker} alt="marker" />
              {cityName}
            </Title>
            <PlacesWrapper>
              {groupedPlaces[cityName].map((place, index) => (
                <StyledLink
                  to={`${routes[Page.PLACE]}/${place.id}`}
                  key={index}
                >
                  <PlaceBox place={place} />
                </StyledLink>
              ))}
            </PlacesWrapper>
          </div>
        ))}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  padding-bottom: 4.6rem;
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

const PageDesciption = styled.div`
  width: 100%;
  padding: 3.2rem 1.2rem 0;
  font-weight: 500;
`

const StyledFacebookButton = styled(FacebookShareButton)`
  margin: 1.2rem;
  width: calc(100% - 2.4rem);
  cursor: pointer;
`
