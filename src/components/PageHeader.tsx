import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ukraineFlag from 'assets/ukraine-flag.svg'
import { Page, routes } from 'routes'

const PageHeader = ({ className }: { className?: string }) => (
  <header className={className}>
    <Link to={routes[Page.HOME]}>
      <Flag src={ukraineFlag} alt="slava ukraini" />
    </Link>
    <Navigation>
      <StyledLink to={routes[Page.LOGIN]}>Zaloguj</StyledLink>
    </Navigation>
  </header>
)

export default styled(PageHeader)`
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

const StyledLink = styled(Link)`
  display: inline-block;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  padding: 0 0.4rem;
  &:hover {
    text-decoration: underline;
  }
`
