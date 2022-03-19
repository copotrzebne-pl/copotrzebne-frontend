import PageTitle from 'components/PageTitle'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'

export default () => (
  <Container>
    <PageTitle>Copotrzebne.pl - O nas</PageTitle>
    <AboutUsText>
      {`Pomagamy pomagać - łączymy miejsca oferujące pomoc rzeczową, noclegi i
      wsparcie osobom uchodźczym z Ukrainy - z osobami, które chciałyby je w tej
      pomocy wspierać. Ułatwiamy lokalizację zbiórek i pomagamy koordynować
      zaspokajanie podstawowych potrzeb. Dzięki nam dowiesz się, co jest
      aktualnie najbardziej potrzebne w twojej lokalizacji oraz gdzie i kiedy
      można dane rzeczy dostarczyć.`}
    </AboutUsText>
    <ContactDetails>
      {`Chcesz dodać zbiórkę w twojej organizacji?
      Skontaktuj się z nami:`}

      <StyledLink href="mailto:copotrzebne@gmail.com">
        copotrzebne@gmail.com
      </StyledLink>
      <StyledLink href="tel:885812070">885812070</StyledLink>
    </ContactDetails>
  </Container>
)

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

const AboutUsText = styled.p`
  display: inline-block;
  text-align: center;
  padding: 1.6rem 1.2rem;
  font-size: 0.89rem;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.4rem;
  text-align: justify;
  text-justify: inter-character;
`

const ContactDetails = styled.div`
  display: inline-block;
  text-align: center;
  padding: 1.6rem 1.2rem;
  font-size: 0.89rem;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.4rem;
  white-space: pre-line;
`

const StyledLink = styled.a`
  display: inline-block;
  width: 100%;
  margin-top: 0.6rem;
  color: #0076ff;
`
