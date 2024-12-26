import { useState } from 'react'
import { Button, Card, Typography, Container, Box, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useToken } from '../../hooks/token'
import { IUserLoginRequestModel } from '../../models/userModel'

export default function LoginView() {
  const { handlePostRequest } = useHttp()
  const { setToken } = useToken()
  const navigate = useNavigate()

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: IUserLoginRequestModel = {
        userEmail,
        userPassword
      }

      const result = await handlePostRequest({
        path: '/admins/login',
        body: payload
      })

      if (result !== null) {
        setToken(result.data.token)
        window.location.reload()
        navigate('/')
      }
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <Container maxWidth='xs'>
        <Card
          sx={{
            mt: 5,
            p: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
            Login
          </Typography>
          <Box
            component='form'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <TextField
              label='E-mail'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={userEmail}
              type='email'
              onChange={(e) => {
                setUserEmail(e.target.value)
              }}
            />

            <TextField
              label='Password'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={userPassword}
              type='password'
              onChange={(e) => {
                setUserPassword(e.target.value)
              }}
            />
            <Button
              sx={{
                m: 1,
                width: '39ch',
                backgroundColor: 'dodgerblue',
                color: '#FFF',
                fontWeight: 'bold'
              }}
              variant={'contained'}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  )
}
