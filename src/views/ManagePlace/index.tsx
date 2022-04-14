import { useEffect } from 'react'
import Button from 'components/Button'
import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { Page, routes } from '../../routes'
import LastUpdateDate from '../../components/LastUpdateDate'
import UpdateDateButton from '../../components/UpdateDateButton'

export default () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {
    selectedPlace,
    fetchPlace,
    clearSelectedPlace,
    updatePlaceLastUpdate
  } = usePanelContext()

  useEffect(() => {
    id && id !== 'new' && fetchPlace(id)
    return () => {
      clearSelectedPlace()
    }
  }, [id])

  return (
    <Container>
      <PageTitle>{selectedPlace?.name || 'Dodaj nowe miejsce'}</PageTitle>
      <StyledButton
        onClick={() =>
          navigate(routes[Page.MANAGE_ADDRESS].replace(':id', id || ''))
        }
      >
        {selectedPlace?.name ? (
          <TranslatedText value="editPlaceData" />
        ) : (
          <TranslatedText value="addPlace" />
        )}
      </StyledButton>
      {id && id !== 'new' && (
        <StyledButton
          onClick={() =>
            navigate(routes[Page.MANAGE_DEMANDS].replace(':id', id || ''))
          }
        >
          <TranslatedText value="editDemands" />
        </StyledButton>
      )}
      {id && id !== 'new' && selectedPlace && (
        <>
          <LastUpdateDate lastUpdatedAt={selectedPlace.lastUpdatedAt} />
          <UpdateDateButton
            onClick={() => updatePlaceLastUpdate(id)}
            isDisabled={selectedPlace.priority === 0}
          />
        </>
      )}
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

const StyledButton = styled(Button)`
  width: auto;
  margin: 1.2rem 2.2rem;
  padding: 0.8rem 1.8rem;
`
