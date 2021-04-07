import React, { useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  Grid,
  Typography
} from '@material-ui/core'
import { TextField } from 'ui'
import { PIZZAS_SIZES } from 'routes'
import { useCollection } from 'hooks'

function FormRegisterSize () {
  const { add } = useCollection('pizzasSizes')
  const history = useHistory()

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const { name, size, slices, flavours } = e.target.elements
    const normalizedData = {
      name: name.value,
      size: +size.value,
      slices: +slices.value,
      flavours: +flavours.value
    }
    await add(normalizedData)
    history.push(PIZZAS_SIZES)
  }, [add, history])

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant='h6'>
          Cadastrar novo tamanho
        </Typography>
      </Grid>

      <Form onSubmit={handleSubmit}>
        <TextField
          label='Nome para esse tamanho'
          name='name'
        />

        <TextField
          label='Diâmetro da pizza em centímetros (cm)'
          name='size'
        />

        <TextField
          label='Quantidade de fatias'
          name='slices'
        />

        <TextField
          label='Quantidade de sabores'
          name='flavours'
        />

        <Grid item container justify='flex-end' spacing={2}>
          <Grid item>
            <Button
              variant='contained'
              component={Link}
              to={PIZZAS_SIZES}
            >
              Cancelar
            </Button>
          </Grid>

          <Grid item>
            <Button variant='contained' color='primary' type='submit'>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  )
}

const Container = styled(Grid).attrs({
  container: true,
  spacing: 2
})`
  margin-bottom: ${({ theme }) => theme.spacing(5)}px;
`

const Form = styled(Grid).attrs({
  component: 'form',
  container: true,
  item: true,
  spacing: 2,
  xs: 12
})``

export default FormRegisterSize
