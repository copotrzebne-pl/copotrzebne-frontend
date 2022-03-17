import { Place } from 'contexts/types'
import { useUserContext } from 'contexts/userContext'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import marker from 'assets/marker.svg'
import { Page, routes } from 'routes'
import { PlaceBox } from 'components/PlaceBox'
import { breakpoint } from 'themes/breakpoints'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'components/Button'

const AdminPanel = ({ className }: { className?: string }) => {
  const { ownedPlaces, fetchOwnedPlaces } = useUserContext()
  const navigate = useNavigate()
  const [groupedPlaces, setGroupedPlaces] = useState<Record<string, Place[]>>(
    {}
  )

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  useEffect(() => {
    setGroupedPlaces(groupOwnedPlaces())
  }, [ownedPlaces])

  const groupOwnedPlaces = useCallback(
    (): Record<string, Place[]> =>
      ownedPlaces.reduce(
        (acc, item) => (
          (acc[item.city] = [...(acc[item.city] || []), item]), acc
        ),
        {} as Record<string, Place[]>
      ),
    [ownedPlaces]
  )

  return (
    <div className={className}>
      <PlacesWrapper>
        <ButtonWrapper>
          <Button
            onClick={() =>
              navigate(routes[Page.MANAGE_PLACE].replace(':id', 'new'))
            }
          >
            Dodaj miejsce
          </Button>
        </ButtonWrapper>
        {Object.keys(groupedPlaces).map((cityName, key) => (
          <PlaceWrapper key={key}>
            <Title>
              <Marker src={marker} alt="marker" />
              {cityName}
            </Title>
            <PlacesWrapper>
              {groupedPlaces[cityName].map((place, index) => (
                <StyledLink
                  key={index}
                  to={`${routes[Page.MANAGE_PLACE].replace(
                    ':id',
                    place?.id || ''
                  )}`}
                >
                  <PlaceBox place={place} />
                </StyledLink>
              ))}
            </PlacesWrapper>
          </PlaceWrapper>
        ))}
      </PlacesWrapper>
    </div>
  )
}

export default styled(AdminPanel)`
  width: 100%;
`

const PlacesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  padding-bottom: 2.2rem;
  ${breakpoint.sm`
    padding-bottom: 1.2rem;
  `}
`

const PlaceWrapper = styled.div`
  width: 100%;
`

const StyledLink = styled(Link)`
  width: 100%;
`

const Title = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.68rem;
  padding: 2.6rem 1.2rem 1.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`

const Marker = styled.img`
  height: 25px;
  width: auto;
  display: inline-block;
  margin-right: 0.7rem;
  margin-bottom: 2px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 2.2rem;
  padding: 0 1.2rem;
`
