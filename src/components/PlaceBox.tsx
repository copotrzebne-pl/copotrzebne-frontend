import { Place } from 'contexts/types'
import styled from 'styled-components'

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
      {place.city || ''}, {place.street || ''} {place.apartment || ''}
    </PlaceDetails>
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
