import { useEffect, useState } from 'react'
import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import styled, { keyframes } from 'styled-components'
import { useParams } from 'react-router-dom'
import format from 'date-fns/format'
import { breakpoint } from 'themes/breakpoints'
import FacebookShareButton from 'components/FacebookShareButton'
import TranslatedEntry from 'components/TranslatedEntry'
import TranslatedText from 'components/TranslatedText'
import { useTextTransformToHTML } from 'hooks/useTextTransformToHTML'
import { useGroupDemands } from 'hooks/useGroupDemands'
import mapPlaceholderUrl from 'assets/map-background.svg'
import { translations } from 'translations'
import { useUserContext } from 'contexts/userContext'
import { getTranslation } from 'utils/translation'
import { ReactComponent as FbIcon } from 'assets/facebook-small-icon.svg'
import { ReactComponent as WebsiteIcon } from 'assets/website-icon.svg'
import Dialog from 'components/Dialog'
import { CollapsableSection } from './components'

export default () => {
  const [faqDialogOpened, setFaqDialogOpened] = useState<boolean>(false)
  const { selectedPlace, fetchPlace, clearSelectedPlace } = usePanelContext()
  const { language } = useUserContext()
  const { idOrSlug } = useParams()
  const formattedPlaceDescription = useTextTransformToHTML(
    selectedPlace?.additionalDescription || ''
  )
  const formattedBankAccountDetails = useTextTransformToHTML(
    selectedPlace?.bankAccount || ''
  )
  const { groupedDemands, demandsKeys } = useGroupDemands(
    selectedPlace?.demands || []
  )

  useEffect(() => {
    if (idOrSlug) {
      fetchPlace(idOrSlug)
    }
    return () => {
      clearSelectedPlace()
    }
  }, [idOrSlug])

  return (
    <>
      <Container>
        {selectedPlace !== null && (
          <PlaceDetails>
            <LastUpdate>
              <span>
                <TranslatedText value="lastUpdate" />{' '}
                {selectedPlace.lastUpdatedAt
                  ? format(
                      Date.parse(selectedPlace.lastUpdatedAt),
                      'd MMM Y H:m'
                    )
                  : '---'}
              </span>
            </LastUpdate>
            <StyledPageTitle>
              <PlaceNameLabel>
                <TranslatedText value="organizationLabel" />
              </PlaceNameLabel>
              <PlaceName>
                {selectedPlace?.name}
                {selectedPlace.placeLink?.homepage && (
                  <OrganisationLink
                    href={selectedPlace.placeLink?.facebook || '/'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FbIcon />
                  </OrganisationLink>
                )}
                {selectedPlace.placeLink?.homepage && (
                  <OrganisationLink
                    href={selectedPlace.placeLink?.homepage || '/'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WebsiteIcon />
                  </OrganisationLink>
                )}
              </PlaceName>
            </StyledPageTitle>
            <PlaceDetailsWrapper>
              <DetailsRow>
                <PlaceAddressWrapper>
                  <PlaceAddress>
                    <span>
                      {`${selectedPlace?.city}, ${selectedPlace.street || ''} ${
                        selectedPlace.buildingNumber || ''
                      } ${
                        selectedPlace.apartment
                          ? `/${selectedPlace.apartment}`
                          : ''
                      }`}
                    </span>
                    <span>{selectedPlace?.workingHours || ''}</span>
                    <PlaceDescription
                      dangerouslySetInnerHTML={{
                        __html: formattedPlaceDescription || ''
                      }}
                    />
                  </PlaceAddress>
                </PlaceAddressWrapper>
              </DetailsRow>
              {formattedBankAccountDetails && (
                <DetailsRow>
                  <BankAccount>
                    <TranslatedText value="bankAccount" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formattedBankAccountDetails
                      }}
                    />
                  </BankAccount>
                </DetailsRow>
              )}
              {selectedPlace.urgentDemands &&
                selectedPlace.urgentDemands.length > 0 && (
                  <UrgentDemandsWrapper>
                    <UrgentDemandsTitle>
                      <TranslatedText value="urgentlyNeeded" /> (
                      {selectedPlace.urgentDemands.length})
                    </UrgentDemandsTitle>
                    <UrgentDemandsList>
                      {selectedPlace.urgentDemands.map((demand, key) => (
                        <UrgentDemand key={key}>
                          <TranslatedEntry entry={demand.supply} />
                        </UrgentDemand>
                      ))}
                    </UrgentDemandsList>
                  </UrgentDemandsWrapper>
                )}
            </PlaceDetailsWrapper>
            <HowCanIHelpButton onClick={() => setFaqDialogOpened(true)}>
              <TranslatedText value="howCanIHelp" />
            </HowCanIHelpButton>
            {faqDialogOpened && (
              <FaqDialog onClose={() => setFaqDialogOpened(false)}>
                <CollapsableSection
                  opened
                  title={getTranslation(language, translations['faqTitle_7'])}
                  content={getTranslation(language, translations['faqText_7'])}
                />
                <CollapsableSection
                  opened
                  title={getTranslation(language, translations['faqTitle_4'])}
                  content={getTranslation(language, translations['faqText_4'])}
                />
                <CollapsableSection
                  opened
                  title={getTranslation(language, translations['faqTitle_1'])}
                  content={getTranslation(language, translations['faqText_1'])}
                />
                <CollapsableSection
                  title={getTranslation(language, translations['faqTitle_2'])}
                  content={getTranslation(language, translations['faqText_2'])}
                />
              </FaqDialog>
            )}
          </PlaceDetails>
        )}
        {selectedPlace && (
          <ShowOnMapButton
            href={`https://www.google.com/maps/place/${selectedPlace?.street}+${selectedPlace?.buildingNumber}+${selectedPlace?.city}`}
            target="_blank"
          >
            {getTranslation(language, translations['showOnMap'])}
          </ShowOnMapButton>
        )}
        <StyledFacebookButton>
          <TranslatedText value="shareThisOrganizationCollection" />
        </StyledFacebookButton>
        {selectedPlace &&
          selectedPlace.demands &&
          selectedPlace.demands.length > 0 && (
            <DemandsWrapper>
              <DemandsListTitle>
                <TranslatedText value="demandsList" />
              </DemandsListTitle>
              <DemandsList>
                {demandsKeys.map((priorityNumber, key) => {
                  if (!groupedDemands[priorityNumber]) return null
                  return (
                    <div key={key}>
                      <CategoryHeader>
                        <TranslatedEntry
                          entry={
                            groupedDemands[priorityNumber][0].supply?.category
                          }
                        />
                      </CategoryHeader>
                      {groupedDemands[priorityNumber].map((demand, index) => (
                        <DemandComponent key={index}>
                          <div>
                            <DemandInfo>
                              <span>
                                <TranslatedEntry entry={demand?.supply} />
                              </span>
                              {demand?.priority.importance === 2 && (
                                <TranslatedEntry entry={demand?.priority} />
                              )}
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
  padding-bottom: 4.8rem;
  ${breakpoint.sm`
    padding-bottom: 0;
  `}
`

const PlaceDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.grey100};
  padding: 1rem;
  padding-bottom: 0.4rem;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`
const PlaceDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const PlaceDescription = styled.p`
  display: inline-block;
  text-align: left;
  line-height: 1.4;
  width: 100%;
  color: ${({ theme }) => theme.colors.grey500};
  font-size: 0.8rem;
  font-weight: 400;
  overflow-wrap: break-word;
  margin: 0.4rem 0;
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
`

const PlaceAddressWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PlaceAddress = styled.div`
  display: flex;
  flex-direction: column;

  span {
    display: inline-flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.grey800};
    font-size: 0.85rem;
    font-weight: 400;
    margin: 0.4rem 0;
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

const BankAccount = styled.div`
  margin-top: 1.6rem;
  color: #8d99b2;
  font-size: 0.8rem;
  font-weight: 400;
  a {
    color: ${({ theme }) => theme.colors.blue};
  }
  span {
    display: inline-block;
    color: #8d99b2;
    font-size: 0.9rem;
    font-weight: 500;
    margin: 0.2rem 0;
  }
`

const DemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem 3.2rem;
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
  margin: 0;
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
  max-width: 90%;
  cursor: pointer;
  z-index: 130;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  ${breakpoint.sm`
    bottom: 2rem;
    right: 1rem;
    left: unset;
    transform: unset;
    max-width: 35%;
  `}
`

const CategoryHeader = styled.span`
  font-weight: bold;
  display: flex;
  width: calc(100% + 48px);
  font-size: 1.05rem;
  padding: 0.7rem;
  color: #333333;
  border-radius: 12px;
  background-color: #0076ff1f;
  margin: 0.4rem -24px;
`

const PlaceNameLabel = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey500};
`

const StyledPageTitle = styled(PageTitle)`
  padding-top: 0;
  flex-direction: column;
  padding: 0 0 0.6rem 0;
`

const ShowOnMapButton = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 34px;
  padding: 0.8rem 1.8rem;
  outline: none;
  background-color: transparent;
  background-image: url(${mapPlaceholderUrl});
  background-position: center center;
  background-size: cover;
  color: black;
  font-size: 0.85rem;
  font-weight: 600;
  border-top: 2px solid white;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const UrgentDemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const UrgentDemandsTitle = styled.div`
  margin-top: 0.4rem;
  display: inline-block;
  width: 100%;
  font-size: 0.7rem;
  line-height: 1.2;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};
`

const UrgentDemandsList = styled.div`
  display: flex;
  width: 100%;
  overflow-x: auto;
  padding: 0.4rem 0 0.8rem 0;
  ${breakpoint.sm`
    overflow-x: hidden;
  `}
`

const UrgentDemand = styled.div`
  display: flex;
  padding: 0.2rem 0.4rem;
  background-color: #0076ff2b;
  border-radius: 8px;
  flex-shrink: 0;
  font-size: 0.75rem;
  margin-right: 0.4rem;
`

const OrganisationLink = styled.a`
  display: inline-block;
  padding: 0 0.4rem;
  svg {
    fill: ${({ theme }) => theme.colors.gray800};
  }
`

const PlaceName = styled.span`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const gradient = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const HowCanIHelpButton = styled.button`
  border: none;
  outline: none;
  padding: 0.8rem 1.8rem;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 10px;
  height: 38px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  animation: ${gradient} 20s ease infinite;
  background: linear-gradient(
      -45deg,
      rgb(107, 25, 216),
      rgb(7, 210, 179),
      ${({ theme }) => theme.colors.blue}
    )
    0% 0%/600% 600%;
`

const FaqDialog = styled(Dialog)`
  & > div {
    & > div {
      padding: 4.2rem 1.2rem 0;
      ${breakpoint.sm`
        width: 450px;
        max-height: 80%;
        box-shadow: ${({ theme }) => theme.boxShadows.medium};
      `}
    }
  }
`
