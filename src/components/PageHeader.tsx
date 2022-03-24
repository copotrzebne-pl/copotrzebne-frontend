import { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import menuIcon from 'assets/menu-icon.svg'
import closeIcon from 'assets/close-icon.svg'
import logoImage from 'assets/uk-heart.svg'
import { breakpoint } from 'themes/breakpoints'

import { Page, routes } from 'routes'
import { useClickOutside } from 'hooks/useClickOutside'
import { useUserContext } from '../contexts/userContext'
import LanguagePicker from './LanguagePicker'
import TranslatedText from './TranslatedText'

const PageHeader = ({ className }: { className?: string }) => {
  const [opened, setOpened] = useState<boolean>(false)
  const { authorized } = useUserContext()
  const closeMenu = useCallback(() => {
    setOpened(false)
  }, [setOpened])
  const menuRef = useRef(null)
  useClickOutside(menuRef, () => setOpened(false))

  return (
    <header className={className}>
      <LogoLink to={routes[Page.HOME]}>
        <Logo src={logoImage} />
        <LogoText>copotrzebne.pl</LogoText>
      </LogoLink>
      <DesktopLanguagePickerWrapper>
        <LanguagePicker />
      </DesktopLanguagePickerWrapper>
      <Navigation>
        <MenuIcon
          src={menuIcon}
          alt="menu"
          onClick={() => setOpened(!opened)}
        />
      </Navigation>
      <Menu opened={opened} ref={menuRef}>
        <MenuHeader>
          <LogoLink to={routes[Page.HOME]} onClick={closeMenu}>
            <Logo src={logoImage} />
            <LogoText>copotrzebne.pl</LogoText>
          </LogoLink>
          <MenuIcon
            src={closeIcon}
            alt="menu"
            onClick={() => setOpened(!opened)}
          />
        </MenuHeader>
        <MenuList>
          <MenuItem to={routes[Page.ABOUT]} onClick={closeMenu}>
            <TranslatedText value="menuAboutUs" />
          </MenuItem>
          {authorized ? (
            <MenuItem to={routes[Page.PANEL]} onClick={closeMenu}>
              <TranslatedText value="menuPanel" />
            </MenuItem>
          ) : (
            <MenuItem to={routes[Page.LOGIN]} onClick={closeMenu}>
              <TranslatedText value="menuLogIn" />
            </MenuItem>
          )}
          <MobileLanguagePickerWrapper>
            <LanguagePicker />
          </MobileLanguagePickerWrapper>
        </MenuList>
      </Menu>
    </header>
  )
}

export default styled(PageHeader)`
  width: 100%;
  height: ${({ theme }) => theme.dimensions.headerHeight};
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: ${({ theme }) => theme.boxShadows.small};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  display: inline-block;
  float: left;
  height: 2.85rem;
  width: auto;
  margin: 0 6px -4px 0;
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

const Navigation = styled.nav`
  display: flex;
  flex-direction: row;
`

const MenuItem = styled(Link)`
  display: inline-block;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  padding: 0.6rem;
`

const MobileLanguagePickerWrapper = styled.div`
  width: 100%;
  justify-items: center;
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;

  ${breakpoint.sm`
    display: none;  
  `}
`

const DesktopLanguagePickerWrapper = styled.div`
  padding: 1.2rem 1.6rem;
  margin-left: auto;
  display: none;

  ${breakpoint.sm`
    display: flex;
  `}
`

const MenuIcon = styled.img`
  height: 24px;
  width: auto;
  cursor: pointer;
`

const MenuHeader = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.dimensions.headerHeight};
  padding: 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid transparent;
`

const Menu = styled.div<{ opened: boolean }>`
  display: ${({ opened }) => (opened ? 'flex' : 'none')};
  background-color: white;
  flex-direction: column;
  height: 246px;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  box-shadow: ${({ theme }) => theme.boxShadows.small};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 10;
`

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 1.8rem;
`
