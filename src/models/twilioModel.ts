import { IRootModel } from './rootModel'

export interface ITwilioModel extends IRootModel {
  twilioSettingId: string
  twilioSettingAccountSid: string
  twilioSettingAuthToken: string
  twilioSettingVerifyService: string
}

export interface ITwilioCreateOrUpdateRequestModel {
  twilioSettingAccountSid: string
  twilioSettingAuthToken: string
  twilioSettingVerifyService: string
}
