import { useUserContext } from 'contexts/userContext'
import { useEffect } from 'react'
import styled from 'styled-components'

const PlaceManagerPanel = ({ className }: { className?: string }) => {
  const { fetchOwnedPlaces } = useUserContext()

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  return <div className={className}>Place manager panel</div>
}

export default styled(PlaceManagerPanel)`
  width: 100%;
`
