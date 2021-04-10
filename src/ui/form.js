import styled from 'styled-components'
import { Grid } from '@material-ui/core'

export const FormContainer = styled(Grid).attrs({
  container: true,
  spacing: 2
})`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
`

export const Form = styled(Grid).attrs({
  component: 'form',
  container: true,
  item: true,
  spacing: 2,
  xs: 12
})``
