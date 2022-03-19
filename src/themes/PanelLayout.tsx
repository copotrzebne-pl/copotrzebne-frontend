import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import PanelHeader from 'components/PanelHeader'

export default () => (
  <>
    <PanelHeader />
    <PageContent>
      <Outlet />
    </PageContent>
  </>
)

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(
    100vh - ${({ theme }) => theme.dimensions.headerHeight} - 20px
  );
`
