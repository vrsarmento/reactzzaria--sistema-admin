import React, { Suspense } from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import {
  Divider,
  Drawer as MaterialDrawer,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'

const Main = () => (
  <>
    <Drawer variant='permanent'>
      <DrawerContent>
        <Typography variant='h4'>
          React-zzaria
        </Typography>
        <Typography>
          Sistema de Administração
        </Typography>
      </DrawerContent>

      <Divider />

      <List>
        {menuItems.map(item => (
          <ListItem key={item.label} button>
            <ListItemText>{item.label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>

    <Content>
      <Suspense fallback={<LinearProgress />}>
        <Switch>
          <Route>
            <h1>Main</h1>
          </Route>
        </Switch>
      </Suspense>
    </Content>
  </>
)

const menuItems = [
  {
    label: 'Pedidos'
  },
  {
    label: 'Tamanhos de pizzas'
  },
  {
    label: 'Sabores de pizzas'
  }
]

const Content = styled.main`
  margin-left: ${({ theme }) => theme.extend.drawerWidth}px;
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Drawer = styled(MaterialDrawer)`
  .MuiPaper-root {
    width: ${({ theme }) => theme.extend.drawerWidth}px;
  }
`

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(1)}px;
  text-align: center;
`

export default Main
