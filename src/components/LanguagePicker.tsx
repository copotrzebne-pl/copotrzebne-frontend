import styled from 'styled-components'
import { ReactComponent as PolandFlag } from '../assets/poland-flag-square.svg'
import { ReactComponent as EnglandFlag } from '../assets/england-flag-square.svg'
import { ReactComponent as UkraineFlag } from '../assets/ukraine-flag-square.svg'
import { useUserContext } from '../contexts/userContext'

export default () => {
  const { language, changeLanguage } = useUserContext()

  return (
    <Languages>
      <Language selected>
        {language === 'pl' && <PolandFlag />}
        {language === 'ua' && <UkraineFlag />}
        {language === 'en' && <EnglandFlag />}
      </Language>
      <Dropdown>
        {language !== 'pl' && (
          <Language onClick={() => changeLanguage('pl')}>
            <PolandFlag />
          </Language>
        )}
        {language !== 'ua' && (
          <Language onClick={() => changeLanguage('ua')}>
            <UkraineFlag />
          </Language>
        )}
        {language !== 'en' && (
          <Language onClick={() => changeLanguage('en')}>
            <EnglandFlag />
          </Language>
        )}
      </Dropdown>
    </Languages>
  )
}

const Dropdown = styled.div`
  background: white;
  position: absolute;
  top: 40px;
  left: 0;
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  border-radius: 4px;
  transition: 0.3s;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
`

const Languages = styled.div`
  position: relative;

  &:hover {
    ${Dropdown} {
      max-height: 200px;
      opacity: 1;
    }
  }
`

const Language = styled.div<{ selected?: boolean }>`
  margin: 0.6rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 25px;

  ${({ selected }) =>
    selected &&
    `
      cursor: auto;
    `}
}

& > svg {
  width: 2.2rem;
  box-shadow: 0 0 3px #b0b0b0;
}
`
