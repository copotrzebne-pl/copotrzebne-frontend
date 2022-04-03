import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Page, routes } from '../routes'
import logoImage from '../assets/uk-heart.svg'
import { breakpoint } from '../themes/breakpoints'

const MainLogo = ({ onClick }: { onClick: () => void }) => (
  <LogoLink to={routes[Page.HOME]} onClick={onClick}>
    <Logo src={logoImage} />
    <LogoText>copotrzebne.pl</LogoText>
  </LogoLink>
)

const Logo = styled.img`
  display: inline-block;
  float: left;
  height: 2.85rem;
  width: auto;
  margin: 0 6px -4px 0;
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`

const LogoText = styled.span`
  display: inline-block;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.6rem;
  margin-top: -3px;

  ${breakpoint.sm`
    font-size: 1.85rem;
    margin-top: -5px;
`}
`

export default MainLogo
