import styled from 'styled-components'
import { useState, useCallback, SyntheticEvent } from 'react'
import {
  LoginForm,
  FormGroup,
  Label,
  TextInput,
  LoginButton
} from './components'
import { useUserContext } from 'contexts/userContext'

export default () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login: loginUser } = useUserContext()
  const handleLogin = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      loginUser(login, password)
    },
    [login, password, loginUser]
  )

  return (
    <Container>
      <Content>
        <LoginForm onSubmit={handleLogin}>
          <FormGroup>
            <Label>Login</Label>
            <TextInput
              autoComplete="on"
              id="login"
              type="email"
              placeholder="Wpisz login"
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>Hasło</Label>
            <TextInput
              id="password"
              type="password"
              placeholder="Podaj hasło"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <LoginButton type="submit" onClick={handleLogin}>
            Zaloguj
          </LoginButton>
        </LoginForm>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 70vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
`
