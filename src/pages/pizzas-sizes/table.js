import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'
import {
  Add,
  Delete,
  Edit
} from '@material-ui/icons'
import {
  TableButton,
  TableContainer,
  TableTitle,
  TableTitleContainer,
  THead,
  Th
} from 'ui'
import { useCollection } from 'hooks'
import { singularOrPlural } from 'utils'
import { PIZZAS_SIZES, NEW, EDIT } from 'routes'

function TablePizzasSizes () {
  const {
    data: pizzasSizes,
    removePizzaSize: remove
  } = useCollection('pizzasSizes')
  const newSizePath = useRouteMatch(`${PIZZAS_SIZES}${NEW}`)

  return (
    <TableContainer>
      <TableTitleContainer>
        <Grid item>
          <TableTitle>
            Tamanhos cadastrados
          </TableTitle>
        </Grid>

        <Grid item>
          <TableButton
            startIcon={<Add />}
            color='primary'
            component={Link}
            to={`${PIZZAS_SIZES}${NEW}`}
            disabled={!!newSizePath}
          >
            Adicionar novo tamanho
          </TableButton>
        </Grid>
      </TableTitleContainer>

      <Table>
        <THead>
          <TableRow>
            <Th>Nome</Th>
            <Th>Tamanho</Th>
            <Th>Fatias</Th>
            <Th>Sabores</Th>
            <Th />
          </TableRow>
        </THead>

        <TableBody>
          {pizzasSizes?.length === 0 && (
            <TableRow>
              <TableCell>
                Ainda não há tamanhos de pizzas cadastrados.
              </TableCell>
            </TableRow>
          )}

          {pizzasSizes && pizzasSizes.map(pizza => (
            <TableRow key={pizza.id}>
              <TableCell><b>{pizza.name}</b></TableCell>
              <TableCell>{pizza.size} cm</TableCell>
              <TableCell>{pizza.slices} fatias</TableCell>
              <TableCell>
                {pizza.flavours}
                {singularOrPlural(pizza.flavours, ' sabor', ' sabores')}
              </TableCell>

              <TableCell align='right'>
                <TableButton
                  startIcon={<Edit />}
                  component={Link}
                  to={`${PIZZAS_SIZES}${EDIT(pizza.id)}`}
                >
                  Editar
                </TableButton>

                <TableButton
                  startIcon={<Delete />}
                  color='secondary'
                  onClick={() => remove(pizza.id)}
                >
                  Remover
                </TableButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TablePizzasSizes
