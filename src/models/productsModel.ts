/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory1Model, ICategory2Model, ICategory3Model } from './categoryModel'
import { IRootModel } from './rootModel'

export interface IProductModel extends IRootModel {
  productId: string
  productName: string
  productDescription: string
  productImages: string
  productPrice: number
  productCategoryId1: string
  productCategoryId2: string
  productCategoryId3: string
  productTotalSale: number
  productStock: number
  productDiscount: number
  productCondition: 'Baru' | 'Bekas' | string
  productWeight: number
  productColors: string
  productSizes: string
  category1: ICategory1Model
  category2: ICategory2Model
  category3: ICategory3Model
}

export interface IProductUpdateRequestModel {
  productId: string
  productName?: string
  productDescription?: string
  productImages?: string
  productPrice?: number
  productCategoryId1?: string
  productCategoryId2?: string
  productCategoryId3?: string
  productTotalSale?: number
  productStock?: number
  productDiscount?: number
  productCondition?: 'Baru' | 'Bekas' | string
  productWeight?: number
  productColors?: string
  productSizes?: string
}

export interface IProductCreateRequestModel {
  productName: string
  productDescription: string
  productImages: string
  productPrice: number
  productCategoryId1: string
  productCategoryId2: string
  productCategoryId3: string
  productTotalSale: number
  productStock: number
  productDiscount: number
  productCondition: 'Baru' | 'Bekas' | string
  productWeight: number
  productColors: string
  productSizes: string
}
