import { Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  IMyAddressCreateRequestModel,
  IMyAddressModel
} from '../../models/myAddressModel'
import { useHttp } from '../../hooks/http'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function MyAddressSettingsView() {
  const { handleGetRequest, handleUpdateRequest } = useHttp()

  const [myAddress, setMyAddress] = useState<IMyAddressCreateRequestModel>({
    myAddressName: '',
    myAddressKontak: '',
    myAddressDetail: '',
    myAddressPostalCode: '',
    myAddressProvinsi: '',
    myAddressKabupaten: '',
    myAddressKecamatan: ''
  })

  const getDetailSettings = async () => {
    const result: IMyAddressModel = await handleGetRequest({
      path: '/my-address'
    })
    if (result) {
      setMyAddress(result)
    }
  }

  const handleSubmit = async () => {
    try {
      await handleUpdateRequest({
        path: '/my-address',
        body: myAddress
      })
      window.location.reload()
    } catch (error: unknown) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetailSettings()
  }, [])

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Settings',
            link: '/settings',
            icon: <IconMenus.settings fontSize='small' />
          },
          {
            label: 'Address',
            link: '/settings'
          }
        ]}
      />
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nama'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressName}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressName: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Kontak'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressKontak}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressKontak: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Kode Pos'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressPostalCode}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressPostalCode: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Kecamatan'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressKecamatan}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressKecamatan: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Kabupaten'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressKabupaten}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressKabupaten: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Provinsi'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressProvinsi}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressProvinsi: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Detail'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressDetail}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressDetail: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
        </Grid>
        <Stack direction={'row'} justifyContent={'flex-end'} sx={{ marginTop: 5 }}>
          <Button variant='outlined' onClick={handleSubmit}>
            Update
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
