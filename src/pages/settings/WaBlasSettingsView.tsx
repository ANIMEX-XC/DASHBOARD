import { Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http'
import {
  IWaBlasSettingCreateRequestModel,
  IWaBlasSettingModel
} from '../../models/waBlasSettingMode'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function WaBlasSettingsView() {
  const { handleGetRequest, handleUpdateRequest } = useHttp()

  const [waBlasSetting, setWaBlasSetting] = useState<IWaBlasSettingCreateRequestModel>({
    waBlasSettingToken: '',
    waBlasSettingServer: ''
  })

  const getDetailSettings = async () => {
    const result: IWaBlasSettingModel = await handleGetRequest({
      path: '/wa-blas/settings'
    })

    if (result) {
      setWaBlasSetting(result)
    }
  }

  const handleSubmit = async () => {
    try {
      await handleUpdateRequest({
        path: '/wa-blas/settings',
        body: waBlasSetting
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
            label: 'Wablas',
            link: '/settings'
          }
        ]}
      />
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Wablas Token'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={waBlasSetting.waBlasSettingToken}
              onChange={(e) =>
                setWaBlasSetting({ ...waBlasSetting, waBlasSettingToken: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Wablas Server'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={waBlasSetting.waBlasSettingServer}
              onChange={(e) =>
                setWaBlasSetting({
                  ...waBlasSetting,
                  waBlasSettingServer: e.target.value
                })
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
