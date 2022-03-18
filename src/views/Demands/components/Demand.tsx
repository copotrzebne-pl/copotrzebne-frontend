import Button from 'components/Button'
import { DemandDTO, Priority, Supply } from 'contexts/types'
import { useCallback, useState } from 'react'
import styled from 'styled-components'

const Demand = ({
  className,
  supply,
  placeId,
  saveDemand,
  priorities,
  onSelected,
  isSelected
}: {
  className?: string
  supply: Supply
  placeId: string
  priorities: Priority[]
  saveDemand: (demand: DemandDTO) => Promise<boolean>
  onSelected: (supplyId: string) => void
  isSelected: boolean
}) => {
  const [addedToList, setAddedToList] = useState<boolean>(false)
  const [demandDTO, setDemandDTO] = useState<DemandDTO>({
    placeId,
    supplyId: supply.id,
    comment: '',
    priorityId: ''
  })

  const handleDemandSave = useCallback(() => {
    if (!demandDTO.priorityId && !demandDTO.placeId) return
    saveDemand({ ...demandDTO, placeId }).then((saved: boolean) => {
      if (saved) {
        onSelected('')
        setAddedToList(true)
      }
    })
  }, [demandDTO, placeId])

  return (
    <div className={className}>
      <DemandTitle onClick={() => onSelected(supply.id)}>
        <Title>
          {addedToList && <CheckIcon />} <span>{supply.namePl}</span>
        </Title>
        <AddIcon>+</AddIcon>
      </DemandTitle>
      {isSelected && (
        <DemandDetails>
          <PrioritiesWrapper>
            {priorities.map(priority => (
              <SelectPriority
                selected={priority.id === demandDTO.priorityId}
                onClick={() =>
                  setDemandDTO({ ...demandDTO, priorityId: priority.id })
                }
              >
                {priority.namePl}
              </SelectPriority>
            ))}
          </PrioritiesWrapper>
          <FormGroup>
            <Label>Komentarz</Label>
            <TextInput
              id="comment"
              type="text"
              placeholder="Dodaj komentarz"
              value={demandDTO.comment || ''}
              onChange={e =>
                setDemandDTO({ ...demandDTO, comment: e.target.value })
              }
            />
          </FormGroup>
          <StyledButton onClick={handleDemandSave}>Dodaj do listy</StyledButton>
        </DemandDetails>
      )}
    </div>
  )
}

export default styled(Demand)`
  padding: 1rem 1.2rem;
  background-color: white;
  width: 100%;
  border-radius: 15px;
  box-shadow: 1px -5px 14px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.8rem;
  cursor: pointer;
  width: 100%;
`

const DemandTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const AddIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #333;
  border: 1px solid #333;
  border-radius: 50%;
`

const DemandDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  margin: 1.4rem 0 1rem;
`

const TextInput = styled.input`
  display: inline-block;
  width: 100%;
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 45px;
  padding: 0 1rem;
  margin-top: 0.8rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 0.7;
  }
`

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 400;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const PrioritiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`

const SelectPriority = styled.div<{ selected: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 0.4rem 1.2rem;
  width: 100%;
  margin: 0.6rem 0;
  ${({ selected }) =>
    selected &&
    `
    border: 2px solid #0076FF;
  `}
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CheckIcon = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 0.8rem;
  background: #00e676;
  position: relative;
  color: white;
  &:after {
    content: '\\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`
