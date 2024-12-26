import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ISettingModel } from '../../models/settingMode'
import ButtonUploadFile from '../../components/buttons/buttonUpload'
import { useHttp } from '../../hooks/http'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function BannerSettingsView() {
  const { handleGetRequest, handleUpdateRequest } = useHttp()

  const [bannerImages, setBannerImages] = useState<string[]>([])
  const [settings, setSettings] = useState<ISettingModel>({
    settingId: '',
    settingBanner: '',
    settingWhatsappNumber: ''
  })

  const handleDeleteImage = (oldImage: string) => {
    const newImages = bannerImages.filter((image) => image !== oldImage)
    setBannerImages(newImages)
  }

  const getDetailSettings = async () => {
    const result: ISettingModel = await handleGetRequest({
      path: '/settings'
    })
    if (result) {
      const images = JSON.parse(result.settingBanner || '[]')
      setSettings(result)
      setBannerImages(images)
    }
  }

  const handleSubmit = async () => {
    try {
      const payload: ISettingModel = {
        ...settings,
        settingBanner: JSON.stringify(bannerImages)
      }
      await handleUpdateRequest({
        path: '/settings',
        body: payload
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
            label: 'Banner',
            link: '/settings'
          }
        ]}
      />
      <Card sx={{ p: 3 }}>
        <Box sx={{ my: 3 }}>
          <Typography color={'gray'}>Banner</Typography>
          <ButtonUploadFile
            onUpload={(image) => setBannerImages([...bannerImages, image])}
          />
          <Stack direction={'row'} flexWrap='wrap' spacing={2}>
            {bannerImages.map((image, index) => (
              <Stack key={index} spacing={1}>
                <img
                  src={image}
                  style={{
                    marginTop: 10,
                    width: 200,
                    height: 200
                  }}
                />
                <Button
                  variant='outlined'
                  size='small'
                  onClick={() => handleDeleteImage(image)}
                >
                  Delete
                </Button>
              </Stack>
            ))}
          </Stack>
        </Box>
        <Stack direction={'row'} justifyContent={'flex-end'} sx={{ marginTop: 5 }}>
          <Button variant='outlined' onClick={handleSubmit}>
            Update
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
