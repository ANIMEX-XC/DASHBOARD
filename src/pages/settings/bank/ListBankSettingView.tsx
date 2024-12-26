/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid'
import { Add } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http'
import { Button, Stack, TextField } from '@mui/material'
import BreadCrumberStyle from '../../../components/breadcrumb/Index'
import { IconMenus } from '../../../components/icon'
import { useNavigate } from 'react-router-dom'
import Modal from '../../../components/modal'
import { convertTime } from '../../../utilities/convertTime'
import { IBankSettingsModel } from '../../../models/bankSettingsModel'

export default function BankSettingListView() {
  const navigation = useNavigate()
  const [tableData, setTableData] = useState<GridRowsProp[]>([])
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp()
  const [modalDeleteData, setModalDeleteData] = useState<IBankSettingsModel>()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const handleDeleteCategory = async (bankSettingId: string) => {
    await handleRemoveRequest({
      path: '/bank/settings?bankSettingId=' + bankSettingId
    })
    window.location.reload()
  }

  const handleOpenModalDelete = (data: IBankSettingsModel) => {
    setModalDeleteData(data)
    setOpenModalDelete(!openModalDelete)
  }

  const getTableData = async ({ search }: { search: string }) => {
    try {
      const result = await handleGetTableDataRequest({
        path: '/bank/settings',
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search }
      })
      if (result) {
        console.log(result)
        setTableData(result.items)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTableData({ search: '' })
  }, [paginationModel])

  const columns: GridColDef[] = [
    {
      field: 'bankSettingName',
      flex: 1,
      renderHeader: () => <strong>{'Nama Bank'}</strong>,
      editable: true
    },
    {
      field: 'bankSettingNumber',
      flex: 1,
      renderHeader: () => <strong>{'No Rekening'}</strong>,
      editable: true
    },
    {
      field: 'bankSettingOwnerName',
      flex: 1,
      renderHeader: () => <strong>{'Nama Pemilik'}</strong>,
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
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={() => navigation('bank/edit/' + row.bankSettingId)}
            color='inherit'
          />,
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
          <GridToolbarExport />
          <Button
            onClick={() => navigation('bank/create')}
            startIcon={<Add />}
            variant='outlined'
          >
            Tambah Bank
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
            label: 'Settings',
            link: '/settings',
            icon: <IconMenus.settings fontSize='small' />
          },
          {
            label: 'Bank',
            link: '/settings'
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
        />
      </Box>

      <Modal
        openModal={openModalDelete}
        handleModalOnCancel={() => setOpenModalDelete(false)}
        message={'Apakah anda yakin ingin menghapus ' + modalDeleteData?.bankSettingName}
        handleModal={() => {
          handleDeleteCategory(modalDeleteData?.bankSettingId ?? '')
          setOpenModalDelete(!openModalDelete)
        }}
      />
    </>
  )
}
