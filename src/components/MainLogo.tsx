import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Page, routes } from '../routes'
import logoImage from '../assets/uk-heart.svg'
import logoKok from '../assets/logo-kok.png'
import { breakpoint } from '../themes/breakpoints'
import TranslatedText from './TranslatedText'

const MainLogo = ({ onClick }: { onClick: () => void }) => (
  <Container>
    <LogoLink to={routes[Page.HOME]} onClick={onClick}>
      <Logo src={logoImage} />
      <LogoText><TranslatedText value="whatisneededPl"/></LogoText>
    </LogoLink>
    <KokWrapper target="_blank" href="https://otwarty.krakow.pl/">
      <LogoKok src={logoKok} />
    </KokWrapper>
  </Container>
)

const Logo = styled.img`
  display: inline-block;
  float: left;
  height: 2.85rem;
  width: auto;
  margin: 0 6px -4px 0;
`
const LogoKok = styled.img`
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
const KokWrapper = styled.a``

const Container = styled.div`
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
