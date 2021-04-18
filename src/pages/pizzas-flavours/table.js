import React from 'react'
import t from 'prop-types'
import { Link, useRouteMatch } from 'react-router-dom'
import {
  Grid,
  List,
  ListItem as MaterialListItem,
  ListItemText,
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
import { PIZZAS_FLAVOURS, NEW, EDIT } from 'routes'
import { toMoney } from 'utils'

function TablePizzasFlavours () {
  const { data: pizzasFlavours, remove } = useCollection('pizzasFlavours')
  const { data: pizzasSizes } = useCollection('pizzasSizes')
  const newFlavourPath = useRouteMatch(`${PIZZAS_FLAVOURS}${NEW}`)

  return (
    <TableContainer>
      <TableTitleContainer>
        <Grid item>
          <TableTitle>
            Sabores cadastrados
          </TableTitle>
        </Grid>

        <Grid item>
          <TableButton
            startIcon={<Add />}
            color='primary'
            component={Link}
            to={`${PIZZAS_FLAVOURS}${NEW}`}
            disabled={!!newFlavourPath}
          >
            Adicionar novo sabor
          </TableButton>
        </Grid>
      </TableTitleContainer>

      <Table>
        <THead>
          <TableRow>
            <Th>Foto</Th>
            <Th>Nome</Th>
            <Th>Valores</Th>
            <Th />
          </TableRow>
        </THead>

        <TableBody>
          {pizzasFlavours?.length === 0 && (
            <TableRow>
              <TableCell>
                Ainda não há sabores de pizzas cadastrados.
              </TableCell>
            </TableRow>
          )}

          {pizzasFlavours && pizzasFlavours.map(flavour => (
            <TableRow key={flavour.id}>
              <TableCell>
                <img src={flavour.image} alt={flavour.name} width='50' />
              </TableCell>
              <TableCell><b>{flavour.name}</b></TableCell>
              <TableCell>
                <List>
                  {Object.entries(flavour.value).map(([sizeId, value]) => {
                    const sizeName = pizzasSizes
                      ?.find(s => s.id === sizeId)
                      ?.name

                    return (
                      <ListItem
                        key={`${flavour.id}-${sizeId}`}
                        name={sizeName}
                        value={value}
                      />
                    )
                  })}
                </List>
              </TableCell>

              <TableCell align='right'>
                <TableButton
                  startIcon={<Edit />}
                  component={Link}
                  to={`${PIZZAS_FLAVOURS}${EDIT(flavour.id)}`}
                >
                  Editar
                </TableButton>

                <TableButton
                  startIcon={<Delete />}
                  color='secondary'
                  onClick={() => remove(flavour.id)}
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

const ListItem = ({ name = '', value }) => (
  <MaterialListItem>
    <ListItemText>
      <strong>{name}: </strong> {toMoney(value)}
    </ListItemText>
  </MaterialListItem>
)

ListItem.propTypes = {
  name: t.string,
  value: t.number.isRequired
}

export default TablePizzasFlavours
