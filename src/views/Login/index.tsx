import styled from 'styled-components'
import { useState, useCallback, SyntheticEvent } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  LoginForm,
  FormGroup,
  Label,
  TextInput,
  LoginButton
} from './components'
import { useUserContext } from 'contexts/userContext'
import PageTitle from 'components/PageTitle'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'

export default () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login: loginUser } = useUserContext()
  const handleLogin = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      if (!login || !password) return
      loginUser(login, password)
    },
    [login, password, loginUser]
  )

  return (
    <>
      <Helmet>
        <title>
          Copotrzebne.pl - pomagamy pomagać. Razem dla Ukrainy. Panel logowania
        </title>
        <meta
          name="description"
          content="Panel logowania organizacji. Dodaj zbiórkę i zarządzaj aktualnymi potrzebami w twoim punkcie pomocowym."
        />
      </Helmet>
      <Container>
        <PageTitle>
          <TranslatedText value="logIn" />
        </PageTitle>
        <LoginForm onSubmit={handleLogin}>
          <FormGroup>
            <Label>
              <TranslatedText value="email" />
            </Label>
            <TextInput
              autoComplete="on"
              id="login"
              type="email"
              placeholder="Email"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              <TranslatedText value="password" />
            </Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <LoginButton type="submit" onClick={handleLogin}>
              <TranslatedText value="logIn" />
            </LoginButton>
          </FormGroup>
        </LoginForm>
      </Container>
    </>
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
