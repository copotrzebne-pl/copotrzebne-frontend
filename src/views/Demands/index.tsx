import PageTitle from 'components/PageTitle'
import { usePanelContext } from 'contexts/panelContext'
import { Place, Supply } from 'contexts/types'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import debounce from 'lodash.debounce'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import DemandComponent from './components/Demand'
import TranslatedText from 'components/TranslatedText'
import TranslatedEntry from 'components/TranslatedEntry'
import { SUPPLIES_CATEGORIES_ORDER } from 'utils/supplies'
import { useUserContext } from 'contexts/userContext'
import { getTranslation } from 'utils/translation'

export default () => {
  const {
    places,
    priorities,
    supplies,
    fetchPlaces,
    fetchDemands,
    fetchPriorities,
    fetchSupplies,
    saveDemand,
    clearDemands
  } = usePanelContext()
  const { language } = useUserContext()
  const { id } = useParams()
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [suppliesLoaded, setSuppliesLoaded] = useState<boolean>(false)
  const [selectedSupplyId, setSelectedSupplyId] = useState<string | null>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [groupedSupplies, setGroupedSupplies] = useState<
    Record<string, Supply[]>
  >({})

  const groupSupplies = useCallback(
    (suppliesList: Supply[]): Record<string, Supply[]> =>
      suppliesList.reduce(
        (acc, item) => (
          (acc[item.category.nameEn] = [
            ...(acc[item.category.nameEn] || []),
            item
          ]),
          acc
        ),
        {} as Record<string, Supply[]>
      ),
    [supplies]
  )

  useEffect(() => {
    fetchPlaces()
    return clearDemands
  }, [])

  useEffect(() => {
    const place = places.filter(elem => elem.id === id)[0]
    if (place && place.id) {
      setSelectedPlace(place)
      fetchDemands(place.id)
      fetchPriorities(place.id)
      fetchSupplies(place.id)
    }
  }, [places])

  useEffect(() => {
    if (!supplies.length) return
    setSuppliesLoaded(true)
    setGroupedSupplies(groupSupplies(supplies))
  }, [supplies])

  const searchDebounced = useCallback(
    debounce(text => {
      if (!text) setGroupedSupplies(groupSupplies(supplies))
      setGroupedSupplies(
        groupSupplies(
          supplies.filter(supply =>
            getTranslation(language, supply).toLowerCase().includes(text)
          )
        )
      )
    }, 300),
    [language, supplies]
  )

  useEffect(() => {
    if (!suppliesLoaded) return
    searchDebounced(searchText)
  }, [suppliesLoaded, searchText])

  return (
    <Container>
      <PageTitle>
        <TranslatedText value="chooseCurrentDemands" />
      </PageTitle>
      <FormGroup>
        <Label>Szukaj</Label>
        <TextInput
          id="search"
          type="text"
          placeholder="Szukaj"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
      </FormGroup>
      <SuppliesWrapper>
        {[
          ...SUPPLIES_CATEGORIES_ORDER,
          ...Object.keys(groupedSupplies).filter(
            nameEn => !SUPPLIES_CATEGORIES_ORDER.includes(nameEn)
          )
        ].map((nameEn, key) => {
          if (!groupedSupplies[nameEn]) return null
          return (
            <div key={key}>
              <CategoryHeader>
                <TranslatedEntry entry={groupedSupplies[nameEn][0].category} />
              </CategoryHeader>
              {groupedSupplies[nameEn].map((supply, index) => (
                <DemandComponent
                  key={index}
                  placeId={selectedPlace?.id || ''}
                  supply={supply}
                  priorities={priorities}
                  saveDemand={saveDemand}
                  isSelected={supply.id === selectedSupplyId}
                  onSelected={(supplyId: string) =>
                    setSelectedSupplyId(supplyId)
                  }
                />
              ))}
            </div>
          )
        })}
      </SuppliesWrapper>
    </Container>
  )
}
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

const SuppliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.8rem 1.2rem 3.4rem;
`

const CategoryHeader = styled.span`
  display: flex;
  width: 100%;
  padding: 0.6rem 0.6rem;
  margin: 0.8rem 0;
  background-color: #eeeeee;
  color: #333333;

  border-radius: 6px;
  font-size: 0.95rem;
  border: 2px solid ${({ theme }) => theme.colors.blue};
`

export const TextInput = styled.input`
  display: inline-block;
  width: 100%;
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

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 400;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1.2rem;
`
