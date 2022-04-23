/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback, useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { useGroupSupplies } from 'hooks/useGroupSupplies'
import { usePanelContext } from 'contexts/panelContext'
import TranslatedEntry from 'components/TranslatedEntry'
import Checkbox from 'components/Checkbox'
import omit from 'lodash.omit'
import { useClickOutside } from 'hooks/useClickOutside'
import { Supply } from 'contexts/types'
import { ReactComponent as FilterIcon } from 'assets/filter-icon.svg'
import TranslatedText from 'components/TranslatedText'
import { getTranslation } from 'utils/translation'
import { translations } from 'translations'
import { useUserContext } from 'contexts/userContext'

const SupplySearchComponent = ({ className }: { className?: string }) => {
  const [inputFocused, setInputFocused] = useState<boolean>(false)
  const [contextMenuOpened, setContextMenuOpened] = useState<boolean>(false)
  const { supplies, selectedSupplies, setSelectedSupplies, fetchSupplies } =
    usePanelContext()
  const { language } = useUserContext()
  const { groupedSupplies, suppliesKeys, searchText, setSearchText } =
    useGroupSupplies(supplies)
  const searchRef = useRef(null)
  const contextMenuRef = useRef(null)
  useClickOutside(searchRef, () => setInputFocused(false))
  useClickOutside(contextMenuRef, () => setContextMenuOpened(false))

  useEffect(() => {
    fetchSupplies()
  }, [])

  const toggleSelectedSupply = useCallback(
    (supply: Supply) => {
      const obj = selectedSupplies[supply.id]
        ? omit(selectedSupplies, [supply.id])
        : { ...selectedSupplies, [supply.id]: supply }
      setSelectedSupplies(obj)
    },
    [selectedSupplies]
  )

  const unselectAllSelectedSupplies = useCallback(() => {
    setSelectedSupplies(omit(selectedSupplies, Object.keys(selectedSupplies)))
  }, [selectedSupplies])

  return (
    <div className={className}>
      <FormGroup ref={searchRef}>
        <Label>
          <TranslatedText value="searchPlaceByName" />
        </Label>
        <SearchRow>
          <TextInput
            id="search"
            name="searchFilter"
            type="text"
            placeholder={getTranslation(
              language,
              translations['inputProductName']
            )}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            onFocus={() => {
              setContextMenuOpened(false)
              setInputFocused(true)
            }}
          />
          <SelectedSuppliesIcon
            active={Object.keys(selectedSupplies).length > 0}
            onClick={() => {
              setContextMenuOpened(!contextMenuOpened)
              setInputFocused(false)
            }}
          >
            <FilterIcon />
            <span>{Object.keys(selectedSupplies).length}</span>
          </SelectedSuppliesIcon>
          {contextMenuOpened && Object.keys(selectedSupplies).length > 0 && (
            <SuppliesContextList ref={contextMenuRef}>
              <CloseIcon onClick={() => setContextMenuOpened(false)} />
              {Object.keys(selectedSupplies).map(supplyId => (
                <Row>
                  <Checkbox
                    id={`selected_supply_${supplyId}`}
                    value=""
                    checked={!!selectedSupplies[supplyId]}
                    onChange={_ =>
                      toggleSelectedSupply(selectedSupplies[supplyId])
                    }
                  />{' '}
                  <SupplyLabel htmlFor={`selected_supply_${supplyId}`}>
                    <TranslatedEntry entry={selectedSupplies[supplyId]} />
                  </SupplyLabel>
                </Row>
              ))}
              <RemoveAll onClick={() => unselectAllSelectedSupplies()}>
                x <TranslatedText value="removeAll" />
              </RemoveAll>
            </SuppliesContextList>
          )}
        </SearchRow>

        {inputFocused && (
          <SuppliesList>
            <CloseIcon onClick={() => setInputFocused(false)} />
            {suppliesKeys.map((priorityNumber, key) => {
              if (!groupedSupplies[priorityNumber]) return null
              return (
                <div key={`supply-${priorityNumber}`}>
                  <CategoryHeader>
                    <TranslatedEntry
                      entry={groupedSupplies[priorityNumber][0].category}
                    />
                  </CategoryHeader>
                  {groupedSupplies[priorityNumber].map(supply => (
                    <SupplyWrapper key={supply.id}>
                      <Checkbox
                        id={`search_supply_${supply.id}`}
                        value=""
                        checked={!!selectedSupplies[supply.id]}
                        onChange={_ => toggleSelectedSupply(supply)}
                      />{' '}
                      <SupplyLabel htmlFor={`search_supply_${supply.id}`}>
                        <TranslatedEntry entry={supply} />
                      </SupplyLabel>
                    </SupplyWrapper>
                  ))}
                </div>
              )
            })}
          </SuppliesList>
        )}
      </FormGroup>
    </div>
  )
}

export default styled(SupplySearchComponent)`
  margin: 0;
  padding: 1rem 1.5em 0 1.5em;
  width: 100%;
  display: flex;
  justify-content: center;
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
  position: relative;
  padding-top: 1rem;
  width: calc(100% - 2.4rem);
  max-width: 500px;
`

const TextInput = styled.input`
  display: inline-block;
  width: calc(100% - 60px);
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 45px;
  padding: 0 1rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 0.7;
  }
`

const SuppliesList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 80px;
  width: 84%;
  min-height: 120px;
  max-height: 320px;
  overflow-y: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadows.small};
  border-top: 1px solid ${({ theme }) => theme.colors.grey400};
  padding: 1.2rem;
`

const CategoryHeader = styled.span`
  font-weight: bold;
  display: flex;
  width: 100%;
  font-size: 1.05rem;
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  color: #333333;
  border-radius: 12px;
`

const SupplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.6rem;
`

const SearchRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  position: relative;
`

const SelectedSuppliesIcon = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 46px;
  border-radius: 30%;
  background-color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
  position: relative;
  ${({ active }) =>
    !active &&
    css`
      pointer-events: none;
    `}
  svg {
    width: 24px;
    height: 24px;
    display: inline-block;
    fill: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-60%, -60%);
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.blue};
    background-color: white;
    font-weight: 600;
    font-size: 12px;
    padding: 2px;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 24px;
    left: 24px;
  }
`
const SuppliesContextList = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 0;
  min-width: 140px;
  min-height: 120px;
  max-height: 320px;
  overflow-y: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.boxShadows.small};
  border-top: 1px solid ${({ theme }) => theme.colors.grey400};
  padding: 1.2rem;
  padding-top: 2rem;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.6rem;
`

const RemoveAll = styled(Row)`
  margin-top: 0.4rem;
  cursor: pointer;
  font-size: 0.85rem;
  margin-bottom: 0;
`

const CloseIcon = styled.button`
  display: inline-block;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  z-index: 100;
  border: none;
  background-color: transparent;
  color: black;
  transition: color 0.6s;
  &:after {
    content: '✕';
    font-size: 16px;
  }
  &:hover,
  &:focus {
    color: rgba(0, 0, 0, 0.4);
  }
`

const SupplyLabel = styled.label`
  cursor: pointer;
`
