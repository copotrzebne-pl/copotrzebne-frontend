import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Header from 'components/PageHeader'
import { Page, routes } from 'routes'
import { useUserContext } from 'contexts/userContext'
import { getPanelMenuItems } from 'utils/menus'

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
      <Header menuItems={getPanelMenuItems({ handleLogout, authorized })} />
      <PageContent>
        <Outlet />
      </PageContent>
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
