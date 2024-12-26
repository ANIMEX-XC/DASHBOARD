import { Card, Grid, Box, Stack, Typography } from '@mui/material'
import ReactApexChart from 'react-apexcharts'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { useEffect, useState } from 'react'
import { IStatisticTotalModel } from '../../models/statisticModel'
import { useHttp } from '../../hooks/http'
import { useNavigate } from 'react-router-dom'

const DashboardView = () => {
  const { handleGetRequest } = useHttp()
  const navigation = useNavigate()

  const [statisticTotal, setStatisticTotal] = useState<IStatisticTotalModel>()

  const getStatistic = async () => {
    const result: IStatisticTotalModel = await handleGetRequest({
      path: '/statistic/total'
    })
    console.log(result)
    setStatisticTotal(result)
  }

  useEffect(() => {
    getStatistic()
  }, [])
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Dashboard',
            link: '/',
            icon: <IconMenus.dashboard fontSize='small' />
          }
        ]}
      />
      <Grid container spacing={2} mb={2}>
        {/* <Grid item md={3} sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/transactions')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.transaction fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography>Omset</Typography>
                <Typography fontSize='large' fontWeight='bold'>
                  {statisticTotal?.totalTransaction}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid> */}

        <Grid item md={3} sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/transactions')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.transaction fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography>Penjualan</Typography>
                <Typography fontSize='large' fontWeight='bold'>
                  {statisticTotal?.totalTransaction}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item md={3} sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/products')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.products fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography>Products</Typography>
                <Typography fontSize='large' fontWeight='bold'>
                  {statisticTotal?.totalProduct}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item md={3} sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/orders')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.orders fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography>Orders</Typography>
                <Typography fontSize='large' fontWeight='bold'>
                  {statisticTotal?.totalOrder}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid item md={3} sm={4} xs={12}>
          <Card
            sx={{ p: 3, minWidth: 200, cursor: 'pointer' }}
            onClick={() => navigation('/customers')}
          >
            <Stack direction='row' spacing={2}>
              <IconMenus.customers fontSize='large' color={'inherit'} />
              <Stack justifyContent='center'>
                <Typography>Customers</Typography>
                <Typography fontSize='large' fontWeight='bold'>
                  {statisticTotal?.totalCustomer}
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item md={7} xs={12}>
          <Card sx={{ p: { md: 5 } }}>
            <Typography>Trafik</Typography>
            <ReactApexChart
              options={{
                chart: {
                  height: 350,
                  type: 'area'
                },
                dataLabels: {
                  enabled: true
                },
                stroke: {
                  curve: 'smooth'
                },
                xaxis: {
                  type: 'datetime',
                  categories: [
                    '2018-09-19T00:00:00.000Z',
                    '2018-09-19T01:30:00.000Z',
                    '2018-09-19T02:30:00.000Z',
                    '2018-09-19T03:30:00.000Z',
                    '2018-09-19T04:30:00.000Z',
                    '2018-09-19T05:30:00.000Z',
                    '2018-09-19T06:30:00.000Z'
                  ]
                },
                tooltip: {
                  x: {
                    format: 'dd/MM/yy HH:mm'
                  }
                }
              }}
              series={[
                {
                  name: 'Trafik',
                  data: [31, 40, 28, 51, 42, 109, 100]
                }
              ]}
              type='area'
              height={350}
            />
          </Card>
        </Grid>
        <Grid item md={5} xs={12}>
          <Card sx={{ p: 5 }}>
            <Typography>Gender</Typography>
            <div id='chart'>
              <ReactApexChart
                options={{
                  chart: {
                    width: 380,
                    type: 'pie'
                  },
                  labels: ['Pria', 'Wanita'],
                  responsive: [
                    {
                      breakpoint: 480,
                      options: {
                        chart: {
                          width: 230
                        },
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }
                  ]
                }}
                series={[
                  statisticTotal?.totalUserPria ?? 0,
                  statisticTotal?.totalUserWanita ?? 0
                ]}
                type='pie'
                width={380}
              />
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Box>
  )
}

export default DashboardView
