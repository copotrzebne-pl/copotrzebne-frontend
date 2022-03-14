import styled from 'styled-components'
import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ukraineFlag from 'assets/ukraine-flag.svg'
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
        <Flag src={ukraineFlag} alt="slava ukraini" />
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

const Flag = styled.img`
  height: 38px;
  width: auto;
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
