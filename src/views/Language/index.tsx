import styled from 'styled-components'

export default () => (
  <Container>
    <Content>Language</Content>
  </Container>
)

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
