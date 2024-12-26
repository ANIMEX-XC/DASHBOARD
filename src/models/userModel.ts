import { IRootModel } from './rootModel'

export interface IUserModel extends IRootModel {
  userId: string
  userName: string
  userEmail: string
  userPassword: string
  userWhatsAppNumber: string
  userWhatsAppNumberVerified: boolean
  userPhoto: string
  userRole: 'user' | 'admin' | 'superAdmin'
  userGender: 'pria' | 'wanita'
  userCoin: number
  userFcmId: string
  userPartnerCode: string
}

export interface IUserUpdateRequestModel {
  userId: string
  userName?: string
  userEmail?: string
  userPassword?: string
  userPhoneNumber?: string
  userPhoto?: string
  userRole?: 'user' | 'admin' | 'superAdmin' | string
  userGender?: 'pria' | 'wanita'
  userCoin?: number
  userPartnerCode?: string
}

export interface IUserCreateRequestModel {
  userName: string
  userEmail: string
  userPassword: string
  userPhoneNumber: string
  userPhoto: string
  userRole: 'user' | 'admin' | 'superAdmin' | string
}

export interface IUserLoginRequestModel {
  userEmail: string
  userPassword: string
}
