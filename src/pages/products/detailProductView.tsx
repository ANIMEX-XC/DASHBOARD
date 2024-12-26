/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Box, Card, Chip, Grid, Stack, Typography } from '@mui/material'
import { IProductModel } from '../../models/productsModel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function DetailProductView() {
  const { handleGetRequest } = useHttp()
  const { productId } = useParams()
  const [productImages, setProductImages] = useState<string[]>([])

  const [productDetail, setProductDetail] = useState<IProductModel>()
  const [productColors, setProductColors] = useState<string[]>([])
  const [productSizes, setProductSizes] = useState<string[]>([])

  const getDetailProduct = async () => {
    const result: IProductModel = await handleGetRequest({
      path: '/products/detail/' + productId
    })
    if (result) {
      const images = JSON.parse(result.productImages || '[]')
      const productColors = JSON.parse(result.productColors || '[]')
      const productSizes = JSON.parse(result.productSizes || '[]')

      setProductImages(images)
      setProductColors(productColors)
      setProductSizes(productSizes)
      setProductDetail(result)
    }
  }

  useEffect(() => {
    getDetailProduct()
  }, [])

  console.log('_________product detail')
  console.log(productDetail)
  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Product',
            link: '/products',
            icon: <IconMenus.products fontSize='small' />
          },
          {
            label: 'Detail',
            link: '/products/detail/' + productId
          }
        ]}
      />
      <Card sx={{ p: 5 }}>
        <Box>
          <Carousel dynamicHeight>
            {productImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  style={{
                    maxHeight: '400px'
                  }}
                />
              </div>
            ))}
          </Carousel>
        </Box>
        <Grid container spacing={5} p={2}>
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
                  <Typography>{productDetail?.productName}</Typography>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Deskripsi</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>{productDetail?.productDescription}</Typography>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Kategori</Typography>
                </td>
                <td>:</td>
                <td>
                  <Stack direction={'row'} spacing={1}>
                    {productDetail?.category1 && (
                      <Chip
                        label={productDetail?.category1?.categoryName}
                        sx={{ mx: 0.2 }}
                      />
                    )}
                    {productDetail?.category2 && (
                      <Chip
                        label={productDetail?.category2?.categoryName}
                        sx={{ mx: 0.2 }}
                      />
                    )}
                    {productDetail?.category3 && (
                      <Chip
                        label={productDetail?.category3?.categoryName}
                        sx={{ mx: 0.2 }}
                      />
                    )}
                  </Stack>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Stok</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>{productDetail?.productStock}</Typography>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Terjual</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>{productDetail?.productTotalSale}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Kondisi</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>{productDetail?.productCondition}</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Berat</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>{productDetail?.productWeight} gram</Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>warna</Typography>
                </td>
                <td>:</td>
                <td>
                  {productColors.map((color, index) => (
                    <Chip key={index} label={color} sx={{ mx: 0.2 }} />
                  ))}
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Ukuran</Typography>
                </td>
                <td>:</td>
                <td>
                  {productSizes.map((size, index) => (
                    <Chip key={index} label={size} sx={{ mx: 0.2 }} />
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Card>
    </>
  )
}
