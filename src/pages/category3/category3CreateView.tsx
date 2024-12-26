import { useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function Category3CreateView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()
  const { categoryId1, categoryId2 } = useParams()

  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = async () => {
    try {
      await handlePostRequest({
        path: '/category3',
        body: {
          categoryName,
          categoryId1,
          categoryId2
        }
      })
      navigate(`/categories/subcategory/${categoryId1}/${categoryId2}`)
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
            sx={{ m: 1 }}
            value={categoryName}
            type='text'
            onChange={(e) => {
              setCategoryName(e.target.value)
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
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  )
}
