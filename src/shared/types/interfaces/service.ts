import { Maybe } from '../../utilityTypes'

export interface IHookService {
  id: number
  title: string
  cost: number
}

export interface IService {
  id: number
  title: string
  category_id: number
  price_min: number
  price_max: number
  discount: number
  prepaid: string
  imageUrl: string
}

export interface IFrontService extends IService {
  imageType: Maybe<string>
  categoryName: Maybe<string>
  imageUrl: string
}

export interface IFrontServiceAdmin {
  username: string
  password: string
  service: IFrontService
}

export interface ICategory {
  api_id: number
  id: number
  sex: number
  title: string
  categoryName: string
  weight: number
  image: string
  isVisible: boolean
}

export interface IFrontCategoryAdmin {
  username: string
  password: string
  category: ICategory
}
