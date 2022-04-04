import { Place } from 'contexts/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Page, routes } from 'routes'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import { PlaceBox as PlaceDetailedBox } from 'components/PlaceBox'
import TranslatedText from 'components/TranslatedText'

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
    <PlaceName>{place.name}</PlaceName>
    <PlaceDetails>
      {place.city}, {place.street} {place.apartment}
    </PlaceDetails>
  </div>
)

export const PlaceBox = styled(PlaceBoxComponent)`
  padding: 1rem 1.2rem;
  background-color: white;
  width: 100%;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  margin-bottom: 0.8rem;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  width: 100%;
  ${breakpoint.sm`
    max-width: 220px;
    margin-right: 0.8rem;
  `}
`

export const PlaceBoxDetailedStyled = styled(PlaceDetailedBox)`
  ${breakpoint.sm`
    min-height: 160px;
  `}
`

const ShowMore = styled.span`
  display: inline-block;
  width: 100%;
  padding: 0.3rem 0;
  font-size: 0.85rem;
  color: black;
  cursor: pointer;
  font-weight: 500;
  margin-left: 0.3rem;
  &:hover {
    text-decoration: underline;
  }
`

export const WrappedPlacesComponent = ({
  places,
  initialNumber,
  className
}: {
  className?: string
  places: Place[]
  initialNumber: number
}) => {
  const [showMore, setShowMore] = useState<boolean>(false)
  return (
    <div className={className}>
      {places.slice(0, showMore ? places.length : initialNumber).map(place => (
        <StyledLink to={`${routes[Page.PLACE]}/${place.id}`} key={place.id}>
          <PlaceBoxDetailedStyled place={place} />
        </StyledLink>
      ))}
      {places.length > initialNumber && (
        <ShowMore onClick={() => setShowMore(!showMore)}>
          {showMore ? (
            <TranslatedText value="showLess" />
          ) : (
            <TranslatedText value="showMore" />
          )}
        </ShowMore>
      )}
    </div>
  )
}

export const WrappedPlaces = styled(WrappedPlacesComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  padding-bottom: 2.2rem;
  ${breakpoint.sm`
    padding-bottom: 1.2rem;
    flex-direction: row;
    flex-wrap: wrap;
  `}
`
