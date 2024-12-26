import { IRootModel } from './rootModel'

export interface ICategory1Model extends IRootModel {
  categoryId1: string
  categoryName: string
  categoryIcon: string
}

export interface ICategory1UpdateRequestModel {
  categoryId1: string
  categoryName: string
  categoryIcon: string
}

export interface ICategory1CreateRequestModel {
  categoryId1: string
  categoryName: string
  categoryIcon: string
}

export interface ICategory2Model extends IRootModel {
  categoryId1: string
  categoryId2: string
  categoryName: string
}

export interface ICategory2UpdateRequestModel {
  categoryId1: string
  categoryId2: string
  categoryName: string
}

export interface ICategory2CreateRequestModel {
  categoryId1: string
  categoryId2: string
  categoryName: string
}

export interface ICategory3Model extends IRootModel {
  categoryId1: string
  categoryId2: string
  categoryId3: string
  categoryName: string
}

export interface ICategory3UpdateRequestModel {
  categoryId1: string
  categoryId2: string
  categoryId3: string
  categoryName: string
}

export interface ICategory3CreateRequestModel {
  categoryId1: string
  categoryId2: string
  categoryId3: string
  categoryName: string
}
