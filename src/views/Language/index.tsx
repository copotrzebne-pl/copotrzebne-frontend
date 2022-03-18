import { useState } from 'react'
import PageTitle from 'components/PageTitle'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'

export default () => {
  const [selected, setSelected] = useState<string>('')
  return (
    <Container>
      <PageTitle>Zmień język</PageTitle>
      <NotAvailableYet>Wkrótce dostępne</NotAvailableYet>
      <LanguageWrapper>
        <Language
          selected={selected === 'pl'}
          onClick={() => setSelected('pl')}
        >
          Polski
        </Language>
        <Language
          selected={selected === 'ua'}
          onClick={() => setSelected('ua')}
        >
          український
        </Language>
        <Language
          selected={selected === 'en'}
          onClick={() => setSelected('en')}
        >
          English
        </Language>
      </LanguageWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.2rem 1.6rem;
`

const Language = styled.div<{ selected: boolean }>`
  pointer-events: none;
  width: 100%;
  margin: 0.45rem 0;
  border: 2px solid
    ${({ selected, theme }) =>
      selected ? theme.colors.pink : theme.colors.grey};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.pink : theme.colors.grey};
  transition: border-color 0.3s, color 0.3s;
  border-radius: 50px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  cursor: pointer;
`

const NotAvailableYet = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  marign: 1rem 0;
  color: #999;
  font-size: 0.9rem;
`
