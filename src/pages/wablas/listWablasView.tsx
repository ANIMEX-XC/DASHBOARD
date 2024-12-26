/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer
} from '@mui/x-data-grid'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http'
import { Button, Stack, TextField } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { useNavigate } from 'react-router-dom'
import { convertTime } from '../../utilities/convertTime'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import Modal from '../../components/modal'
import { IWaBlasHistoryMode } from '../../models/waBlasModel'

export default function ListWaBlasView() {
  const navigation = useNavigate()
  const [tableData, setTableData] = useState<GridRowsProp[]>([])
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp()

  const [modalDeleteData, setModalDeleteData] = useState<IWaBlasHistoryMode>()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const [loading, setLoading] = useState(false)
  const [rowCount, setRowCount] = useState(0)
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const handleDeleteNotification = async (wablasHistoryId: string) => {
    await handleRemoveRequest({
      path: '/notifications?wablasHistoryId=' + wablasHistoryId
    })
    window.location.reload()
  }

  const handleOpenModalDelete = (data: IWaBlasHistoryMode) => {
    setModalDeleteData(data)
    setOpenModalDelete(!openModalDelete)
  }

  const getTableData = async ({ search }: { search: string }) => {
    try {
      setLoading(true)
      const result = await handleGetTableDataRequest({
        path: '/wa-blas/history',
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search }
      })
      if (result) {
        console.log(result)
        setTableData(result.items)
        setRowCount(result.total_items)
      }
    } catch (error: any) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTableData({ search: '' })
  }, [paginationModel])

  const columns: GridColDef[] = [
    {
      field: 'waBlasHistoryUserName',
      flex: 1,
      renderHeader: () => <strong>{'User'}</strong>,
      editable: true
    },
    {
      field: 'waBlasHistoryUserPhone',
      flex: 1,
      renderHeader: () => <strong>{'WA'}</strong>,
      editable: true
    },
    {
      field: 'waBlasHistoryTitle',
      flex: 1,
      renderHeader: () => <strong>{'Title'}</strong>,
      editable: true
    },
    {
      field: 'waBlasHistoryMessage',
      flex: 1,
      renderHeader: () => <strong>{'Pesan'}</strong>,
      editable: true
    },
    {
      field: 'createdAt',
      flex: 1,
      renderHeader: () => <strong>{'Dibuat Pada'}</strong>,
      editable: true,
      valueFormatter: (item) => convertTime(item.value)
    },
    {
      field: 'actions',
      type: 'actions',
      renderHeader: () => <strong>{'ACTION'}</strong>,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label='Delete'
            onClick={() => handleOpenModalDelete(row)}
            color='inherit'
          />
        ]
      }
    }
  ]

  function CustomToolbar() {
    const [search, setSearch] = useState<string>('')
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Stack direction='row' spacing={2}>
          <Button
            onClick={() => navigation('create')}
            startIcon={<Add />}
            variant='outlined'
          >
            Buat Pesan Broadcast
          </Button>
        </Stack>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <TextField
            size='small'
            placeholder='search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant='outlined' onClick={() => getTableData({ search })}>
            Search
          </Button>
        </Stack>
      </GridToolbarContainer>
    )
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Wa Blas',
            link: '/wa-blas',
            icon: <IconMenus.waBlas fontSize='small' />
          }
        ]}
      />
      <Box
        sx={{
          width: '100%',
          '& .actions': {
            color: 'text.secondary'
          },
          '& .textPrimary': {
            color: 'text.primary'
          }
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          editMode='row'
          sx={{ padding: 2 }}
          initialState={{
            pagination: { paginationModel: { pageSize: 2, page: 0 } }
          }}
          pageSizeOptions={[2, 5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            toolbar: CustomToolbar
          }}
          rowCount={rowCount}
          paginationMode='server'
          loading={loading}
        />
      </Box>
      <Modal
        openModal={openModalDelete}
        handleModalOnCancel={() => setOpenModalDelete(false)}
        message={'Apakah anda yakin ingin menghapus history pesan ini?'}
        handleModal={() => {
          handleDeleteNotification(modalDeleteData?.waBlasHistoryId ?? '')
          setOpenModalDelete(!openModalDelete)
        }}
      />
    </>
  )
}
