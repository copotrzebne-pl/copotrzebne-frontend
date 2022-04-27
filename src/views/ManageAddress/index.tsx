import { useEffect, useState, useCallback, SyntheticEvent } from 'react'
import Button from 'components/Button'
import {
  Form,
  FormGroup,
  Label,
  RequiredDecorator,
  TextInput
} from 'components/forms'
import PageTitle from 'components/PageTitle'
import { PlaceDto } from 'contexts/types'
import { useUserContext } from 'contexts/userContext'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import TranslatedText from 'components/TranslatedText'
import { usePanelContext } from 'contexts/panelContext'
import { Page, routes } from 'routes'

export default () => {
  const { id } = useParams()
  const { savePlace, ownedPlaces, fetchOwnedPlaces } = useUserContext()
  const { selectedPlace, fetchPlace, clearSelectedPlace } = usePanelContext()
  const [editedPlace, setEditedPlace] = useState<PlaceDto>({
    id,
    name: '',
    city: '',
    street: '',
    buildingNumber: '',
    apartment: '',
    comment: '',
    email: '',
    phone: '',
    workingHours: '',
    latitude: null,
    longitude: null,
    bankAccount: '',
    placeLink: { homepage: '', facebook: '', signup: '', fundraising: '' }
  })

  useEffect(() => {
    if (id && id !== 'new') fetchPlace(id)
    return () => {
      clearSelectedPlace()
    }
  }, [id])

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  useEffect(() => {
    selectedPlace && setEditedPlace(selectedPlace)
  }, [selectedPlace])

  const setValue = useCallback(
    (name: string, value: string | Record<string, string>) => {
      console.log(editedPlace)
      setEditedPlace({ ...editedPlace, [name]: value })
    },
    [editedPlace]
  )

  const setPlaceLink = useCallback(
    (name: string, value: string) => {
      const placeLink = { ...editedPlace.placeLink, [name]: value }
      setValue('placeLink', placeLink)
    },
    [editedPlace]
  )

  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault()
      if (
        !editedPlace.name ||
        !editedPlace.city ||
        !editedPlace.street ||
        !editedPlace.buildingNumber
      ) {
        return
      }
      const redirectRoute =
        ownedPlaces.length < 2 || id === 'new'
          ? routes[Page.PANEL]
          : routes[Page.MANAGE_PLACE].replace(':id', id as string)

      savePlace(editedPlace, redirectRoute)
    },
    [selectedPlace, editedPlace, id]
  )

  return (
    <Container>
      <PageTitle>{selectedPlace?.name || 'Dodaj nowe miejsce'}</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>
            <TranslatedText value="name" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="name"
            type="text"
            placeholder="name"
            required
            value={editedPlace.name || ''}
            onChange={e => setValue('name', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="city" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="city"
            type="text"
            placeholder="city"
            required
            value={editedPlace.city || ''}
            onChange={e => setValue('city', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="street" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="street"
            type="text"
            placeholder="street"
            required
            value={editedPlace.street || ''}
            onChange={e => setValue('street', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="buildingNumber" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="buildingNumber"
            type="text"
            placeholder="building number"
            required
            value={editedPlace.buildingNumber || ''}
            onChange={e => setValue('buildingNumber', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="apartmentNumber" />
          </Label>
          <TextInput
            id="apartment"
            type="text"
            placeholder="apartment"
            value={editedPlace.apartment || ''}
            onChange={e => setValue('apartment', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="workingHours" />
          </Label>
          <TextInput
            id="workingHours"
            type="text"
            placeholder="working hours"
            value={editedPlace.workingHours || ''}
            onChange={e => setValue('workingHours', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="comment" />
          </Label>
          <TextInput
            id="comment"
            type="text"
            placeholder="comment"
            value={editedPlace.comment || ''}
            onChange={e => setValue('comment', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="email" />
          </Label>
          <TextInput
            id="email"
            type="text"
            placeholder="email"
            value={editedPlace.email || ''}
            onChange={e => setValue('email', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="phone" />
          </Label>
          <TextInput
            id="phone"
            type="text"
            placeholder="phone"
            value={editedPlace.phone || ''}
            onChange={e => setValue('phone', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="bankAccount" />
          </Label>
          <TextInput
            id="bankAccount"
            type="text"
            placeholder="bank account"
            value={editedPlace.bankAccount || ''}
            onChange={e => setValue('bankAccount', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="homepageLink" />
          </Label>
          <TextInput
            id="homepageLink"
            type="text"
            placeholder="home page"
            value={editedPlace.placeLink?.homepage || ''}
            onChange={e => setPlaceLink('homepage', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="facebookLink" />
          </Label>
          <TextInput
            id="facebooklink"
            type="text"
            placeholder="facebook link"
            value={editedPlace.placeLink?.facebook || ''}
            onChange={e => setPlaceLink('facebook', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="signupLink" />
          </Label>
          <TextInput
            id="signuplink"
            type="text"
            placeholder="signup link"
            value={editedPlace.placeLink?.signup || ''}
            onChange={e => setPlaceLink('signup', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="fundraisingLink" />
          </Label>
          <TextInput
            id="fundraisinglink"
            type="text"
            placeholder="fundraising link"
            value={editedPlace.placeLink?.fundraising || ''}
            onChange={e => setPlaceLink('fundraising', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="latitude" />
          </Label>
          <TextInput
            id="latitude"
            type="text"
            placeholder="latitude"
            value={editedPlace.latitude || ''}
            onChange={e => setValue('latitude', e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <TranslatedText value="longitude" />
          </Label>
          <TextInput
            id="longitude"
            type="text"
            placeholder="longitude"
            value={editedPlace.longitude || ''}
            onChange={e => setValue('longitude', e.target.value)}
          />
        </FormGroup>
        <ButtonWrapper>
          <Button type="submit" onClick={handleSubmit}>
            <TranslatedText value="save" />
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 2.2rem 2rem 2rem;
`
