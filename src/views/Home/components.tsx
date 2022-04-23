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
  height: 100%;
  ${breakpoint.sm`
    margin-right: 0.8rem;
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
              <PlaceDetailedBox place={place} />
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
  padding: 0 1rem;
  padding-bottom: 2.2rem;
  display: grid;
  grid-auto-rows: max-content;
  grid-column-gap: 1rem;
  grid-row-gap: 1.6rem;
  grid-template-columns: 1fr;

  ${breakpoint.xs`
    grid-template-columns: 1fr 1fr;
  `}

  ${breakpoint.s`
    grid-template-columns: 1fr 1fr 1fr;
  `}
  
  ${breakpoint.sm`
    grid-template-columns: 1fr;
  `}
  
  ${breakpoint.xm`
    grid-template-columns: 1fr 1fr;
  `}
  
  ${breakpoint.l`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`
