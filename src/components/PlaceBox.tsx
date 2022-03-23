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
    <PlaceName>{place.name || ''}</PlaceName>
    <PlaceDetails>
      {place.city || ''}, {place.street || ''} {place.buildingNumber || ''}
      {place.apartment ? `/${place.apartment}` : ''}
    </PlaceDetails>
    {place.lastUpdatedAt && (
      <LastUpdate>
        <TranslatedText value="placeLastUpdate" />{' '}
        {`: ${format(Date.parse(place.lastUpdatedAt), 'd. MMM Y H:mm')}`}
      </LastUpdate>
    )}
  </div>
)

export const PlaceBox = styled(PlaceBoxComponent)`
  padding: 1rem 1.2rem;
  background-color: white;
  width: 100%;
  border-radius: 15px;
  box-shadow: 1px -5px 14px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 0.8rem;
  cursor: pointer;
  width: 100%;
`

const PlaceName = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.45;
  margin-bottom: 0.1rem;
  color: #1f2635;
`

const PlaceDetails = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.7rem;
  line-height: 1.2;
  font-weight: 400;
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
