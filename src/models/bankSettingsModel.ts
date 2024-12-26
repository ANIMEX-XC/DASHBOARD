import { IRootModel } from './rootModel'

export interface IBankSettingsModel extends IRootModel {
  bankSettingId: string
  bankSettingName: string
  bankSettingNumber: string
  bankSettingOwnerName: string
}

export interface IBankSettingsCreateRequestModel {
  bankSettingName: string
  bankSettingNumber: string
  bankSettingOwnerName: string
}

export interface IBankSettingsUpdateRequestModel {
  bankSettingId: string
  bankSettingName: string
  bankSettingNumber: string
  bankSettingOwnerName: string
}
