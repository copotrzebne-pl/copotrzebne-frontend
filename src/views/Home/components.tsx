import { Place } from 'contexts/types'
import styled from 'styled-components'

const PlaceName = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.grey900};
  margin-bottom: 0.4rem;
`

const PlaceDetails = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 0.95rem;
  line-height: 1.2;
`

const Link = styled.a`
  display: inline-block;
  font-size: 0.95rem;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.blue};
  margin-right: 1rem;
  margin-top: 0.45rem;
  width: 100%;
`

const PlaceBoxComponent = ({
  className,
  place
}: {
  className?: string
  place: Place
}) => (
  <div className={className}>
    <PlaceName>{place.name}</PlaceName>
    <PlaceDetails>
      {place.city}, {place.street} {place.apartment}
    </PlaceDetails>
    {place.phone && <Link href={`tel:${place.phone}`}>tel: {place.phone}</Link>}
    {place.email && (
      <Link href={`mailto:${place.email}`}>email: {place.email}</Link>
    )}
  </div>
)

export const PlaceBox = styled(PlaceBoxComponent)`
  margin: 1rem;
  padding: 1.1rem;
  width: 100%;
  max-width: 320px;
  border: 2px solid ${({ theme }) => theme.colors.grey300};
  border-radius: 16px;
`
