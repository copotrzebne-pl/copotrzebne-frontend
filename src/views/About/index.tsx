import PageTitle from 'components/PageTitle'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'

export default () => (
  <Container>
    <PageTitle><TranslatedText value="aboutUsPageTitle" /></PageTitle>
    <AboutUsText>
      <TranslatedText value="aboutUs" />
    </AboutUsText>
    <ContactDetails>
      <TranslatedText value="contactDetails" />
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
