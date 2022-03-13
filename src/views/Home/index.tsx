import styled from 'styled-components'
import ukraineFlag from 'assets/ukraine-flag.svg'
import { Link } from "react-router-dom";
import { PATHS } from 'routes'

export default () => (
    <Container>
      <Title>Home view</Title>
      <Flag src={ukraineFlag} alt='' />
      <Link to={PATHS.login}>Log in</Link>
    </Container>
  )

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Title = styled.span`
  display: inline-block;
  margin-bottom: 2.6rem;
`

const Flag = styled.img`
  height: 120px;
  width: auto;
  margin-bottom: 2.6rem;
`