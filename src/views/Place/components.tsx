import { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as ArrowIcon } from 'assets/down-arrow.svg'

const CollapsableComponent = ({
  className,
  opened,
  title,
  content,
  children
}: {
  className?: string
  opened?: boolean
  title: string
  content?: ReactNode
  children?: ReactNode
}) => {
  const [sectionOpened, setSectionOpened] = useState<boolean>(
    opened !== undefined ? opened : false
  )
  return (
    <div className={className}>
      <SectionTitle onClick={() => setSectionOpened(!sectionOpened)}>
        {title}
        <ToggleIcon opened={sectionOpened}>
          <ArrowIcon />
        </ToggleIcon>
      </SectionTitle>
      {sectionOpened && (
        <>
          <SectionContent>
            {content} {children}
          </SectionContent>
        </>
      )}
    </div>
  )
}

export const CollapsableSection = styled(CollapsableComponent)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  font-weight: bold;
  display: flex;
  font-size: 1.05rem;
  padding: 0.7rem;
  color: #333333;
  border-radius: 12px;
  background-color: #0076ff1f;
  position: relative;
  cursor: pointer;
  padding-right: 2rem;
`

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.7rem;
`

const ToggleIcon = styled.div<{ opened: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) ${({ opened }) => opened && 'rotate(180deg)'};
  margin-top: 4px;
  ${({ opened }) =>
    opened &&
    `
    margin-top: -2px;
  `}
`
