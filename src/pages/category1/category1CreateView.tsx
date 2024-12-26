import { useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import ButtonUploadFile from '../../components/buttons/buttonUpload'

export default function Category1CreateView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [categoryName, setCategoryName] = useState('')
  const [categoryIcon, setCategoryIcon] = useState('')

  const handleSubmit = async () => {
    try {
      await handlePostRequest({
        path: '/category1',
        body: {
          categoryName,
          categoryIcon
        }
      })
      navigate('/categories')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Category',
            link: '/categories',
            icon: <IconMenus.category fontSize='small' />
          },
          {
            label: 'Create',
            link: '/categories/create'
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
          Tambah Kategori
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
            label='Nama Kategori'
            id='outlined-start-adornment'
            value={categoryName}
            type='text'
            onChange={(e) => {
              setCategoryName(e.target.value)
            }}
          />

          <Box sx={{ my: 3 }}>
            <Typography color={'gray'}>Icon</Typography>
            <ButtonUploadFile onUpload={(image) => setCategoryIcon(image)} />
            <Stack direction={'row'} flexWrap='wrap' spacing={2}>
              {categoryIcon && (
                <Stack spacing={2}>
                  <img
                    src={categoryIcon}
                    style={{
                      marginTop: 10,
                      width: 200,
                      height: 200
                    }}
                  />
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => setCategoryIcon('')}
                  >
                    Delete
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
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
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  )
}
