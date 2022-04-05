import styled from 'styled-components'
import { useEffect, useCallback, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { usePanelContext } from 'contexts/panelContext'
import marker from 'assets/marker.svg'
import { breakpoint } from 'themes/breakpoints'
import { Place } from 'contexts/types'
import FacebookShareButton from 'components/FacebookShareButton'
import TranslatedText from 'components/TranslatedText'
import { OrganizationsMap } from './Map'
import { WrappedPlaces } from './components'
import Dialog from 'components/Dialog'

export default () => {
  const { fetchPlaces, places } = usePanelContext()
  const [groupedPlaces, setGroupedPlaces] = useState<Record<string, Place[]>>(
    {}
  )
  const [openMobileMap, setMobileMapOpened] = useState<boolean>(false)
  const mobileViewport = window.matchMedia('screen and (max-width: 992px)')
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
          content="Copotrzebne.pl - pomagamy pomagać."
        />
        <meta
          name="description"
          content="Lokalizator punktów pomocowych w twojej okolicy. Znajdź aktualne zbiórki rzeczowe i wesprzyj fundacje i prywatne firmy w niesieniu pomocy osobom uchodźczym z Ukrainy"
        />
        <meta
          property="og:description"
          content="Zobacz aktualne zbiórki rzeczowe i pomagaj z nami!"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container>
        <ContentWrapper>
          <IntroductionWrapper>
            <PageDesciption>
              <TranslatedText value="pageDescription" />
            </PageDesciption>
            <StyledFacebookButton>
              <TranslatedText value="shareActiveCollections" />
            </StyledFacebookButton>
          </IntroductionWrapper>
          {mobileViewport.matches && (
            <ShowMapButton onClick={() => setMobileMapOpened(true)}>
              <TranslatedText value="showOnMap" />
            </ShowMapButton>
          )}
          <PlacesList>
            {Object.keys(groupedPlaces).map((cityName, key) => (
              <div key={key}>
                <Title>
                  <Marker src={marker} alt="marker" />
                  {cityName}
                </Title>
                <WrappedPlaces
                  places={groupedPlaces[cityName]}
                  initialNumber={3}
                />
              </div>
            ))}
          </PlacesList>
        </ContentWrapper>
        {!mobileViewport.matches && <OrganizationsMap places={places} />}
        {mobileViewport.matches && openMobileMap && (
          <Dialog onClose={() => setMobileMapOpened(false)}>
            <OrganizationsMap places={places} />
          </Dialog>
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
  padding-bottom: 4.6rem;
  ${breakpoint.sm`
    width: 100%;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
    height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
    overflow: hidden;
    padding-bottom: 0;
  `}
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${breakpoint.sm`
    height: 100%;
    overflow-y: auto;
    padding-left: 3.2rem;
  `}
`

const IntroductionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${breakpoint.sm`
    width: 80%;
  `}
`

const Title = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.68rem;
  padding: 1rem 1.2rem 1.8rem;
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

const ShowMapButton = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.blue};
  outline: none;
  padding: 0.8rem 1.8rem;
  background-color: transparent;
  color: black;
  border-radius: 10px;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
  margin: 1.2rem;
  width: calc(100% - 2.4rem);
`

const PlacesList = styled.div`
  padding-bottom: 3.2rem;
`
