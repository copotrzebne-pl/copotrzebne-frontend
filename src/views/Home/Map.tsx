/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useState, useEffect } from 'react'
import { Map, Marker, Overlay } from 'pigeon-maps'
import { stamenToner } from 'pigeon-maps/providers'
import { Place } from 'contexts/types'
import styled from 'styled-components'
import { PlaceBoxDetailedStyled } from './components'
import { Link } from 'react-router-dom'
import { Page, routes } from 'routes'
import { PlaceBox } from '../../components/PlaceBox'

export const OrganizationsMap = ({ places }: { places: Place[] }) => {
  const [mapHeight, setMapHeight] = useState<number>(600)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    50.0647, 19.945
  ])
  const [mapZoom, setMapZoom] = useState<number>(12)

  useEffect(() => {
    setMapHeight(document.body.clientHeight - 84)
  }, [])
  return (
    <Map
      provider={stamenToner}
      dprs={[1, 2]}
      height={mapHeight}
      center={mapCenter}
      zoom={mapZoom}
      onBoundsChanged={({ center, zoom }) => {
        setMapCenter(center)
        setMapZoom(zoom)
      }}
    >
      {places
        .filter(place => !!place.latitude && !!place.longitude)
        .map((place, index) => (
          <Marker
            key={index}
            width={50}
            anchor={[parseFloat(place.latitude!), parseFloat(place.longitude!)]}
            color={selectedPlace?.id === place.id ? '#00e676' : '#0076FF'}
            onClick={() => {
              setSelectedPlace(place)
              setMapCenter([
                parseFloat(place.latitude!),
                parseFloat(place.longitude!)
              ])
            }}
          />
        ))}
      {selectedPlace !== null && (
        <Overlay
          offset={[110, 0]}
          anchor={[
            parseFloat(selectedPlace.latitude!),
            parseFloat(selectedPlace.longitude!)
          ]}
        >
          <InfoBox>
            <CloseIcon onClick={() => setSelectedPlace(null)} />
            <Link to={`${routes[Page.PLACE]}/${selectedPlace.nameSlug}`}>
              <PlaceBox place={selectedPlace} />
            </Link>
          </InfoBox>
        </Overlay>
      )}
    </Map>
  )
}

const InfoBox = styled.div`
  width: 220px;
  height: 160px;
  background-color: white;
  position: relative;
`

const CloseIcon = styled.button`
  display: inline-block;
  position: absolute;
  right: 7px;
  top: 7px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 100;
  border: none;
  background-color: transparent;
  color: black;
  transition: color 0.6s;
  &:after {
    content: '✕';
    font-size: 16px;
  }
  &:hover,
  &:focus {
    color: rgba(0, 0, 0, 0.4);
  }
`
