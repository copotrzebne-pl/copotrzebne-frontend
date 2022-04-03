import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Header from 'components/PageHeader'
import Copyright from 'components/Copyright'
import { useUserContext } from '../contexts/userContext'
import { getDefaultMenuItems } from '../utils/menus'
import { useCallback } from 'react'
import { Page, routes } from '../routes'

export default () => {
  const { authorized, setAuthorized } = useUserContext()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    try {
      window.localStorage.removeItem('_token')
      setAuthorized(false)
      navigate(routes[Page.HOME])
    } catch {
      console.error('logout error')
    }
  }, [navigate])

  return (
    <>
      <Header menuItems={getDefaultMenuItems({ authorized, handleLogout })} />
      <PageContent>
        <Outlet />
      </PageContent>
      <Copyright />
    </>
  )
}

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(
    100vh - ${({ theme }) => theme.dimensions.headerHeight} - 20px
  );
`
