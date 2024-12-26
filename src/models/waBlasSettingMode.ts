import { IRootModel } from './rootModel'

export interface IWaBlasSettingModel extends IRootModel {
  waBlasSettingId: string
  waBlasSettingToken: string
  waBlasSettingServer: string
}

export interface IWaBlasSettingCreateRequestModel {
  waBlasSettingToken: string
  waBlasSettingServer: string
}
