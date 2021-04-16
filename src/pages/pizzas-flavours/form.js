import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef
} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import {
  Button,
  Grid,
  InputLabel,
  Typography
} from '@material-ui/core'
import { FormContainer, Form, TextField } from 'ui'
import { PIZZAS_FLAVOURS } from 'routes'
import { useCollection, usePizzaFlavour } from 'hooks'

function FormRegisterFlavour () {
  const history = useHistory()
  const { id } = useParams()
  const nameField = useRef()
  const { data: pizzasSizes } = useCollection('pizzasSizes')
  const { initialState, pizza, add, edit } = usePizzaFlavour(id)
  const [pizzaEditable, dispatch] = useReducer(reducer, initialState)

  const texts = useMemo(() => ({
    title: id ? 'Editar sabor' : 'Cadastrar novo sabor',
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
    const action = name.includes('size-') ? 'UPDATE_SIZE' : 'UPDATE_FIELD'
    const fieldName = name.includes('size-') ? name.replace('size-', '') : name

    dispatch({
      type: action,
      payload: {
        [fieldName]: value
      }
    })
  }, [])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()

    const { id, ...data } = pizzaEditable

    const normalizedData = {
      ...data,
      value: Object.entries(data.value)
        .reduce((acc, [sizeId, value]) => {
          acc[sizeId] = +value
          return acc
        }, {})
    }

    if (id) await edit(id, normalizedData)
    else await add(normalizedData)

    history.push(PIZZAS_FLAVOURS)
  }, [add, edit, history, pizzaEditable])

  return (
    <FormContainer>
      <Grid item xs={12}>
        <Typography variant='h6'>
          {texts.title}
        </Typography>
      </Grid>

      <Form onSubmit={handleSubmit}>
        <TextField
          label='Nome do sabor'
          name='name'
          value={pizzaEditable.name}
          onChange={handleChange}
          inputRef={nameField}
        />

        <TextField
          label='Link para uma imagem do sabor'
          name='image'
          value={pizzaEditable.image}
          onChange={handleChange}
        />

        <Grid item xs={12}>
          <InputLabel>Valores (em R$) para cada tamanho:</InputLabel>
        </Grid>

        {pizzasSizes?.map(size => (
          <TextField
            key={size.id}
            label={size.name}
            name={'size-' + size.id}
            value={pizzaEditable.value[size.id] || ''}
            onChange={handleChange}
            xs={3}
          />
        ))}

        <Grid item container justify='flex-end' spacing={2}>
          <Grid item>
            <Button
              variant='contained'
              component={Link}
              to={PIZZAS_FLAVOURS}
            >
              Cancelar
            </Button>
          </Grid>

          <Grid item>
            <Button variant='contained' color='primary' type='submit'>
              {texts.button}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormContainer>
  )
}

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

  if (action.type === 'UPDATE_SIZE') {
    return {
      ...state,
      value: {
        ...state.value,
        ...action.payload
      }
    }
  }

  return state
}

export default FormRegisterFlavour
