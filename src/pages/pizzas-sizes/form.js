import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  Button,
  Grid,
  Typography
} from '@material-ui/core'
import { TextField } from 'ui'
import { PIZZAS_SIZES } from 'routes'
import { usePizzaSize } from 'hooks'

function FormRegisterSize () {
  const history = useHistory()
  const { id } = useParams()
  const { initialState, pizza, add, edit } = usePizzaSize(id)
  const [pizzaEditable, dispatch] = useReducer(reducer, initialState)
  const nameField = useRef()

  const texts = useMemo(() => ({
    title: id ? 'Editar tamanho' : 'Cadastrar novo tamanho',
    button: id ? 'Salvar' : 'Cadastrar'
  }), [id])

  useEffect(() => {
    nameField.current.focus()
  }, [id])

  useEffect(() => {
    dispatch({
      type: 'EDIT',
      payload: pizza
    })
  }, [pizza])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        [name]: value
      }
    })
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    const { id, name, size, slices, flavours } = pizzaEditable
    const normalizedData = {
      name,
      size: +size,
      slices: +slices,
      flavours: +flavours
    }

    if (id) await edit(id, normalizedData)
    else await add(normalizedData)

    history.push(PIZZAS_SIZES)
  }, [add, edit, history, pizzaEditable])

  return (
    <Container>
      <Grid item xs={12}>
        <Typography variant='h6'>
          {texts.title}
        </Typography>
      </Grid>

      <Form onSubmit={handleSubmit}>
        <TextField
          label='Nome para esse tamanho'
          name='name'
          value={pizzaEditable.name}
          onChange={handleChange}
          inputRef={nameField}
        />

        <TextField
          label='Diâmetro da pizza em centímetros (cm)'
          name='size'
          value={pizzaEditable.size}
          onChange={handleChange}
        />

        <TextField
          label='Quantidade de fatias'
          name='slices'
          value={pizzaEditable.slices}
          onChange={handleChange}
        />

        <TextField
          label='Quantidade de sabores'
          name='flavours'
          value={pizzaEditable.flavours}
          onChange={handleChange}
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
              {texts.title}
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

function reducer (state, action) {
  if (action.type === 'EDIT') {
    return action.payload
  }

  if (action.type === 'UPDATE_FIELD') {
    return {
      ...state,
      ...action.payload
    }
  }

  return state
}

export default FormRegisterSize
