import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  FormControl
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IUserModel, IUserUpdateRequestModel } from '../../models/userModel'
import { IconMenus } from '../../components/icon'
import BreadCrumberStyle from '../../components/breadcrumb/Index'

export default function EditAdminView() {
  const navigate = useNavigate()
  const { handleUpdateRequest, handleGetRequest } = useHttp()
  const { adminId } = useParams()

  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userRole, setUserRole] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: IUserUpdateRequestModel = {
        userId: adminId || '',
        userName,
        userEmail,
        userPassword,
        userRole
      }

      await handleUpdateRequest({
        path: '/admins',
        body: payload
      })

      navigate('/admins')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const getDetailUser = async () => {
    const result: IUserModel = await handleGetRequest({
      path: '/admins/detail/' + adminId
    })
    if (result) {
      setUserEmail(result.userEmail)
      setUserName(result.userName)
      setUserRole(result.userRole)
      setUserPassword(result.userPassword)
    }
  }

  useEffect(() => {
    getDetailUser()
  }, [])

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Admin',
            link: '/admins',
            icon: <IconMenus.admin fontSize='small' />
          },
          {
            label: 'Edit',
            link: '/admins/edit/' + adminId
          }
        ]}
      />
      <Card
        sx={{
          mt: 5,
          p: { xs: 3, md: 5 }
        }}
      >
        <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
          Tambah Admin
        </Typography>
        <Box
          component='form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Nama'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userName}
                type='text'
                fullWidth
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='E-mail'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userEmail}
                fullWidth
                type='email'
                onChange={(e) => {
                  setUserEmail(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Password'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userPassword}
                type='password'
                fullWidth
                onChange={(e) => {
                  setUserPassword(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-name-label'>Pilih Role</InputLabel>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  value={userRole}
                  fullWidth
                  sx={{ m: 1 }}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <MenuItem selected value={userRole}>
                    {userRole}
                  </MenuItem>
                  <MenuItem value={'admin'}>Admin</MenuItem>
                  <MenuItem value={'superAdmin'}>Super Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
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
