import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'

const Main = () => (
  <>
    <Suspense fallback={<LinearProgress />}>
      <Switch>
        <Route>
          <h1>Main</h1>
        </Route>
      </Switch>
    </Suspense>
  </>
)

export default Main
