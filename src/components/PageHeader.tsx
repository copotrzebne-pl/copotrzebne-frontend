import { useRef, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import menuIcon from 'assets/menu-icon.svg'
import closeIcon from 'assets/close-icon.svg'

import { Page, routes } from 'routes'
import { useClickOutside } from 'hooks/useClickOutside'
import { useUserContext } from '../contexts/userContext'

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
      <Link to={routes[Page.HOME]}>
        <Logo>copotrzebne.pl</Logo>
      </Link>
      <Navigation>
        <MenuIcon
          src={menuIcon}
          alt="menu"
          onClick={() => setOpened(!opened)}
        />
      </Navigation>
      <Menu opened={opened} ref={menuRef}>
        <MenuHeader>
          <Link to={routes[Page.HOME]} onClick={closeMenu}>
            <Logo>copotrzebne.pl</Logo>
          </Link>
          <MenuIcon
            src={closeIcon}
            alt="menu"
            onClick={() => setOpened(!opened)}
          />
        </MenuHeader>
        <MenuList>
          <MenuItem to={routes[Page.ABOUT]} onClick={closeMenu}>
            O nas
          </MenuItem>
          {authorized ? (
            <MenuItem to={routes[Page.PANEL]} onClick={closeMenu}>
              Panel
            </MenuItem>
          ) : (
            <MenuItem to={routes[Page.LOGIN]} onClick={closeMenu}>
              Zaloguj się
            </MenuItem>
          )}
          <MenuItem to={routes[Page.LANGUAGE]} onClick={closeMenu}>
            Zmień język
          </MenuItem>
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
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

const MenuItem = styled(Link)`
  display: inline-block;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  padding: 0.6rem;
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
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
