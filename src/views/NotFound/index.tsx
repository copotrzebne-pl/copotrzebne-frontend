import styled from 'styled-components'

const NotFoundPage = ({ className }: { className?: string }) => (
  <div className={className}>
    <span>Page not found</span>
  </div>
)

export default styled(NotFoundPage)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 420px;
  & > span {
    font-weight: 500;
  }
`
