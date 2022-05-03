import { useEffect, useState } from 'react'
import { usePanelContext } from 'contexts/panelContext'
import { useParams } from 'react-router-dom'
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
                      </BankAccount>
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
                    title={getTranslation(language, translations['faqTitle_7'])}
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
                          selectedPlace.bankAccount || ''
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
                    title={getTranslation(language, translations['faqTitle_1'])}
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
