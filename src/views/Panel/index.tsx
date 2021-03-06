import { useEffect } from 'react'
import styled from 'styled-components'
import { useUserContext } from 'contexts/userContext'
import AdminPanel from './components/AdminPanel'
import PlaceManagerPanel from './components/PlaceManagerPanel'
import { breakpoint } from 'themes/breakpoints'

export default () => {
  const { user, fetchUser } = useUserContext()
  useEffect(() => {
    // whoami - get logged in user data
    fetchUser()
  }, [])
  return (
    <Container>
      {user && ['admin', 'moderator', 'auditor'].includes(user.role) && (
        <AdminPanel />
      )}
      {user?.role === 'place_manager' && <PlaceManagerPanel />}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 70vh;
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`
