export interface IMyAddressModel {
  myAddressId: string
  myAddressName: string
  myAddressKontak: string
  myAddressDetail: string
  myAddressPostalCode: string
  myAddressProvinsi: string
  myAddressKabupaten: string
  myAddressKecamatan: string
}

export interface IMyAddressCreateRequestModel {
  myAddressName: string
  myAddressKontak: string
  myAddressDetail: string
  myAddressPostalCode: string
  myAddressProvinsi: string
  myAddressKabupaten: string
  myAddressKecamatan: string
}

export interface IMyAddressUpdateRequestModel {
  myAddressId: string
  myAddressName: string
  myAddressKontak: string
  myAddressDetail: string
  myAddressPostalCode: string
  myAddressProvinsi: string
  myAddressKabupaten: string
  myAddressKecamatan: string
}
