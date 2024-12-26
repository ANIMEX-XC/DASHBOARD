import { useEffect, useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { ICategory3Model } from '../../models/categoryModel'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function Category3EditView() {
  const { handleUpdateRequest, handleGetRequest } = useHttp()
  const navigate = useNavigate()
  const { categoryId1, categoryId2, categoryId3 } = useParams()
  const [categoryName, setCategoryName] = useState('')

  const handleSubmit = async () => {
    try {
      await handleUpdateRequest({
        path: '/category3',
        body: {
          categoryId1,
          categoryId2,
          categoryId3,
          categoryName
        }
      })
      navigate(`/categories/subcategory/${categoryId1}/${categoryId2}`)
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const handleDetailGetCategory = async () => {
    const result: ICategory3Model = await handleGetRequest({
      path: `/category3/detail?categoryId1=${categoryId1}&&categoryId2=${categoryId2}&&categoryId3=${categoryId3}`
    })
    if (result !== null) {
      setCategoryName(result.categoryName)
    }
  }

  useEffect(() => {
    handleDetailGetCategory()
  }, [])

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
            label: 'Edit',
            link: '/categories'
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
            defaultValue={categoryName}
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
