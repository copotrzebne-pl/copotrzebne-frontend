import Button from 'components/Button'
import { usePanelContext } from 'contexts/panelContext'
import { useEffect, useState, Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Page, routes } from 'routes'
import styled from 'styled-components'

import trashIconUrl from 'assets/trash-icon.svg'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import PageTitle from 'components/PageTitle'
import Dialog from 'components/Dialog'
import DemandComponent, { AddIcon } from 'views/Demands/components/Demand'
import { Language } from 'common/language'
import { useUserContext } from 'contexts/userContext'

export default () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { language } = useUserContext()
  const [editedDemandId, setEditedDemandId] = useState<string>('')
  const {
    demands,
    selectedPlace,
    priorities,
    fetchPlace,
    clearDemands,
    saveDemand,
    fetchPriorities,
    clearSelectedPlace,
    fetchDemands,
    removeDemand,
    removeAllDemands
  } = usePanelContext()

  useEffect(() => {
    if (id && id !== 'new') {
      fetchPlace(id)
      fetchDemands(id)
      fetchPriorities(id)
    }
    return () => {
      clearDemands()
      clearSelectedPlace()
    }
  }, [id])

  return (
    <Container>
      <PageTitle>
        {selectedPlace?.name[language] ||
          selectedPlace?.name[Language.PL] ||
          'Dodaj nowe potrzeby'}
      </PageTitle>
      <ButtonWrapper>
        {demands.length === 0 && (
          <SectionTitle>
            <TranslatedText value="noDemandsReported" />
          </SectionTitle>
        )}
        <StyledButton
          onClick={() =>
            navigate(
              routes[Page.DEMANDS].replace(':id', selectedPlace?.id || '')
            )
          }
        >
          <TranslatedText value="addDemands" />
        </StyledButton>
        {selectedPlace?.id && !!demands.length && (
          <RemoveAllDemandsButton
            onClick={() => removeAllDemands(selectedPlace?.id || '')}
          >
            <TranslatedText value="removeDemands" />
          </RemoveAllDemandsButton>
        )}
        {demands.length > 0 && (
          <>
            <DemandsWrapper>
              {demands.map((demand, index) => (
                <Fragment key={index}>
                  <DemandBox
                    key={demand.supply?.id}
                    onClick={() => setEditedDemandId(demand.id)}
                  >
                    <DemandTitle>
                      <DemandContent>
                        <PriorityLabel>
                          {demand.priority.name[language] ||
                            demand.priority.name[Language.PL] ||
                            ''}
                        </PriorityLabel>
                        {demand.supply.name[language] ||
                          demand.supply.name[Language.PL] ||
                          ''}
                        {demand.comment && (
                          <PriorityLabel>{demand.comment}</PriorityLabel>
                        )}
                      </DemandContent>
                      <TrashIcon
                        src={trashIconUrl}
                        alt="remove"
                        onClick={() => removeDemand(demand.id)}
                      />
                    </DemandTitle>
                  </DemandBox>
                  {editedDemandId === demand.id && (
                    <Dialog onClose={() => setEditedDemandId('')}>
                      <div>
                        <DemandComponentStyled
                          placeId={selectedPlace?.id || ''}
                          supply={demand.supply}
                          priorities={priorities}
                          saveDemand={demandDto =>
                            saveDemand(demandDto).then(() =>
                              setEditedDemandId('')
                            )
                          }
                          isSelected
                          isSaved
                          demand={demand}
                          onSelected={console.log}
                          buttonText="Zapisz"
                        />
                      </div>
                    </Dialog>
                  )}
                </Fragment>
              ))}
            </DemandsWrapper>
          </>
        )}
      </ButtonWrapper>
    </Container>
  )
}

const SectionTitle = styled.span`
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 1.3;
  font-size: 0.95rem;
  color: #999999;
  margin: 2.8rem 0 0.4rem;
`

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

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2.2rem;
  padding: 0 1.2rem;
`

const StyledButton = styled(Button)`
  margin-top: 0.8rem;
  margin-bottom: 1.2rem;
`

const RemoveAllDemandsButton = styled(Button)`
  margin-top: 0.8rem;
  margin-bottom: 2.2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.red};
  border: 1px solid ${({ theme }) => theme.colors.red};
  &:hover,
  &:focus {
    color: white;
    background: ${({ theme }) => theme.colors.red};
  }
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
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
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

const TrashIcon = styled.img`
  display: inline-block;
  padding: 0.3rem;
  height: 28px;
  width: auto;
  cursor: pointer;
`

const DemandContent = styled.div`
  display: flex;
  flex-direction: column;
`

const DemandComponentStyled = styled(DemandComponent)`
  box-shadow: none;
  ${AddIcon} {
    display: none;
  }
`
