import { useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { IWaBlasCreateRequestModel } from '../../models/waBlasModel'

export default function CreateWaBlasView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [waBlas, setWaBlas] = useState<IWaBlasCreateRequestModel>({
    waBlasTitle: '',
    waBlasMessage: ''
  })

  const handleSubmit = async () => {
    console.log(waBlas)
    try {
      await handlePostRequest({
        path: '/wa-blas/send-message',
        body: waBlas
      })
      navigate('/wa-blas')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Wa Blas',
            link: '/wa-blas',
            icon: <IconMenus.waBlas fontSize='small' />
          },
          {
            label: 'Create',
            link: '/wa-blas/create'
          }
        ]}
      />
      <Card
        sx={{
          mt: 5,
          p: 8
        }}
      >
        <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
          Buat Pesan Broadcast
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
            label='Titile'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={waBlas.waBlasTitle}
            type='text'
            onChange={(e) => {
              setWaBlas({
                ...waBlas,
                waBlasTitle: e.target.value
              })
            }}
          />

          <TextField
            label='Pesan'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={waBlas.waBlasMessage}
            type='text'
            onChange={(e) => {
              setWaBlas({
                ...waBlas,
                waBlasMessage: e.target.value
              })
            }}
          />

          <Stack direction={'row'} justifyContent='flex-end'>
            <Button
              sx={{
                m: 1,
                width: '25ch',
                backgroundColor: 'dodgerblue',
                color: '#FFF',
                fontWeight: 'bold'
              }}
              variant={'contained'}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  )
}
