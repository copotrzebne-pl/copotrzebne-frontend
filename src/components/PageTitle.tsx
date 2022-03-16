import { ReactNode } from 'react'
import styled from 'styled-components'
import backArrow from 'assets/back-arrow.svg'
import { Link } from 'react-router-dom'
import { Page, routes } from 'routes'

const PageTitle = ({
  className,
  children,
  backPage
}: {
  className?: string
  children: ReactNode
  backPage: Page
}) => (
  <div className={className}>
    <GoBack to={routes[backPage]}>
      <BackIcon src={backArrow} alt="go back" />
    </GoBack>
    {children}
  </div>
)

export default styled(PageTitle)`
  width: 100%;
  padding: 1.4rem 1.2rem;
  padding-left: 3.6rem;
  position: relative;
  display: flex;
  flex-direction: row;
  font-size: 1.45rem;
  font-weight: 500;
  align-items: center;
  justify-content: center;
`

const BackIcon = styled.img`
  display: inline-block;
  height: 24px;
  width: auto;
  margin-left: 0.8rem;
  margin-top: 4px;
`

const GoBack = styled(Link)`
  position: absolute;
  left: 0;
  padding: 0.4rem;
`
