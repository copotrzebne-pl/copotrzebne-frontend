import { Place } from 'contexts/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Page, routes } from 'routes'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import { PlaceBox as PlaceDetailedBox } from 'components/PlaceBox'
import TranslatedText from 'components/TranslatedText'

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

const ShowMore = styled.button`
  display: block;
  width: 100%;
  max-width: 250px;
  margin: 0 auto 1em auto;
  padding: 0.8em;
  border: 1px solid #fed500;
  border-radius: 10px;
  background-color: #fff;
  color: #fed500;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #fed500;
    color: #fff;
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
    <div>
      <div className={className}>
        {places
          .slice(0, showMore ? places.length : initialNumber)
          .map(place => (
            <StyledLink
              to={`${routes[Page.PLACE]}/${place.nameSlug}`}
              key={place.id}
            >
              <PlaceBoxDetailedStyled place={place} />
            </StyledLink>
          ))}
      </div>
      <div>
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
    </div>
  )
}

export const WrappedPlaces = styled(WrappedPlacesComponent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
  padding-bottom: 2.2rem;
  ${breakpoint.sm`
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 1.2rem;
  `}
`
