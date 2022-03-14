import styled from 'styled-components'

const PageFooter = ({ className }: { className?: string }) => (
  <footer className={className}>copotrzebne.pl</footer>
)

export default styled(PageFooter)`
  display: flex;
  flex-direction: row;
  border-top: 2px solid ${({ theme }) => theme.colors.grey300};
  padding: 2rem;
  color: ${({ theme }) => theme.colors.grey800};
`
