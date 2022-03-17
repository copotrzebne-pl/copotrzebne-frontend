import styled from 'styled-components'
import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Page, routes } from 'routes'

const PanelHeader = ({ className }: { className?: string }) => {
  const navigate = useNavigate()
  const handleLogout = useCallback(() => {
    try {
      window.localStorage.removeItem('_token')
      navigate(routes[Page.HOME])
    } catch {
      console.error('logout error')
    }
  }, [navigate])

  return (
    <header className={className}>
      <Link to={routes[Page.HOME]}>
        <Logo>copotrzebne</Logo>
      </Link>
      <Navigation>
        <StyledLink onClick={handleLogout}>Wyloguj</StyledLink>
      </Navigation>
    </header>
  )
}

export default styled(PanelHeader)`
  width: 100%;
  height: ${({ theme }) => theme.dimensions.headerHeight};
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey300};
  padding: 0 2.2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Logo = styled.span`
  display: inline-block;
  font-size: 1.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
`

const StyledLink = styled.span`
  display: inline-block;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  padding: 0 0.4rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
