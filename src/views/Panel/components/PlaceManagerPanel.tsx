import Button from 'components/Button'
import { PlaceBox } from 'components/PlaceBox'
import { usePanelContext } from 'contexts/panelContext'
import { useUserContext } from 'contexts/userContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Page, routes } from 'routes'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import TranslatedEntry from 'components/TranslatedEntry'
import TranslatedText from 'components/TranslatedText'

const PlaceManagerPanel = ({ className }: { className?: string }) => {
  const { ownedPlaces, fetchOwnedPlaces } = useUserContext()
  const { demands, fetchDemands, removeAllDemands } = usePanelContext()
  const navigate = useNavigate()

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  useEffect(() => {
    if (ownedPlaces.length === 1 && ownedPlaces[0]?.id) {
      fetchDemands(ownedPlaces[0].id)
    }
  }, [ownedPlaces])

  return (
    <div className={className}>
      {ownedPlaces.length === 1 && (
        <>
          <SectionTitle>jesteś zalogowany jako</SectionTitle>
          <PlaceTitle>{ownedPlaces[0]?.name}</PlaceTitle>
          <ButtonWrapper>
            {demands.length === 0 && (
              <SectionTitle>
                <TranslatedText value="noDemandsReported" />
              </SectionTitle>
            )}
            <StyledButton
              onClick={() =>
                navigate(
                  routes[Page.DEMANDS].replace(':id', ownedPlaces[0]?.id || '')
                )
              }
            >
              <TranslatedText value="addDemands" />
            </StyledButton>
            {demands.length > 0 && (
              <>
                <DemandsWrapper>
                  {demands.map((demand, index) => (
                    <DemandBox key={index}>
                      <DemandTitle>
                        <span>
                          <TranslatedEntry entry={demand.supply} />
                        </span>
                        <PriorityLabel>
                          <TranslatedEntry entry={demand.priority} />
                        </PriorityLabel>
                      </DemandTitle>
                    </DemandBox>
                  ))}
                </DemandsWrapper>
                {ownedPlaces[0]?.id && (
                  <RemoveAllDemandsButton
                    onClick={() => removeAllDemands(ownedPlaces[0]?.id || '')}
                  >
                    <TranslatedText value="finishCollection" />
                  </RemoveAllDemandsButton>
                )}
              </>
            )}
          </ButtonWrapper>
        </>
      )}
      {ownedPlaces.length > 1 && (
        <PlacesWrapper>
          {ownedPlaces.map((place, index) => (
            <StyledLink
              key={index}
              to={`${routes[Page.DEMANDS].replace(':id', place?.id || '')}`}
            >
              <PlaceBox place={place} />
            </StyledLink>
          ))}
        </PlacesWrapper>
      )}
    </div>
  )
}

export default styled(PlaceManagerPanel)`
  display: flex;
  flex-direction: column;
`

const SectionTitle = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 1.3;
  font-size: 0.95rem;
  color: #999999;
  margin: 2.8rem 0 0.4rem;
`

const PlaceTitle = styled.h3`
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 1.3;
  font-size: 1.9rem;
  color: #f6ce01;
  margin: 0 0 1.2rem 0;
  padding: 0 1.2rem;
`

const StyledLink = styled(Link)`
  width: 100%;
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

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2.2rem;
  padding: 0 1.2rem;
`

const StyledButton = styled(Button)`
  margin-top: 0.8rem;
  margin-bottom: 2.2rem;
`

const DemandsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2.2rem;
`

const DemandBox = styled.div`
  padding: 1rem 1.2rem;
  background-color: white;
  width: 100%;
  border-radius: 15px;
  box-shadow: 1px -5px 14px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.8rem;
  cursor: pointer;
`

const DemandTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const PriorityLabel = styled.span`
  color: #999;
`

const RemoveAllDemandsButton = styled(Button)`
  margin-top: 0.8rem;
  margin-bottom: 2.2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.red};
  border: 1px solid ${({ theme }) => theme.colors.red};
`
