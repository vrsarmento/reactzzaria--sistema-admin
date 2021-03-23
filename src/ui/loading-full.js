import React from 'react'
import t from 'prop-types'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

function LoadingFull ({ size = 30 }) {
  return (
    <LoadingFullContainer>
      <CircularProgress size={size} />
    </LoadingFullContainer>
  )
}

LoadingFull.propTypes = {
  size: t.number
}

const LoadingFullContainer = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

export default LoadingFull
