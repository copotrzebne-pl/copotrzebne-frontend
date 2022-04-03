import { Place } from 'contexts/types'
import styled from 'styled-components'
import format from 'date-fns/format'
import TranslatedText from 'components/TranslatedText'

const PlaceBoxComponent = ({
  className,
  place
}: {
  className?: string
  place: Place
}) => (
  <div className={className}>
    <PlaceName place={place}>{place.name || ''}</PlaceName>
    <PlaceDetails>
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
)

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

const PlaceName = styled.h3<{ place: Place }>`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.45;
  margin-bottom: 0.1rem;
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
