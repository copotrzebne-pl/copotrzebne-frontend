import styled from 'styled-components'
import { ReactComponent as PolandFlag } from '../assets/poland-flag-square.svg'
import { ReactComponent as EnglandFlag } from '../assets/england-flag-square.svg'
import { ReactComponent as UkraineFlag } from '../assets/ukraine-flag-square.svg'
import { useUserContext } from '../contexts/userContext'
import TranslatedText from './TranslatedText'

export default () => {
  const { language, changeLanguage } = useUserContext()

  return (
    <Languages>
      <Language selected>
        {language === 'pl' && <PolandFlag />}
        {language === 'ua' && <UkraineFlag />}
        {language === 'en' && <EnglandFlag />}
        <ChangeLanguageButtonText>
          (<TranslatedText value="changeLanguage" />)
        </ChangeLanguageButtonText>
      </Language>
      <Dropdown>
        {language !== 'pl' && (
          <Language onClick={() => changeLanguage('pl')}>
            <PolandFlag />
            <TranslatedText value="polish" />
          </Language>
        )}
        {language !== 'ua' && (
          <Language onClick={() => changeLanguage('ua')}>
            <UkraineFlag />
            <TranslatedText value="ukrainian" />
          </Language>
        )}
        {language !== 'en' && (
          <Language onClick={() => changeLanguage('en')}>
            <EnglandFlag />
            <TranslatedText value="english" />
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
  left: 50%;
  transform: translateX(-50%);
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  border-radius: 4px;
  transition: 0.3s;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding: 0.4rem;
`

const ChangeLanguageButtonText = styled.p`
  text-decoration: underline;
  cursor: pointer;
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
  margin-right: 0.6rem;
}
`
