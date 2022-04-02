import { Place } from 'contexts/types'
import styled from 'styled-components'
import format from 'date-fns/format'
import TranslatedText from 'components/TranslatedText'
import trashIconUrl from '../assets/trash-icon.svg'
import { useUserContext } from '../contexts/userContext'
import { useEffect, useState } from 'react'
import { userContextProvider } from '../contexts/userContext'
import { checkIfAuthorized } from '../utils/session'

const PlaceBoxComponent = ({
  className,
  place
}: {
  className?: string
  place: Place
}) => {
  const {deletePlace} = useUserContext()
  const { user} = useUserContext()
  const [authorized] = useState<boolean>(() =>
    checkIfAuthorized()
  )

  return (
  <div className={className}>
    <PlaceName place={place}>{place.name || ''}</PlaceName>
    {authorized && user?.role === 'admin' && <TrashIcon
      src={trashIconUrl}
      alt="remove"
      onClick={() => window.confirm('Czy na pewno usunąć organizację?') ? deletePlace(place.id) : place.id}
    />}
    <PlaceDetails place={place}>
      {place.city || ''}, {place.street || ''} {place.buildingNumber || ''}
      {place.apartment ? `/${place.apartment}` : ''}
    </PlaceDetails>
    <PlaceDetails>{place.workingHours || ''}</PlaceDetails>
    {place.lastUpdatedAt && (
      <LastUpdate>
        <TranslatedText value="placeLastUpdate" />{' '}
        {`${format(Date.parse(place.lastUpdatedAt), 'd. MMM Y H:mm')}`}
      </LastUpdate>
    )}
    {!place.lastUpdatedAt && (
      <LastUpdate>
        <TranslatedText value="noOngoingCollections" />
      </LastUpdate>
    )}
  </div>
)}

export const PlaceBox = styled(PlaceBoxComponent)`
  padding: 1rem 1.2rem;
  background-color: white;
  width: 100%;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }
`

const PlaceName = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.45;
  margin-bottom: 0.1rem;
  display: inline-block;
  width: 90%;
  color: ${props => (props.place.lastUpdatedAt ? '#1f2635' : '#8d99b2')};
`

const PlaceDetails = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.7rem;
  line-height: 1.2;
  font-weight: 500;
  color: #8d99b2;
`

const LastUpdate = styled.div`
  width: 100%;
  display: inline-block;
  text-align: end;
  font-size: 0.65rem;
  color: #8d99b2;
  padding-top: 0.2rem;
`
const TrashIcon = styled.img`
  display: inline-block;
  padding: 0.3rem;
  height: 28px;
  width: auto;
  cursor: pointer;
`
