import PageTitle from 'components/PageTitle'
import { Page } from 'routes'
import styled from 'styled-components'

export default () => (
  <Container>
    <PageTitle backPage={Page.HOME}>Copotrzebne</PageTitle>
    <AboutUsText>
      Opis organizacji - Diam facilisi insolens per cu, eos malorum voluptaria
      concludaturque usu id, et facete quaeque consequat visDiam facilisi
      insolens per concludaturque quaeque consequat vis
    </AboutUsText>
  </Container>
)

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
`

const AboutUsText = styled.p`
  display: inline-block;
  text-align: center;
  padding: 1.6rem 1.2rem;
  font-size: 0.89rem;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.4rem;
`
