import { useEffect, useState } from 'react'
import { Button, Card, Typography, Box, TextField, Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useHttp } from '../../../hooks/http'
import BreadCrumberStyle from '../../../components/breadcrumb/Index'
import { IconMenus } from '../../../components/icon'
import {
  IBankSettingsModel,
  IBankSettingsUpdateRequestModel
} from '../../../models/bankSettingsModel'

export default function EditBankSettingView() {
  const { handleUpdateRequest, handleGetRequest } = useHttp()
  const navigate = useNavigate()
  const { bankSettingId } = useParams()
  const [bankSettings, setBankSettings] = useState<IBankSettingsUpdateRequestModel>({
    bankSettingId: '',
    bankSettingName: '',
    bankSettingNumber: '',
    bankSettingOwnerName: ''
  })

  const handleSubmit = async () => {
    try {
      await handleUpdateRequest({
        path: '/bank/settings',
        body: bankSettings
      })
      navigate('/settings')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const handleGetDetailBankSettings = async () => {
    const result: IBankSettingsModel = await handleGetRequest({
      path: '/bank/settings/detail/' + bankSettingId
    })
    if (result !== null) {
      setBankSettings(result)
    }
  }

  useEffect(() => {
    handleGetDetailBankSettings()
  }, [])

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Settings',
            link: '/settings',
            icon: <IconMenus.settings fontSize='small' />
          },
          {
            label: 'Bank',
            link: '/settings'
          },
          {
            label: 'Edit',
            link: '/settings/bank/edit/' + bankSettingId
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
          Edit Bank
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
            label='Nama Bank'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={bankSettings.bankSettingName}
            type='text'
            onChange={(e) => {
              setBankSettings({
                ...bankSettings,
                bankSettingName: e.target.value
              })
            }}
          />

          <TextField
            label='Nomor Rekening'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={bankSettings.bankSettingNumber}
            type='text'
            onChange={(e) => {
              setBankSettings({
                ...bankSettings,
                bankSettingNumber: e.target.value
              })
            }}
          />

          <TextField
            label='Nama Pemilik'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={bankSettings.bankSettingOwnerName}
            type='text'
            onChange={(e) => {
              setBankSettings({
                ...bankSettings,
                bankSettingOwnerName: e.target.value
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
              Submit
            </Button>
          </Stack>
        </Box>
      </Card>
    </>
  )
}
