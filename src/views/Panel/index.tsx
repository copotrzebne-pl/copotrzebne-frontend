import { useEffect } from 'react'
import styled from 'styled-components'
import { useUserContext } from 'contexts/userContext'
import { usePanelContext } from 'contexts/panelContext'

export default () => {
  const { fetchUser } = useUserContext()
  const { fetchPlaces } = usePanelContext()
  useEffect(() => {
    // whoimi - get logged in user data
    fetchUser()
    fetchPlaces()
  }, [])

  return (
    <Container>
      <Content>Panel</Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
`
