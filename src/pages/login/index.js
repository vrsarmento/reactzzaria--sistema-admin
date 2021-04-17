import React from 'react'
import styled from 'styled-components'
import { Button, Grid, Typography } from '@material-ui/core'
import { useAuth } from 'hooks'

function Login () {
  const { login } = useAuth()

  return (
    <Container>
      <Grid container justify='center' spacing={5}>
        <Grid item>
          <Title>React-zzaria</Title>
          <Description>Sistema de administração</Description>
        </Grid>

        <Grid item xs={12} container justify='center'>
          <GitHubButton onClick={login}>
            Entrar com GitHub
          </GitHubButton>
        </Grid>
      </Grid>
    </Container>
  )
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Title = styled(Typography).attrs({
  variant: 'h2'
})`
  font-weight: bold;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    border-bottom: 1px solid #000;
    position: absolute;
    left: 0;
    bottom: -12px;
    width: 120px;
  }
`

const Description = styled(Typography)`
  text-align: right;
`

const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  && {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    max-width: 480px;
    padding: ${({ theme }) => theme.spacing(2)}px;
    text-transform: none;
  }
`

export default Login
