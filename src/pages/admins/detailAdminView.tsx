import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/material'
import { IUserModel } from '../../models/userModel'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function DetailAdminView() {
  const { handleGetRequest } = useHttp()
  const { adminId } = useParams()

  const [adminDetail, setAdminDetail] = useState<IUserModel>()

  const getDetailUser = async () => {
    const result: IUserModel = await handleGetRequest({
      path: '/admins/detail/' + adminId
    })
    setAdminDetail(result)
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
            label: 'Create',
            link: '/admins/detail/' + adminId
          }
        ]}
      />
      <Card sx={{ p: 5 }}>
        <table>
          <thead>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Nama</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{adminDetail?.userName}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Email</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{adminDetail?.userEmail}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Role</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{adminDetail?.userRole}</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  )
}
