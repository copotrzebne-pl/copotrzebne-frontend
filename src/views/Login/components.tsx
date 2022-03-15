import styled from 'styled-components'

export const TextInput = styled.input`
  display: inline-block;
  width: 100%;
  border: 2px solid ${({ theme }) => theme.colors.grey900};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 42px;
  padding: 0 1rem;
`

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 700;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
`

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const LoginButton = styled.button`
  border: none;
  outline: none;
  padding: 0.8rem 1.8rem;
  background-color: ${({ theme }) => theme.colors.ink};
  color: white;
  border-radius: 6px;
  height: 40px;
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  margin-top: 1rem;
`

export const RegisterPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.2rem;
  width: 100%;
  max-width: 320px;
`

export const RegisterTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  lin-height: 1.6;
  color: ${({ theme }) => theme.colors.grey900};
`
