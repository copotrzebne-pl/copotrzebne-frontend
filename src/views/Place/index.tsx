import { useEffect, useState, useRef } from 'react'
import { usePanelContext } from 'contexts/panelContext'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import format from 'date-fns/format'
import TranslatedEntry from 'components/TranslatedEntry'
import TranslatedText from 'components/TranslatedText'
import { useTextTransformToHTML, linkify } from 'hooks/useTextTransformToHTML'
import { useGroupDemands } from 'hooks/useGroupDemands'
import { translations } from 'translations'
import { useUserContext } from 'contexts/userContext'
import { getTranslation } from 'utils/translation'
import { ReactComponent as FbIcon } from 'assets/facebook-small-icon.svg'
import { ReactComponent as WebsiteIcon } from 'assets/website-icon.svg'
import {
  BankAccount,
  Links,
  CategoryHeader,
  CollapsableSection,
  Container,
  DemandComment,
  DemandComponent,
  DemandInfo,
  DemandsList,
  DemandsListTitle,
  DemandsWrapper,
  DetailsRow,
  FaqDialog,
  HowCanIHelpButton,
  LastUpdate,
  OrganisationLink,
  PlaceAddress,
  PlaceAddressWrapper,
  PlaceDescription,
  PlaceDetails,
  PlaceDetailsWrapper,
  PlaceName,
  PlaceNameLabel,
  ShowOnMapButton,
  StyledFacebookButton,
  StyledPageTitle,
  UrgentDemand,
  UrgentDemandsList,
  UrgentDemandsTitle,
  UrgentDemandsWrapper
} from './components'
import { breakpoint } from 'themes/breakpoints'
import { OrganizationMap } from './Map'
import { Language } from 'common/language'

export default () => {
  const [faqDialogOpened, setFaqDialogOpened] = useState<boolean>(false)
  const { selectedPlace, fetchPlace, clearSelectedPlace } = usePanelContext()
  const { language } = useUserContext()
  const { idOrSlug } = useParams()
  const mobileViewport = window.matchMedia('screen and (max-width: 992px)')
  const placeInformationRef = useRef<HTMLDivElement | null>(null)
  const formattedPlaceDescription = useTextTransformToHTML(
    selectedPlace?.additionalDescription || ''
  )
  const formattedBankAccountDetails = useTextTransformToHTML(
    selectedPlace?.bankAccount || ''
  )
  const formattedBankAccountDescription = useTextTransformToHTML(
    selectedPlace?.bankAccountDescription || ''
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

  const shouldRenderLinksSection = (): boolean =>
    !!selectedPlace?.placeLink &&
    (!!selectedPlace?.placeLink.signup ||
      !!selectedPlace?.placeLink.fundraising)

  return (
    <>
      <Container>
        <OgranizationInformation>
          {selectedPlace !== null && (
            <PlaceDetails ref={placeInformationRef}>
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
                  {selectedPlace?.name[language] ||
                    selectedPlace?.name[Language.PL]}
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
                        {`${selectedPlace?.city}, ${
                          selectedPlace.street || ''
                        } ${selectedPlace.buildingNumber || ''} ${
                          selectedPlace.apartment
                            ? `/${selectedPlace.apartment}`
                            : ''
                        }`}
                      </span>
                      <span>{selectedPlace?.workingHours || ''}</span>
                      {formattedPlaceDescription && (
                        <PlaceDescription
                          dangerouslySetInnerHTML={{
                            __html: formattedPlaceDescription || ''
                          }}
                        />
                      )}
                      {formattedBankAccountDetails && (
                        <BankAccount>
                          <span>
                            <u>
                              <TranslatedText value="bankAccount" />
                            </u>
                          </span>
                          <span>
                            <b
                              dangerouslySetInnerHTML={{
                                __html: formattedBankAccountDetails
                              }}
                            />
                          </span>
                          <span>{formattedBankAccountDescription}</span>
                        </BankAccount>
                      )}
                      {shouldRenderLinksSection() && (
                        <DetailsRow>
                          <Links>
                            {selectedPlace.placeLink?.signup && (
                              <div>
                                <a
                                  href={selectedPlace.placeLink?.signup || '/'}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  &#8594; <TranslatedText value="signupLink" />
                                </a>
                              </div>
                            )}
                            {selectedPlace.placeLink?.fundraising && (
                              <div>
                                <a
                                  href={
                                    selectedPlace.placeLink?.fundraising || '/'
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  &#8594;{' '}
                                  <TranslatedText value="fundraisingLink" />
                                </a>
                              </div>
                            )}
                          </Links>
                        </DetailsRow>
                      )}
                    </PlaceAddress>
                  </PlaceAddressWrapper>
                </DetailsRow>
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
                  {/* I have some spare time, how can I help? */}
                  {selectedPlace?.placeLink?.signup && (
                    <CollapsableSection
                      opened
                      title={getTranslation(
                        language,
                        translations['faqTitle_7']
                      )}
                      content={
                        <span
                          dangerouslySetInnerHTML={{
                            __html: linkify(
                              getTranslation(
                                language,
                                translations['faqText_7']
                              ).replace(
                                '{link}',
                                selectedPlace?.placeLink?.signup
                              )
                            )
                          }}
                        />
                      }
                    />
                  )}
                  {/* I live abroad, how can I help? */}
                  <CollapsableSection
                    opened
                    title={getTranslation(language, translations['faqTitle_4'])}
                  >
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getTranslation(
                          language,
                          translations['faqText_4']
                        )
                          .replace(
                            '{bankAccountNumber}',
                            linkify(selectedPlace.bankAccount || '')
                          )
                          .replace(
                            '{fundraising}',
                            linkify(selectedPlace?.placeLink?.fundraising || '')
                          )
                          .replace(
                            '{contact}',
                            selectedPlace.email || selectedPlace.phone
                              ? `email: ${selectedPlace.email || '---'}, tel: ${
                                  selectedPlace.phone || '---'
                                }`
                              : ''
                          )
                          .replace(
                            '{address}',
                            `${selectedPlace?.city}, ${
                              selectedPlace.street || ''
                            } ${selectedPlace.buildingNumber || ''} ${
                              selectedPlace.apartment
                                ? `/${selectedPlace.apartment}`
                                : ''
                            }`
                          )
                          .replace(
                            '{workingHours}',
                            selectedPlace.workingHours || '---'
                          )
                      }}
                    />
                  </CollapsableSection>
                  {/* I want to donate money, how can I do it? */}
                  {selectedPlace.bankAccount && (
                    <CollapsableSection
                      opened
                      title={getTranslation(
                        language,
                        translations['faqTitle_1']
                      )}
                      content={
                        <span
                          dangerouslySetInnerHTML={{
                            __html: linkify(
                              getTranslation(
                                language,
                                translations['faqText_1']
                              ).replace(
                                '{bankAccountNumber}',
                                selectedPlace.bankAccount
                              )
                            )
                          }}
                        />
                      }
                    />
                  )}
                  {/* I want to donate goods, how can I do it? */}
                  <CollapsableSection
                    title={getTranslation(language, translations['faqTitle_2'])}
                    content={
                      <span
                        dangerouslySetInnerHTML={{
                          __html: linkify(
                            getTranslation(language, translations['faqText_2'])
                              .replace(
                                '{address}',
                                `${selectedPlace?.city}, ${
                                  selectedPlace.street || ''
                                } ${selectedPlace.buildingNumber || ''} ${
                                  selectedPlace.apartment
                                    ? `/${selectedPlace.apartment}`
                                    : ''
                                }`
                              )
                              .replace(
                                '{workingHours}',
                                selectedPlace.workingHours || '---'
                              )
                          )
                        }}
                      />
                    }
                  />
                </FaqDialog>
              )}
            </PlaceDetails>
          )}
          {selectedPlace && mobileViewport.matches && (
            <ShowOnMapButton
              href={`https://www.google.com/maps/place/${selectedPlace?.street}+${selectedPlace?.buildingNumber}+${selectedPlace?.city}`}
              target="_blank"
            >
              {getTranslation(language, translations['showOnMap'])}
            </ShowOnMapButton>
          )}
          {selectedPlace && !mobileViewport.matches && (
            <OrganizationMap
              place={selectedPlace}
              placeInformationRef={placeInformationRef.current}
            />
          )}
        </OgranizationInformation>
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
                    <DemandWrapper key={key}>
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
                                <DemandPriority>
                                  <TranslatedEntry entry={demand?.priority} />
                                </DemandPriority>
                              )}
                            </DemandInfo>
                            {demand?.comment && (
                              <DemandComment>{demand?.comment}</DemandComment>
                            )}
                          </div>
                        </DemandComponent>
                      ))}
                    </DemandWrapper>
                  )
                })}
              </DemandsList>
            </DemandsWrapper>
          )}
      </Container>
    </>
  )
}

const OgranizationInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${breakpoint.sm`
    flex-direction: row;
    border-bottom: 2px solid ${({ theme }) => theme.colors.grey200};
  `}
`

const DemandWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint.sm`
    width: 100%;
  `}
`
const DemandPriority = styled.div`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.815rem;
  padding: 0.3rem 0.5rem 0.4rem 0.5rem;
  line-height: 1;
  border-radius: 20px;
  margin-left: 0.5rem;
`
