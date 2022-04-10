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
                  initialNumber={4}
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
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  padding-bottom: 4.6rem;
  ${breakpoint.sm`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
    margin: 0 auto;
    padding-bottom: 0;
    overflow: hidden;
  `}
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${breakpoint.sm`
    height: 100%;
    overflow-y: auto;
  `}
`

const IntroductionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -15px;
  padding: 3em 1.5em 2.1em 1.5em;
  background-color: #f3f3f3;
  border-radius: 10px;
  ${breakpoint.sm`
    width: 100%;
  `}
`

const Title = styled.span`
  display: flex;
  align-items: center;
  padding: 1rem 1.2rem 1.8rem;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.68rem;
  font-weight: 500;
`

const Marker = styled.img`
  display: inline-block;
  width: auto;
  height: 25px;
  margin-right: 0.7rem;
  margin-bottom: 2px;
`

const PageDesciption = styled.div`
  width: 100%;
  max-width: 600px;
  font-weight: 500;
  font-size: 17px;
  text-align: center;
  line-height: 1.5;
`

const StyledFacebookButton = styled(FacebookShareButton)`
  width: calc(100% - 2.4rem);
  max-width: 500px;
  margin-top: 1.2em;
  cursor: pointer;
`

const ShowMapButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 500px;
  width: calc(100% - 2.4rem);
  height: 48px;
  margin: 1.5em auto;
  padding: 0.8rem 1.8rem;
  outline: none;
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: black;
  font-size: 0.85rem;
  font-weight: 500;
`

const PlacesList = styled.div`
  padding: 1em 1em 2.1em 1em;
`
