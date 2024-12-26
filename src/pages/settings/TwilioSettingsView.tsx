import { Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http'
import { ITwilioCreateOrUpdateRequestModel } from '../../models/twilioModel'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function TwilioSettingsView() {
  const { handleGetRequest, handleUpdateRequest } = useHttp()

  const [twilioSettings, setTwilioSettings] = useState<ITwilioCreateOrUpdateRequestModel>(
    {
      twilioSettingAccountSid: '',
      twilioSettingAuthToken: '',
      twilioSettingVerifyService: ''
    }
  )

  const getDetailSettings = async () => {
    const result: ITwilioCreateOrUpdateRequestModel = await handleGetRequest({
      path: '/twilio/settings'
    })
    if (result) {
      setTwilioSettings(result)
    }
  }

  const handleSubmit = async () => {
    try {
      await handleUpdateRequest({
        path: '/twilio/settings',
        body: twilioSettings
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
            label: 'Twilio',
            link: '/settings'
          }
        ]}
      />
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Twilio Account SID'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={twilioSettings.twilioSettingAccountSid}
              onChange={(e) =>
                setTwilioSettings({
                  ...twilioSettings,
                  twilioSettingAccountSid: e.target.value
                })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Twilio Auth Token'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={twilioSettings.twilioSettingAuthToken}
              onChange={(e) =>
                setTwilioSettings({
                  ...twilioSettings,
                  twilioSettingAuthToken: e.target.value
                })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Twilio Verify Service'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={twilioSettings.twilioSettingVerifyService}
              onChange={(e) =>
                setTwilioSettings({
                  ...twilioSettings,
                  twilioSettingVerifyService: e.target.value
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
