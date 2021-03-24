import React from 'react'
import styled from 'styled-components'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer as MaterialTableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'

function Orders () {
  return allOrderStatus.map(orderStatus => (
    <TableContainer key={orderStatus.title}>
      <TableTitle>
        {orderStatus.title}
      </TableTitle>
      <Table>
        <THead>
          <TableRow>
            <Th>
              <Typography>
                Informações do pedido
              </Typography>
            </Th>
          </TableRow>
        </THead>

        <TableBody>
          <TableRow>
            <TableCell>
              <div>
                <Subtitle>
                  Horário do pedido: 10:20h
                </Subtitle>
              </div>

              <div>
                <Subtitle>
                  Pedido:
                </Subtitle>

                <ul>
                  <li>
                    <Typography>
                      1 pizza MÉDIA de {' '}
                      Frango com Catupiry e Calabresa
                    </Typography>
                  </li>
                </ul>
              </div>

              <div>
                <Subtitle>
                  Endereço de entrega:
                </Subtitle>

                <Typography>
                  Rua Tal, n° 92, {' '}
                  apt 10 <br />
                  Bairro: Xerelete - CEP: 00000-000 <br />
                  Cidade: São Paulo/SP
                </Typography>
              </div>

            </TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  ))
}

const allOrderStatus = [
  {
    title: 'Pedidos pendentes'
  },
  {
    title: 'Pedidos em produção'
  },
  {
    title: 'Saiu para entrega'
  },
  {
    title: 'Pedidos finalizados'
  }
]

const TableContainer = styled(MaterialTableContainer).attrs({
  component: Paper
})`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

const TableTitle = styled(Typography).attrs({
  variant: 'h6'
})`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Subtitle = styled(Typography).attrs({
  variant: 'button'
})`
  font-weight: bold;
`

const THead = styled(TableHead)`
  background: ${({ theme }) => theme.palette.common.black};
`

const Th = styled(TableCell)`
  color: ${({ theme }) => theme.palette.common.white};
`

export default Orders
